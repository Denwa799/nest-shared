import parsePhoneNumber from 'libphonenumber-js';
import {
  And,
  ArrayOverlap,
  FindOptionsOrder,
  ILike,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';
import { ReadStream } from 'fs';
import { GraphQLResolveInfo, SelectionNode } from 'graphql';

import { IPaginate, IPreparedImage, IPreparedImageAndOrder, QueryDataType } from './types';
import { AllImagesDto, ImageFileDto, TempImagesDto } from './dto';
import { z } from 'zod';

/**
 * @description Отлов ошибки
 * @param options - Объект параметров
 * @param options.error - Объект ошибки
 * @param options.message - Сообщение ошибки
 */
export const getError = ({ error, message }: { error?: unknown; message?: string }): void => {
  if (error) console.error(error);
  if (message) console.error(message);
};

/**
 * @description Создает объект с информацией о пагинации
 * @param {number} page - Текущая страница
 * @param {number} count - Общее количество записей
 * @param {number} limit - Сколько записей на одной странице,
 * @param {number} modelsNumber - Количество участвующих таблиц
 * @return Возвращает объект пагинации
 */
export const createPaginate = (
  page: number,
  count: number,
  limit: number,
  modelsNumber = 1,
): IPaginate => {
  const pages = Math.ceil(count / (limit * modelsNumber));

  const paginate: IPaginate = {
    page,
    pages,
    previous: page > 1 ? page - 1 : undefined,
    next: page <= pages - 1 ? page + 1 : undefined,
    count,
    limit,
  };

  return paginate;
};

/**
 * @description Превращает страницу и лимит в то, сколько пропустить записей в orm
 * @param {number} page - Текущая страница
 * @param {number} limit - Сколько записей на одной странице,
 * @return Возвращает orm skip
 */
export const getPaginateSkip = (page: number, limit: number): number => {
  return (page - 1) * limit;
};

/**
 * @description Валидация номера телефона
 * @param {string} phone - Номер телефона
 * @return {string} Возвращает либо пустую строку, либо отформатированный номер телефона
 * @example
 * const phone = formatPhone(+79885054219)
 * phone === "+79885054219"
 */
export const formatPhone = (phone: string): string => {
  const parsedPhone = parsePhoneNumber(phone);
  if (!parsedPhone?.isValid()) return '';

  return parsedPhone.number;
};

/**
 * @description Объединяет два 32 битных числа
 * @param {number} low - младшие 32 бита числа
 * @param {number} hight - старшие 32 бита числа
 * @return {number} Готовое число
 */
export const concatenateTwo32BitNumbers = (low: number, high: number): number => {
  return (high >>> 0) * Math.pow(2, 32) + (low >>> 0);
};

/**
 * @description Проверяет page и limit на корректные границы
 * @param {number} page - Текущая страница
 * @param {number} limit - Сколько записей на одной странице,
 * @param {number} maxLimit - Максимально допустимое число записей
 * @return Возвращает объект с корректными значениями в допустимых пределах
 */
export const checkPageAndLimit = (
  page: number,
  limit: number,
  maxLimit = 500,
): {
  checkedPage: number;
  checkedLimit: number;
} => {
  const paginationData = {
    checkedPage: page,
    checkedLimit: limit,
  };

  if (page < 1) {
    paginationData.checkedPage = 1;
  }

  if (limit < 1) {
    paginationData.checkedLimit = 1;
  }

  if (limit > maxLimit) {
    paginationData.checkedLimit = maxLimit;
  }

  return paginationData;
};

/**
 * @description Конвертация FileStream от multer в Buffer
 * @param fileStream - Объект FileStream
 */
export const fileStreamToBuffer = async (fileStream: ReadStream): Promise<Buffer> => {
  const chunks: Uint8Array[] = [];

  for await (const chunk of fileStream) {
    chunks.push(chunk as Uint8Array);
  }

  return Buffer.concat(chunks);
};

/**
 * @description Создает queryData из параметров пагинации, сортирвоки и фильтрации
 * @param {object} options - Объект с параметрами
 * @param {number} options.page - Текущая страница
 * @param {number} options.limit - Сколько записей на одной странице,
 * @param {string} options.sortField - Название поля, по которому будет сортировка
 * @param {string} options.sortOrder - asc или desc
 * @param {string} options.filterType - and или or
 * @param {object} options.filter - Объект с полями для фильтрации внутри where
 * @param {object} options.search - Объект с полями для поиска внутри where
 * @param {object} options.fromToFields - Объект с полями для поиска from to
 * @return Возвращает объект с query data для запроса в orm
 */
export const createQueryData = <Entity>({
  page,
  limit,
  sortField,
  sortOrder,
  filterType,
  filter,
  search,
  fromToFields,
  oneEntryArrayFields,
}: {
  page: number;
  limit: number;
  sortField: string;
  sortOrder: string;
  filterType: string;
  filter?: object;
  search?: object;
  fromToFields?: {
    fromFieldName: string;
    toFieldName: string;
    originalFieldName: string;
  }[];
  oneEntryArrayFields?: {
    key: string;
    originalKey: string;
  }[];
}): QueryDataType<Entity> => {
  const queryData = {
    skip: getPaginateSkip(page, limit),
    take: limit,
  } as QueryDataType<Entity>;

  if (sortField && sortOrder) {
    queryData.order = {
      [sortField]: sortOrder,
    } as FindOptionsOrder<Entity>;
  }

  if (filter) {
    let whereAnd = {};
    let whereOr: object[] = [];

    const fromToMap = new Map<
      string,
      {
        fromFieldName: string;
        fromFieldValue: unknown;
        toFieldName: string;
        toFieldValue: unknown;
      }
    >();

    for (const [key, value] of Object.entries(filter)) {
      let currentKey = key;
      let currentValue;

      if (
        typeof value === 'object' &&
        !Array.isArray(value) &&
        typeof value?.getTime !== 'function'
      ) {
        const obj = JSON.parse(JSON.stringify(value)) as object;
        const valueObject = {} as {
          [key: string]: unknown;
        };

        for (const [key, value] of Object.entries(obj)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          valueObject[key] = typeof value === 'boolean' ? value : In(value);
        }

        currentValue = valueObject;
      } else if (typeof value === 'boolean') {
        currentValue = value;
      } else {
        if (fromToFields) {
          fromToFields.find((item) => {
            let fromKey = '';
            let toKey = '';

            if (item.fromFieldName === key) fromKey = key;
            else if (item.toFieldName === key) toKey = key;

            if (!fromKey || !toKey) return false;

            const mapValue = fromToMap.get(item.originalFieldName);

            if (mapValue) {
              fromToMap.set(item.originalFieldName, {
                fromFieldName: mapValue.fromFieldName ? mapValue.fromFieldName : fromKey,
                fromFieldValue: mapValue.fromFieldValue
                  ? mapValue.fromFieldValue
                  : fromKey
                    ? value
                    : null,
                toFieldName: mapValue.toFieldName ? mapValue.toFieldName : toKey,
                toFieldValue: mapValue.toFieldValue ? mapValue.toFieldValue : toKey ? value : null,
              });
              return true;
            }

            fromToMap.set(item.originalFieldName, {
              fromFieldName: fromKey,
              fromFieldValue: fromKey ? value : null,
              toFieldName: toKey,
              toFieldValue: toKey ? value : null,
            });

            return true;
          });
        }

        if (Array.isArray(value) && value.length && oneEntryArrayFields) {
          // @NOTE тут перечисляются поля, которые массивы в базе данных и надо найти хотя бы одно вхождение.
          const finded = oneEntryArrayFields.find((item) => item.key === key);

          if (finded) {
            currentValue = ArrayOverlap(value);
            currentKey = finded.originalKey;
          } else {
            currentValue = In(value);
          }
        } else if (Array.isArray(value)) {
          currentValue = In(value);
        }
      }

      if (currentValue) {
        whereAnd = {
          ...whereAnd,
          [currentKey]: currentValue,
        };

        whereOr = [
          ...whereOr,
          {
            [currentKey]: currentValue,
          },
        ];
      }
    }

    fromToMap.forEach((item, key) => {
      if (item.fromFieldValue && item.toFieldValue) {
        whereAnd = {
          ...whereAnd,
          [key]: And(MoreThanOrEqual(item.fromFieldValue), LessThanOrEqual(item.toFieldValue)),
        };
        whereOr = [
          ...whereOr,
          { [key]: And(MoreThanOrEqual(item.fromFieldValue), LessThanOrEqual(item.toFieldValue)) },
        ];
      } else if (item.fromFieldValue) {
        whereAnd = {
          ...whereAnd,
          [key]: MoreThanOrEqual(item.fromFieldValue),
        };
        whereOr = [...whereOr, { [key]: MoreThanOrEqual(item.fromFieldValue) }];
      } else if (item.toFieldValue) {
        whereAnd = {
          ...whereAnd,
          [key]: LessThanOrEqual(item.toFieldValue),
        };
        whereOr = [...whereOr, { [key]: LessThanOrEqual(item.toFieldValue) }];
      }
    });

    if (filterType === 'and') queryData.where = whereAnd;
    else if (filterType === 'or') queryData.where = whereOr;
  }

  if (search) {
    let searchWhere = {};

    for (const [key, value] of Object.entries(search)) {
      searchWhere = {
        ...searchWhere,
        [key]: ILike(`%${value}%`),
      };
    }

    if (!queryData.where) queryData.where = searchWhere;
    if (Array.isArray(queryData.where)) queryData.where = [...queryData.where, searchWhere];
    else queryData.where = { ...searchWhere, ...queryData.where };
  }

  return queryData;
};

/**
 * @description Получить список запрашиваемых полей
 * @param info - Объект с информацией запроса
 */
export const extractGraphqlFields = (info: GraphQLResolveInfo): string[] => {
  const processSelections = (
    selections: readonly SelectionNode[],
    parentPath: string = '',
  ): string[] => {
    const fields: string[] = [];

    selections.forEach((selection) => {
      if (selection.kind === 'Field') {
        const fieldName = selection.name.value;
        const currentPath = parentPath ? `${parentPath}.${fieldName}` : fieldName;

        fields.push(currentPath);

        if (selection.selectionSet) {
          fields.push(...processSelections(selection.selectionSet.selections, currentPath));
        }
      }
    });

    return fields;
  };

  const rootSelections = info.fieldNodes[0].selectionSet?.selections;
  if (!rootSelections) {
    return [];
  }

  return processSelections(rootSelections);
};

/**
 * @description Связывает файлы из микросервиса с полями alt и sourceUrl
 * @param {FilesDto[]} files - файлы от микросервиса
 * @param {TempImagesDto[]} tempImages - исходный массив, на основе которого делался запрос
 * @return {IPreparedImage[]} Взвращает объект с информацией о файлах
 */
export const prepareTempImages = (
  files: ImageFileDto[],
  tempImages: TempImagesDto[],
): IPreparedImage[] => {
  const images = files
    .map((item) => {
      const {
        imageName,
        originalFileExtension,
        fileExtensions,
        prefixes,
        entityId,
        fullPathExample,
      } = item;

      const finded = tempImages.find(
        (tempImage) => tempImage.tempName === `${imageName}.${originalFileExtension}`,
      );

      if (!finded) return null;

      return {
        name: imageName,
        fileExtensions,
        prefixes,
        originalFileExtension,
        entityId,
        fullPathExample,
        altRU: finded.altRU,
        altEN: finded.altEN,
        altAR: finded.altAR,
      };
    })
    .filter((item) => item !== null) as IPreparedImage[];

  return images;
};

/**
 * @description Достает tempImages и массива со всеми картинками объекта
 * @param {AllImagesDto[]} allImages - массив всех изображений
 * @return {TempImagesDto[]} Взвращает объект с информацией о файлах
 */
export const getTempImagesInAllImages = (
  allImages: AllImagesDto[] | undefined,
): TempImagesDto[] => {
  if (!allImages) return [];

  const tempImages = allImages
    .map((item) => {
      if (!item.tempName) return null;

      return {
        tempName: item.tempName,
        altRU: item.altRU,
        altEN: item.altEN,
        altAR: item.altAR,
      };
    })
    .filter((item) => item !== null) as TempImagesDto[];

  return tempImages;
};

/**
 * @description Обновляет изображения в сущности
 * @param {string} entityImages - текущие изображения
 * @param {AllImagesDto[]} allImages - изображения что пришли от клиента
 * @param {IPreparedImage[]} preparedTempImages - заранее подготовленные новые изображения
 * @return {object} Взвращает объект с информацией о новых файлах и удаленных
 */
export const updateEntityImages = (
  entityImages: string | null,
  allImages: AllImagesDto[] | undefined,
  preparedTempImages: IPreparedImage[],
): {
  newImages: IPreparedImage[] | null;
  deletedImages: ImageFileDto[] | null;
} => {
  if ((!entityImages && !preparedTempImages.length) || !allImages) {
    return {
      newImages: null,
      deletedImages: null,
    };
  }

  let correctedImages: IPreparedImageAndOrder[] = [];
  const deletedImages: ImageFileDto[] = [];

  const allImagesAndOrders = allImages.map((item, index) => {
    return {
      ...item,
      order: index,
    };
  });

  if (entityImages) {
    const images = JSON.parse(entityImages) as IPreparedImage[];
    const schema = z.object({
      name: z.string(),
      fileExtensions: z.string().array(),
      prefixes: z.string().array(),
      originalFileExtension: z.string(),
      altRU: z.string().optional().nullable(),
      altEN: z.string().optional().nullable(),
      altAR: z.string().optional().nullable(),
    });

    if (!Array.isArray(images)) {
      return {
        newImages: null,
        deletedImages: null,
      };
    }

    correctedImages = images
      .map((item) => {
        try {
          schema.parse(item);
        } catch {
          return null;
        }

        const finded = allImagesAndOrders.find((element) => element.name === item.name);

        if (!finded) {
          deletedImages.push({
            imageName: item.name,
            fileExtensions: item.fileExtensions,
            prefixes: item.prefixes,
            entityId: item.entityId,
            fullPathExample: item.fullPathExample,
            originalFileExtension: item.originalFileExtension,
          });
          return null;
        }

        return {
          name: item.name,
          fileExtensions: item.fileExtensions,
          prefixes: item.prefixes,
          originalFileExtension: item.originalFileExtension,
          entityId: item.entityId,
          fullPathExample: item.fullPathExample,
          altRU: finded.altRU,
          altEN: finded.altEN,
          altAR: finded.altAR,
          order: finded.order,
        };
      })
      .filter((item) => item !== null) as IPreparedImageAndOrder[];
  }

  const preparedTempImagesAndOrder = preparedTempImages
    .map((item) => {
      const finded = allImagesAndOrders.find(
        (element) => element.tempName === `${item.name}.${item.originalFileExtension}`,
      );

      if (!finded) return null;

      return {
        ...item,
        order: finded.order,
      };
    })
    .filter((item) => item !== null) as IPreparedImageAndOrder[];

  const newImages = [...correctedImages, ...preparedTempImagesAndOrder]
    .sort((a, b) => a.order - b.order)
    .map((item) => {
      return {
        name: item.name,
        fileExtensions: item.fileExtensions,
        prefixes: item.prefixes,
        originalFileExtension: item.originalFileExtension,
        entityId: item.entityId,
        fullPathExample: item.fullPathExample,
        altRU: item.altRU,
        altEN: item.altEN,
        altAR: item.altAR,
      };
    });

  return {
    newImages: newImages.length ? newImages : null,
    deletedImages: deletedImages.length ? deletedImages : null,
  };
};

/**
 * @description Конвертация текста с русского в транслит
 * @param {string} word - Строка
 * @param {boolean} isTrim - Убирать ли тире в начале и конце
 * @return {string} Возвращает строку в транслите
 */
export const translit = (word: string, isTrim = true): string => {
  const converter = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ь: '',
    ы: 'y',
    ъ: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  };

  word = word.toLowerCase();

  let answer = '';
  for (let i = 0; i < word.length; ++i) {
    if (converter[word[i] as keyof typeof converter] == undefined) {
      answer += word[i];
    } else {
      answer += converter[word[i] as keyof typeof converter];
    }
  }

  answer = answer.replace(/[^-0-9a-z]/g, '-');
  answer = answer.replace(/[-]+/g, '-');
  if (isTrim) answer = answer.replace(/^\\-|-$/g, '');

  return answer;
};

/**
 * @description Проверка валидности ЧПУ строки
 * @param {string} string - Строка
 * @return {boolean} Возвращает true/false
 */
export const checkTranslit = (string: string): boolean => {
  const cpuRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  return cpuRegex.test(string);
};
