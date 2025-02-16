"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ValidationPipe", {
    enumerable: true,
    get: function() {
        return ValidationPipe;
    }
});
const _common = require("@nestjs/common");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _validationexception = require("./validation.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class ValidationPipe {
    async transform(value, metadata) {
        if (!metadata.metatype) return value;
        const obj = (0, _classtransformer.plainToClass)(metadata.metatype, value);
        if (typeof obj !== 'object') return value;
        const errors = await (0, _classvalidator.validate)(obj);
        if (errors.length) {
            const messages = errors.map((err)=>{
                if (!err.constraints) return `${err.property}`;
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
            });
            const response = {
                statusCode: _common.HttpStatus.BAD_REQUEST,
                error: 'Bad request',
                messages
            };
            throw new _validationexception.ValidationException(JSON.stringify(response));
        }
        return value;
    }
}
ValidationPipe = _ts_decorate([
    (0, _common.Injectable)()
], ValidationPipe);
