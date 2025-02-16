"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    checkPageAndLimit: function() {
        return checkPageAndLimit;
    },
    concatenateTwo32BitNumbers: function() {
        return concatenateTwo32BitNumbers;
    },
    createPaginate: function() {
        return createPaginate;
    },
    createQueryData: function() {
        return createQueryData;
    },
    fileStreamToBuffer: function() {
        return fileStreamToBuffer;
    },
    formatPhone: function() {
        return formatPhone;
    },
    getError: function() {
        return getError;
    },
    getPaginateSkip: function() {
        return getPaginateSkip;
    }
});
const _libphonenumberjs = /*#__PURE__*/ _interop_require_default(require("libphonenumber-js"));
const _typeorm = require("typeorm");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getError = ({ error, message })=>{
    if (error) console.error(error);
    if (message) console.error(message);
};
const createPaginate = (page, count, limit, modelsNumber = 1)=>{
    const pages = Math.ceil(count / (limit * modelsNumber));
    const paginate = {
        page,
        pages,
        previous: page > 1 ? page - 1 : undefined,
        next: page <= pages - 1 ? page + 1 : undefined,
        count,
        limit
    };
    return paginate;
};
const getPaginateSkip = (page, limit)=>{
    return (page - 1) * limit;
};
const formatPhone = (phone)=>{
    const parsedPhone = (0, _libphonenumberjs.default)(phone);
    if (!parsedPhone?.isValid()) return '';
    return parsedPhone.formatInternational();
};
const concatenateTwo32BitNumbers = (low, high)=>{
    return (high >>> 0) * Math.pow(2, 32) + (low >>> 0);
};
const checkPageAndLimit = (page, limit, maxLimit = 500)=>{
    const paginationData = {
        checkedPage: page,
        checkedLimit: limit
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
const fileStreamToBuffer = async (fileStream)=>{
    const chunks = [];
    for await (const chunk of fileStream){
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
};
const createQueryData = (page, limit, sortField, sortOrder, filterType, filter, search)=>{
    const queryData = {
        skip: getPaginateSkip(page, limit),
        take: limit
    };
    if (sortField && sortOrder) {
        queryData.order = {
            [sortField]: sortOrder
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
        for (const [key, value] of Object.entries(filter)){
            let currentKey = key;
            let currentValue;
            if (typeof value === 'object' && !Array.isArray(value) && typeof value?.getTime !== 'function') {
                const obj = JSON.parse(JSON.stringify(value));
                const valueObject = {};
                for (const [key, value] of Object.entries(obj)){
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    valueObject[key] = typeof value === 'boolean' ? value : (0, _typeorm.In)(value);
                }
                currentValue = valueObject;
            } else if (typeof value === 'boolean') {
                currentValue = value;
            } else {
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
                    // @NOTE тут перечисляются поля, которые массивы в базе данных и надо найти хотя бы одно вхождение.
                    const arraysFields = [
                        {
                            key: 'sectionsOR',
                            originalKey: 'sections'
                        }
                    ];
                    const finded = arraysFields.find((item)=>item.key === key);
                    if (finded) {
                        currentValue = (0, _typeorm.ArrayOverlap)(value);
                        currentKey = finded.originalKey;
                    } else {
                        currentValue = (0, _typeorm.In)(value);
                    }
                } else if (Array.isArray(value)) {
                    currentValue = (0, _typeorm.In)(value);
                }
            }
            if (currentValue) {
                whereAnd = {
                    ...whereAnd,
                    [currentKey]: currentValue
                };
                whereOr = [
                    ...whereOr,
                    {
                        [currentKey]: currentValue
                    }
                ];
            }
        }
        if (priceFrom && priceTo) {
            whereAnd = {
                ...whereAnd,
                price: (0, _typeorm.And)((0, _typeorm.MoreThanOrEqual)(priceFrom), (0, _typeorm.LessThanOrEqual)(priceTo))
            };
            whereOr = [
                ...whereOr,
                {
                    price: (0, _typeorm.And)((0, _typeorm.MoreThanOrEqual)(priceFrom), (0, _typeorm.LessThanOrEqual)(priceTo))
                }
            ];
        } else if (priceFrom) {
            whereAnd = {
                ...whereAnd,
                price: (0, _typeorm.MoreThanOrEqual)(priceFrom)
            };
            whereOr = [
                ...whereOr,
                {
                    price: (0, _typeorm.MoreThanOrEqual)(priceFrom)
                }
            ];
        } else if (priceTo) {
            whereAnd = {
                ...whereAnd,
                price: (0, _typeorm.LessThanOrEqual)(priceTo)
            };
            whereOr = [
                ...whereOr,
                {
                    price: (0, _typeorm.LessThanOrEqual)(priceTo)
                }
            ];
        }
        if (priorityFrom && priorityTo) {
            whereAnd = {
                ...whereAnd,
                priority: (0, _typeorm.And)((0, _typeorm.MoreThanOrEqual)(priorityFrom), (0, _typeorm.LessThanOrEqual)(priorityTo))
            };
            whereOr = [
                ...whereOr,
                {
                    priority: (0, _typeorm.And)((0, _typeorm.MoreThanOrEqual)(priorityFrom), (0, _typeorm.LessThanOrEqual)(priorityTo))
                }
            ];
        } else if (priorityFrom) {
            whereAnd = {
                ...whereAnd,
                priority: (0, _typeorm.MoreThanOrEqual)(priorityFrom)
            };
            whereOr = [
                ...whereOr,
                {
                    priority: (0, _typeorm.MoreThanOrEqual)(priorityFrom)
                }
            ];
        } else if (priorityTo) {
            whereAnd = {
                ...whereAnd,
                priority: (0, _typeorm.LessThanOrEqual)(priorityTo)
            };
            whereOr = [
                ...whereOr,
                {
                    priority: (0, _typeorm.LessThanOrEqual)(priorityTo)
                }
            ];
        }
        if (createdAtFrom && createdAtTo) {
            whereAnd = {
                ...whereAnd,
                createdAt: (0, _typeorm.And)((0, _typeorm.MoreThanOrEqual)(createdAtFrom), (0, _typeorm.LessThanOrEqual)(createdAtTo))
            };
            whereOr = [
                ...whereOr,
                {
                    createdAt: (0, _typeorm.And)((0, _typeorm.MoreThanOrEqual)(createdAtFrom), (0, _typeorm.LessThanOrEqual)(createdAtTo))
                }
            ];
        } else if (createdAtFrom) {
            whereAnd = {
                ...whereAnd,
                createdAt: (0, _typeorm.MoreThanOrEqual)(createdAtFrom)
            };
            whereOr = [
                ...whereOr,
                {
                    createdAt: (0, _typeorm.MoreThanOrEqual)(createdAtFrom)
                }
            ];
        } else if (createdAtTo) {
            whereAnd = {
                ...whereAnd,
                createdAt: (0, _typeorm.LessThanOrEqual)(createdAtTo)
            };
            whereOr = [
                ...whereOr,
                {
                    createdAt: (0, _typeorm.LessThanOrEqual)(createdAtTo)
                }
            ];
        }
        if (updatedAtFrom && updatedAtTo) {
            whereAnd = {
                ...whereAnd,
                updatedAt: (0, _typeorm.And)((0, _typeorm.MoreThanOrEqual)(updatedAtFrom), (0, _typeorm.LessThanOrEqual)(updatedAtTo))
            };
            whereOr = [
                ...whereOr,
                {
                    updatedAt: (0, _typeorm.And)((0, _typeorm.MoreThanOrEqual)(updatedAtFrom), (0, _typeorm.LessThanOrEqual)(updatedAtTo))
                }
            ];
        } else if (updatedAtFrom) {
            whereAnd = {
                ...whereAnd,
                updatedAt: (0, _typeorm.MoreThanOrEqual)(updatedAtFrom)
            };
            whereOr = [
                ...whereOr,
                {
                    updatedAt: (0, _typeorm.MoreThanOrEqual)(updatedAtFrom)
                }
            ];
        } else if (updatedAtTo) {
            whereAnd = {
                ...whereAnd,
                updatedAt: (0, _typeorm.LessThanOrEqual)(updatedAtTo)
            };
            whereOr = [
                ...whereOr,
                {
                    updatedAt: (0, _typeorm.LessThanOrEqual)(updatedAtTo)
                }
            ];
        }
        if (filterType === 'and') queryData.where = whereAnd;
        else if (filterType === 'or') queryData.where = whereOr;
    }
    if (search) {
        let searchWhere = {};
        for (const [key, value] of Object.entries(search)){
            searchWhere = {
                ...searchWhere,
                [key]: (0, _typeorm.ILike)(`%${value}%`)
            };
        }
        if (!queryData.where) queryData.where = searchWhere;
        if (Array.isArray(queryData.where)) queryData.where = [
            ...queryData.where,
            searchWhere
        ];
        else queryData.where = {
            ...searchWhere,
            ...queryData.where
        };
    }
    return queryData;
};
