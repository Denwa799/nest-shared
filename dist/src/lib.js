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
    concatenateTwo32BitNumbers: function() {
        return concatenateTwo32BitNumbers;
    },
    createPaginate: function() {
        return createPaginate;
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
