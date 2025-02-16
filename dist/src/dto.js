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
    BadGatewayDto: function() {
        return BadGatewayDto;
    },
    BadRequestDto: function() {
        return BadRequestDto;
    },
    CreatedRequestDto: function() {
        return CreatedRequestDto;
    },
    DeleteDto: function() {
        return DeleteDto;
    },
    ForbiddenDto: function() {
        return ForbiddenDto;
    },
    ImageFileDto: function() {
        return ImageFileDto;
    },
    MethodNotAllowedDto: function() {
        return MethodNotAllowedDto;
    },
    NotFoundDto: function() {
        return NotFoundDto;
    },
    OkRequestDto: function() {
        return OkRequestDto;
    },
    Paginate: function() {
        return Paginate;
    },
    UnauthorizedDto: function() {
        return UnauthorizedDto;
    }
});
const _swagger = require("@nestjs/swagger");
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class Paginate {
    page;
    pages;
    previous;
    next;
    count;
    limit;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '1',
        description: 'Страница'
    }),
    _ts_metadata("design:type", Number)
], Paginate.prototype, "page", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '10',
        description: 'Всего страниц'
    }),
    _ts_metadata("design:type", Number)
], Paginate.prototype, "pages", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: '2',
        description: 'Предыдущая страница'
    }),
    _ts_metadata("design:type", Number)
], Paginate.prototype, "previous", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: '3',
        description: 'Следующая страница'
    }),
    _ts_metadata("design:type", Number)
], Paginate.prototype, "next", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '1000',
        description: 'Количество'
    }),
    _ts_metadata("design:type", Number)
], Paginate.prototype, "count", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '100',
        description: 'Лимит записей'
    }),
    _ts_metadata("design:type", Number)
], Paginate.prototype, "limit", void 0);
class DeleteDto {
    id;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '3422b448-2460-4fd2-9183-8000de6f8343',
        description: 'Уникальный идентификатор'
    }),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], DeleteDto.prototype, "id", void 0);
