"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTranslit = exports.translit = exports.updateEntityImages = exports.getTempImagesInAllImages = exports.prepareTempImages = exports.extractGraphqlFields = exports.createQueryData = exports.fileStreamToBuffer = exports.checkPageAndLimit = exports.concatenateTwo32BitNumbers = exports.formatPhone = exports.getPaginateSkip = exports.createPaginate = exports.getError = void 0;
const libphonenumber_js_1 = require("libphonenumber-js");
const typeorm_1 = require("typeorm");
const zod_1 = require("zod");
const getError = ({ error, message }) => {
    if (error)
        console.error(error);
    if (message)
        console.error(message);
};
exports.getError = getError;
const createPaginate = (page, count, limit, modelsNumber = 1) => {
    const pages = Math.ceil(count / (limit * modelsNumber));
    const paginate = {
        page,
        pages,
        previous: page > 1 ? page - 1 : undefined,
        next: page <= pages - 1 ? page + 1 : undefined,
        count,
        limit,
    };
    return paginate;
};
exports.createPaginate = createPaginate;
const getPaginateSkip = (page, limit) => {
    return (page - 1) * limit;
};
exports.getPaginateSkip = getPaginateSkip;
const formatPhone = (phone) => {
    const parsedPhone = (0, libphonenumber_js_1.default)(phone);
    if (!parsedPhone?.isValid())
        return '';
    return parsedPhone.number;
};
exports.formatPhone = formatPhone;
const concatenateTwo32BitNumbers = (low, high) => {
    return (high >>> 0) * Math.pow(2, 32) + (low >>> 0);
};
exports.concatenateTwo32BitNumbers = concatenateTwo32BitNumbers;
const checkPageAndLimit = (page, limit, maxLimit = 500) => {
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
exports.checkPageAndLimit = checkPageAndLimit;
const fileStreamToBuffer = async (fileStream) => {
    const chunks = [];
    for await (const chunk of fileStream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
};
exports.fileStreamToBuffer = fileStreamToBuffer;
const createQueryData = (page, limit, sortField, sortOrder, filterType, filter, search) => {
    const queryData = {
        skip: (0, exports.getPaginateSkip)(page, limit),
        take: limit,
    };
    if (sortField && sortOrder) {
        queryData.order = {
            [sortField]: sortOrder,
        };
    }
    if (filter) {
        let whereAnd = {};
        let whereOr = [];
        let priceFrom;
        let priceTo;
        let priorityFrom;
        let priorityTo;
        let createdAtFrom;
        let createdAtTo;
        let updatedAtFrom;
        let updatedAtTo;
        for (const [key, value] of Object.entries(filter)) {
            let currentKey = key;
            let currentValue;
            if (typeof value === 'object' &&
                !Array.isArray(value) &&
                typeof value?.getTime !== 'function') {
                const obj = JSON.parse(JSON.stringify(value));
                const valueObject = {};
                for (const [key, value] of Object.entries(obj)) {
                    valueObject[key] = typeof value === 'boolean' ? value : (0, typeorm_1.In)(value);
                }
                currentValue = valueObject;
            }
            else if (typeof value === 'boolean') {
                currentValue = value;
            }
            else {
                if (key === 'priceFrom') {
                    priceFrom = value;
                    continue;
                }
                if (key === 'priceTo') {
                    priceTo = value;
                    continue;
                }
                if (key === 'priorityFrom') {
                    priorityFrom = value;
                    continue;
                }
                if (key === 'priorityTo') {
                    priorityTo = value;
                    continue;
                }
                if (key === 'createdAtFrom') {
                    createdAtFrom = value;
                    continue;
                }
                if (key === 'createdAtTo') {
                    createdAtTo = value;
                    continue;
                }
                if (key === 'updatedAtFrom') {
                    updatedAtFrom = value;
                    continue;
                }
                if (key === 'updatedAtTo') {
                    updatedAtTo = value;
                    continue;
                }
                if (Array.isArray(value) && value.length) {
                    const arraysFields = [{ key: 'sectionsOR', originalKey: 'sections' }];
                    const finded = arraysFields.find((item) => item.key === key);
                    if (finded) {
                        currentValue = (0, typeorm_1.ArrayOverlap)(value);
                        currentKey = finded.originalKey;
                    }
                    else {
                        currentValue = (0, typeorm_1.In)(value);
                    }
                }
                else if (Array.isArray(value)) {
                    currentValue = (0, typeorm_1.In)(value);
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
                price: (0, typeorm_1.And)((0, typeorm_1.MoreThanOrEqual)(priceFrom), (0, typeorm_1.LessThanOrEqual)(priceTo)),
            };
            whereOr = [...whereOr, { price: (0, typeorm_1.And)((0, typeorm_1.MoreThanOrEqual)(priceFrom), (0, typeorm_1.LessThanOrEqual)(priceTo)) }];
        }
        else if (priceFrom) {
            whereAnd = {
                ...whereAnd,
                price: (0, typeorm_1.MoreThanOrEqual)(priceFrom),
            };
            whereOr = [...whereOr, { price: (0, typeorm_1.MoreThanOrEqual)(priceFrom) }];
        }
        else if (priceTo) {
            whereAnd = {
                ...whereAnd,
                price: (0, typeorm_1.LessThanOrEqual)(priceTo),
            };
            whereOr = [...whereOr, { price: (0, typeorm_1.LessThanOrEqual)(priceTo) }];
        }
        if (priorityFrom && priorityTo) {
            whereAnd = {
                ...whereAnd,
                priority: (0, typeorm_1.And)((0, typeorm_1.MoreThanOrEqual)(priorityFrom), (0, typeorm_1.LessThanOrEqual)(priorityTo)),
            };
            whereOr = [
                ...whereOr,
                { priority: (0, typeorm_1.And)((0, typeorm_1.MoreThanOrEqual)(priorityFrom), (0, typeorm_1.LessThanOrEqual)(priorityTo)) },
            ];
        }
        else if (priorityFrom) {
            whereAnd = {
                ...whereAnd,
                priority: (0, typeorm_1.MoreThanOrEqual)(priorityFrom),
            };
            whereOr = [...whereOr, { priority: (0, typeorm_1.MoreThanOrEqual)(priorityFrom) }];
        }
        else if (priorityTo) {
            whereAnd = {
                ...whereAnd,
                priority: (0, typeorm_1.LessThanOrEqual)(priorityTo),
            };
            whereOr = [...whereOr, { priority: (0, typeorm_1.LessThanOrEqual)(priorityTo) }];
        }
        if (createdAtFrom && createdAtTo) {
            whereAnd = {
                ...whereAnd,
                createdAt: (0, typeorm_1.And)((0, typeorm_1.MoreThanOrEqual)(createdAtFrom), (0, typeorm_1.LessThanOrEqual)(createdAtTo)),
            };
            whereOr = [
                ...whereOr,
                {
                    createdAt: (0, typeorm_1.And)((0, typeorm_1.MoreThanOrEqual)(createdAtFrom), (0, typeorm_1.LessThanOrEqual)(createdAtTo)),
                },
            ];
        }
        else if (createdAtFrom) {
            whereAnd = {
                ...whereAnd,
                createdAt: (0, typeorm_1.MoreThanOrEqual)(createdAtFrom),
            };
            whereOr = [...whereOr, { createdAt: (0, typeorm_1.MoreThanOrEqual)(createdAtFrom) }];
        }
        else if (createdAtTo) {
            whereAnd = {
                ...whereAnd,
                createdAt: (0, typeorm_1.LessThanOrEqual)(createdAtTo),
            };
            whereOr = [...whereOr, { createdAt: (0, typeorm_1.LessThanOrEqual)(createdAtTo) }];
        }
        if (updatedAtFrom && updatedAtTo) {
            whereAnd = {
                ...whereAnd,
                updatedAt: (0, typeorm_1.And)((0, typeorm_1.MoreThanOrEqual)(updatedAtFrom), (0, typeorm_1.LessThanOrEqual)(updatedAtTo)),
            };
            whereOr = [
                ...whereOr,
                {
                    updatedAt: (0, typeorm_1.And)((0, typeorm_1.MoreThanOrEqual)(updatedAtFrom), (0, typeorm_1.LessThanOrEqual)(updatedAtTo)),
                },
            ];
        }
        else if (updatedAtFrom) {
            whereAnd = {
                ...whereAnd,
                updatedAt: (0, typeorm_1.MoreThanOrEqual)(updatedAtFrom),
            };
            whereOr = [...whereOr, { updatedAt: (0, typeorm_1.MoreThanOrEqual)(updatedAtFrom) }];
        }
        else if (updatedAtTo) {
            whereAnd = {
                ...whereAnd,
                updatedAt: (0, typeorm_1.LessThanOrEqual)(updatedAtTo),
            };
            whereOr = [...whereOr, { updatedAt: (0, typeorm_1.LessThanOrEqual)(updatedAtTo) }];
        }
        if (filterType === 'and')
            queryData.where = whereAnd;
        else if (filterType === 'or')
            queryData.where = whereOr;
    }
    if (search) {
        let searchWhere = {};
        for (const [key, value] of Object.entries(search)) {
            searchWhere = {
                ...searchWhere,
                [key]: (0, typeorm_1.ILike)(`%${value}%`),
            };
        }
        if (!queryData.where)
            queryData.where = searchWhere;
        if (Array.isArray(queryData.where))
            queryData.where = [...queryData.where, searchWhere];
        else
            queryData.where = { ...searchWhere, ...queryData.where };
    }
    return queryData;
};
exports.createQueryData = createQueryData;
const extractGraphqlFields = (info) => {
    const processSelections = (selections, parentPath = '') => {
        const fields = [];
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
exports.extractGraphqlFields = extractGraphqlFields;
const prepareTempImages = (files, tempImages) => {
    const images = files
        .map((item) => {
        const { imageName, originalFileExtension, fileExtensions, prefixes, entityId, fullPathExample, } = item;
        const finded = tempImages.find((tempImage) => tempImage.tempName === `${imageName}.${originalFileExtension}`);
        if (!finded)
            return null;
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
        .filter((item) => item !== null);
    return images;
};
exports.prepareTempImages = prepareTempImages;
const getTempImagesInAllImages = (allImages) => {
    if (!allImages)
        return [];
    const tempImages = allImages
        .map((item) => {
        if (!item.tempName)
            return null;
        return {
            tempName: item.tempName,
            altRU: item.altRU,
            altEN: item.altEN,
            altAR: item.altAR,
        };
    })
        .filter((item) => item !== null);
    return tempImages;
};
exports.getTempImagesInAllImages = getTempImagesInAllImages;
const updateEntityImages = (entityImages, allImages, preparedTempImages) => {
    if ((!entityImages && !preparedTempImages.length) || !allImages) {
        return {
            newImages: null,
            deletedImages: null,
        };
    }
    let correctedImages = [];
    const deletedImages = [];
    const allImagesAndOrders = allImages.map((item, index) => {
        return {
            ...item,
            order: index,
        };
    });
    if (entityImages) {
        const images = JSON.parse(entityImages);
        const schema = zod_1.z.object({
            name: zod_1.z.string(),
            fileExtensions: zod_1.z.string().array(),
            prefixes: zod_1.z.string().array(),
            originalFileExtension: zod_1.z.string(),
            altRU: zod_1.z.string().optional().nullable(),
            altEN: zod_1.z.string().optional().nullable(),
            altAR: zod_1.z.string().optional().nullable(),
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
            }
            catch {
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
            .filter((item) => item !== null);
    }
    const preparedTempImagesAndOrder = preparedTempImages
        .map((item) => {
        const finded = allImagesAndOrders.find((element) => element.tempName === `${item.name}.${item.originalFileExtension}`);
        if (!finded)
            return null;
        return {
            ...item,
            order: finded.order,
        };
    })
        .filter((item) => item !== null);
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
exports.updateEntityImages = updateEntityImages;
const translit = (word, isTrim = true) => {
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
        if (converter[word[i]] == undefined) {
            answer += word[i];
        }
        else {
            answer += converter[word[i]];
        }
    }
    answer = answer.replace(/[^-0-9a-z]/g, '-');
    answer = answer.replace(/[-]+/g, '-');
    if (isTrim)
        answer = answer.replace(/^\\-|-$/g, '');
    return answer;
};
exports.translit = translit;
const checkTranslit = (string) => {
    const cpuRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    return cpuRegex.test(string);
};
exports.checkTranslit = checkTranslit;
//# sourceMappingURL=lib.js.map