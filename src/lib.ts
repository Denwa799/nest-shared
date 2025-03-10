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
 * @param {number} page - Текущая страница
 * @param {number} limit - Сколько записей на одной странице,
 * @param {string} sortField - Название поля, по которому будет сортировка
 * @param {string} sortOrder - asc или desc
 * @param {string} filterType - and или or
 * @param {object} filter - Объект с полями для фильтрации внутри where
 * @param {object} search - Объект с полями для поиска внутри where
 * @return Возвращает объект с query data для запроса в orm
 */
export const createQueryData = <Entity>(
  page: number,
  limit: number,
  sortField: string,
  sortOrder: string,
  filterType: string,
  filter?: object,
  search?: object,
): QueryDataType<Entity> => {
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

    let priceFrom: number | undefined;
    let priceTo: number | undefined;

    let priorityFrom: number | undefined;
    let priorityTo: number | undefined;

    let createdAtFrom: Date | undefined;
    let createdAtTo: Date | undefined;

    let updatedAtFrom: Date | undefined;
    let updatedAtTo: Date | undefined;

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
        if (key === 'priceFrom') {
          priceFrom = value as number;
          continue;
        }

        if (key === 'priceTo') {
          priceTo = value as number;
          continue;
        }

        if (key === 'priorityFrom') {
          priorityFrom = value as number;
          continue;
        }

        if (key === 'priorityTo') {
          priorityTo = value as number;
          continue;
        }

        if (key === 'createdAtFrom') {
          createdAtFrom = value as Date;
          continue;
        }

        if (key === 'createdAtTo') {
          createdAtTo = value as Date;
          continue;
        }

        if (key === 'updatedAtFrom') {
          updatedAtFrom = value as Date;
          continue;
        }

        if (key === 'updatedAtTo') {
          updatedAtTo = value as Date;
          continue;
        }

        if (Array.isArray(value) && value.length) {
          // @NOTE тут перечисляются поля, которые массивы в базе данных и надо найти хотя бы одно вхождение.
          const arraysFields = [{ key: 'sectionsOR', originalKey: 'sections' }];
          const finded = arraysFields.find((item) => item.key === key);

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

    if (priceFrom && priceTo) {
      whereAnd = {
        ...whereAnd,
        price: And(MoreThanOrEqual(priceFrom), LessThanOrEqual(priceTo)),
      };
      whereOr = [...whereOr, { price: And(MoreThanOrEqual(priceFrom), LessThanOrEqual(priceTo)) }];
    } else if (priceFrom) {
      whereAnd = {
        ...whereAnd,
        price: MoreThanOrEqual(priceFrom),
      };
      whereOr = [...whereOr, { price: MoreThanOrEqual(priceFrom) }];
    } else if (priceTo) {
      whereAnd = {
        ...whereAnd,
        price: LessThanOrEqual(priceTo),
      };
      whereOr = [...whereOr, { price: LessThanOrEqual(priceTo) }];
    }

    if (priorityFrom && priorityTo) {
      whereAnd = {
        ...whereAnd,
        priority: And(MoreThanOrEqual(priorityFrom), LessThanOrEqual(priorityTo)),
      };
      whereOr = [
        ...whereOr,
        { priority: And(MoreThanOrEqual(priorityFrom), LessThanOrEqual(priorityTo)) },
      ];
    } else if (priorityFrom) {
      whereAnd = {
        ...whereAnd,
        priority: MoreThanOrEqual(priorityFrom),
      };
      whereOr = [...whereOr, { priority: MoreThanOrEqual(priorityFrom) }];
    } else if (priorityTo) {
      whereAnd = {
        ...whereAnd,
        priority: LessThanOrEqual(priorityTo),
      };
      whereOr = [...whereOr, { priority: LessThanOrEqual(priorityTo) }];
    }

    if (createdAtFrom && createdAtTo) {
      whereAnd = {
        ...whereAnd,
        createdAt: And(MoreThanOrEqual(createdAtFrom), LessThanOrEqual(createdAtTo)),
      };
      whereOr = [
        ...whereOr,
        {
          createdAt: And(MoreThanOrEqual(createdAtFrom), LessThanOrEqual(createdAtTo)),
        },
      ];
    } else if (createdAtFrom) {
      whereAnd = {
        ...whereAnd,
        createdAt: MoreThanOrEqual(createdAtFrom),
      };
      whereOr = [...whereOr, { createdAt: MoreThanOrEqual(createdAtFrom) }];
    } else if (createdAtTo) {
      whereAnd = {
        ...whereAnd,
        createdAt: LessThanOrEqual(createdAtTo),
      };
      whereOr = [...whereOr, { createdAt: LessThanOrEqual(createdAtTo) }];
    }

    if (updatedAtFrom && updatedAtTo) {
      whereAnd = {
        ...whereAnd,
        updatedAt: And(MoreThanOrEqual(updatedAtFrom), LessThanOrEqual(updatedAtTo)),
      };
      whereOr = [
        ...whereOr,
        {
          updatedAt: And(MoreThanOrEqual(updatedAtFrom), LessThanOrEqual(updatedAtTo)),
        },
      ];
    } else if (updatedAtFrom) {
      whereAnd = {
        ...whereAnd,
        updatedAt: MoreThanOrEqual(updatedAtFrom),
      };
      whereOr = [...whereOr, { updatedAt: MoreThanOrEqual(updatedAtFrom) }];
    } else if (updatedAtTo) {
      whereAnd = {
        ...whereAnd,
        updatedAt: LessThanOrEqual(updatedAtTo),
      };
      whereOr = [...whereOr, { updatedAt: LessThanOrEqual(updatedAtTo) }];
    }

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
      const { imageName, originalFileExtension, fileExtensions, entityId, fullPathExample } = item;

      const finded = tempImages.find(
        (tempImage) => tempImage.tempName === `${imageName}.${originalFileExtension}`,
      );

      if (!finded) return null;

      return {
        name: imageName,
        fileExtensions: fileExtensions,
        originalFileExtension: originalFileExtension,
        entityId: entityId,
        fullPathExample: fullPathExample,
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