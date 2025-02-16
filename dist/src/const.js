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
    EXTENSION_IMAGE_TYPE: function() {
        return EXTENSION_IMAGE_TYPE;
    },
    FILE_WEIGHT: function() {
        return FILE_WEIGHT;
    },
    PASSWORD_LENGTH: function() {
        return PASSWORD_LENGTH;
    },
    TIME: function() {
        return TIME;
    }
});
const TIME = {
    seconds: {
        minutes10: 600,
        hours1: 3600
    }
};
const PASSWORD_LENGTH = {
    min: 4,
    max: 20
};
const FILE_WEIGHT = {
    mb1: {
        bytes: 1_048_576
    },
    mb10: {
        bytes: 10_485_760
    }
};
const EXTENSION_IMAGE_TYPE = {
    webp: 'image/webp',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    jpe: 'image/jpeg',
    jif: 'image/jpeg',
    jfif: 'image/jpeg',
    jfi: 'image/jpeg',
    png: 'image/png'
};