class ImageFileDto {
    imageName;
    originalFileExtension;
    entityId;
    fullPathExample;
    fileExtensions;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'qwert',
        description: 'Название файла'
    }),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], ImageFileDto.prototype, "imageName", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'jpg',
        description: 'Расширение исходного файла'
    }),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], ImageFileDto.prototype, "originalFileExtension", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'qwert',
        description: 'Id сущности'
    }),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], ImageFileDto.prototype, "entityId", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'qwert/qwert.jpg',
        description: 'Пример пути к файлу'
    }),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], ImageFileDto.prototype, "fullPathExample", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '[webp, jpg]',
        description: 'Расширения готовых файлов'
    }),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsString)({
        each: true
    }),
    _ts_metadata("design:type", Array)
], ImageFileDto.prototype, "fileExtensions", void 0);
class OkRequestDto {
    statusCode;
    message;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '200',
        description: 'Статус код'
    }),
    _ts_metadata("design:type", Number)
], OkRequestDto.prototype, "statusCode", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Успех',
        description: 'Сообщение'
    }),
    _ts_metadata("design:type", String)
], OkRequestDto.prototype, "message", void 0);
class CreatedRequestDto {
    statusCode;
    message;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '201',
        description: 'Статус код'
    }),
    _ts_metadata("design:type", Number)
], CreatedRequestDto.prototype, "statusCode", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Успех',
        description: 'Сообщение'
    }),
    _ts_metadata("design:type", String)
], CreatedRequestDto.prototype, "message", void 0);
class BadRequestDto {
    statusCode;
    message;
    messages;
    error;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '400',
        description: 'Статус код'
    }),
    _ts_metadata("design:type", Number)
], BadRequestDto.prototype, "statusCode", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Ошибка',
        description: 'Сообщение'
    }),
    _ts_metadata("design:type", String)
], BadRequestDto.prototype, "message", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: '["Ошибка в поле name"]',
        description: 'Массив сообщений'
    }),
    _ts_metadata("design:type", Array)
], BadRequestDto.prototype, "messages", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Bad Request',
        description: 'Сообщение ошибки'
    }),
    _ts_metadata("design:type", String)
], BadRequestDto.prototype, "error", void 0);
class UnauthorizedDto {
    statusCode;
    message;
    messages;
    error;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '401',
        description: 'Статус код'
    }),
    _ts_metadata("design:type", Number)
], UnauthorizedDto.prototype, "statusCode", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Ошибка',
        description: 'Сообщение'
    }),
    _ts_metadata("design:type", String)
], UnauthorizedDto.prototype, "message", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: '["Ошибка в поле name"]',
        description: 'Массив сообщений'
    }),
    _ts_metadata("design:type", Array)
], UnauthorizedDto.prototype, "messages", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Unauthorized',
        description: 'Сообщение ошибки'
    }),
    _ts_metadata("design:type", String)
], UnauthorizedDto.prototype, "error", void 0);
class ForbiddenDto {
    statusCode;
    message;
    messages;
    error;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '403',
        description: 'Статус код'
    }),
    _ts_metadata("design:type", Number)
], ForbiddenDto.prototype, "statusCode", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Ошибка',
        description: 'Сообщение'
    }),
    _ts_metadata("design:type", String)
], ForbiddenDto.prototype, "message", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: '["Ошибка в поле name"]',
        description: 'Массив сообщений'
    }),
    _ts_metadata("design:type", Array)
], ForbiddenDto.prototype, "messages", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Forbidden',
        description: 'Сообщение ошибки'
    }),
    _ts_metadata("design:type", String)
], ForbiddenDto.prototype, "error", void 0);
class NotFoundDto {
    statusCode;
    message;
    messages;
    error;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '404',
        description: 'Статус код'
    }),
    _ts_metadata("design:type", Number)
], NotFoundDto.prototype, "statusCode", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Ошибка',
        description: 'Сообщение'
    }),
    _ts_metadata("design:type", String)
], NotFoundDto.prototype, "message", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: '["Ошибка в поле name"]',
        description: 'Массив сообщений'
    }),
    _ts_metadata("design:type", Array)
], NotFoundDto.prototype, "messages", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Not Found',
        description: 'Сообщение ошибки'
    }),
    _ts_metadata("design:type", String)
], NotFoundDto.prototype, "error", void 0);
class MethodNotAllowedDto {
    statusCode;
    message;
    messages;
    error;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '405',
        description: 'Статус код'
    }),
    _ts_metadata("design:type", Number)
], MethodNotAllowedDto.prototype, "statusCode", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Ошибка',
        description: 'Сообщение'
    }),
    _ts_metadata("design:type", String)
], MethodNotAllowedDto.prototype, "message", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: '["Ошибка в поле name"]',
        description: 'Массив сообщений'
    }),
    _ts_metadata("design:type", Array)
], MethodNotAllowedDto.prototype, "messages", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Method not allowed',
        description: 'Сообщение ошибки'
    }),
    _ts_metadata("design:type", String)
], MethodNotAllowedDto.prototype, "error", void 0);
class BadGatewayDto {
    statusCode;
    message;
    messages;
    error;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '502',
        description: 'Статус код'
    }),
    _ts_metadata("design:type", Number)
], BadGatewayDto.prototype, "statusCode", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Ошибка',
        description: 'Сообщение'
    }),
    _ts_metadata("design:type", String)
], BadGatewayDto.prototype, "message", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: '["Ошибка в поле name"]',
        description: 'Массив сообщений'
    }),
    _ts_metadata("design:type", Array)
], BadGatewayDto.prototype, "messages", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Method not allowed',
        description: 'Сообщение ошибки'
    }),
    _ts_metadata("design:type", String)
], BadGatewayDto.prototype, "error", void 0);
