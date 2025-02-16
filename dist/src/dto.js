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
    AddTempImagesDto: function() {
        return AddTempImagesDto;
    },
    AllImagesDto: function() {
        return AllImagesDto;
    },
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
    InputPreparedImageDto: function() {
        return InputPreparedImageDto;
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
    PreparedImageDto: function() {
        return PreparedImageDto;
    },
    TempImagesDto: function() {
        return TempImagesDto;
    },
    UnauthorizedDto: function() {
        return UnauthorizedDto;
    }
});
const _graphql = require("@nestjs/graphql");
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
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], Paginate.prototype, "page", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '10',
        description: 'Всего страниц'
    }),
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], Paginate.prototype, "pages", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: '2',
        description: 'Предыдущая страница'
    }),
    (0, _graphql.Field)(()=>_graphql.Int, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Paginate.prototype, "previous", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: '3',
        description: 'Следующая страница'
    }),
    (0, _graphql.Field)(()=>_graphql.Int, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Paginate.prototype, "next", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '1000',
        description: 'Количество'
    }),
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], Paginate.prototype, "count", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '100',
        description: 'Лимит записей'
    }),
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], Paginate.prototype, "limit", void 0);
Paginate = _ts_decorate([
    (0, _graphql.ObjectType)()
], Paginate);
class DeleteDto {
    id;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '3422b448-2460-4fd2-9183-8000de6f8343',
        description: 'Уникальный идентификатор'
    }),
    (0, _graphql.Field)(),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], DeleteDto.prototype, "id", void 0);
DeleteDto = _ts_decorate([
    (0, _graphql.InputType)()
], DeleteDto);
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
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], OkRequestDto.prototype, "statusCode", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Успех',
        description: 'Сообщение'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], OkRequestDto.prototype, "message", void 0);
OkRequestDto = _ts_decorate([
    (0, _graphql.ObjectType)()
], OkRequestDto);
class CreatedRequestDto {
    statusCode;
    message;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '201',
        description: 'Статус код'
    }),
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], CreatedRequestDto.prototype, "statusCode", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Успех',
        description: 'Сообщение'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreatedRequestDto.prototype, "message", void 0);
CreatedRequestDto = _ts_decorate([
    (0, _graphql.ObjectType)()
], CreatedRequestDto);
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
class TempImagesDto {
    tempName;
    altRU;
    altEN;
    altAR;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'test.jpg',
        description: 'Название файла в temp backet'
    }),
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.Length)(1, 256),
    _ts_metadata("design:type", String)
], TempImagesDto.prototype, "tempName", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Вид на Сочи',
        description: 'Описание изображения'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], TempImagesDto.prototype, "altRU", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Описание изображения'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], TempImagesDto.prototype, "altEN", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Описание изображения'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], TempImagesDto.prototype, "altAR", void 0);
TempImagesDto = _ts_decorate([
    (0, _graphql.InputType)()
], TempImagesDto);
class AddTempImagesDto extends TempImagesDto {
    id;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '3422b448-2460-4fd2-9183-8000de6f8343',
        description: 'Уникальный идентификатор'
    }),
    (0, _graphql.Field)(),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], AddTempImagesDto.prototype, "id", void 0);
AddTempImagesDto = _ts_decorate([
    (0, _graphql.InputType)()
], AddTempImagesDto);
class AllImagesDto {
    name;
    tempName;
    altRU;
    altEN;
    altAR;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'test',
        description: 'Название файла'
    }),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.Length)(1, 256),
    _ts_metadata("design:type", String)
], AllImagesDto.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'test.jpg',
        description: 'Название файла в temp backet'
    }),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.Length)(1, 256),
    _ts_metadata("design:type", String)
], AllImagesDto.prototype, "tempName", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Вид на Сочи',
        description: 'Описание изображения'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], AllImagesDto.prototype, "altRU", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Описание изображения'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], AllImagesDto.prototype, "altEN", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Описание изображения'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], AllImagesDto.prototype, "altAR", void 0);
AllImagesDto = _ts_decorate([
    (0, _graphql.InputType)()
], AllImagesDto);
class PreparedImageDto {
    name;
    fileExtensions;
    originalFileExtension;
    entityId;
    fullPathExample;
    altRU;
    altEN;
    altAR;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'qwer',
        description: 'Название файла'
    }),
    (0, _graphql.Field)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], PreparedImageDto.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '[webp, jpg]',
        description: 'Расширения файла'
    }),
    (0, _graphql.Field)(()=>[
            String
        ]),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsString)({
        each: true
    }),
    _ts_metadata("design:type", Array)
], PreparedImageDto.prototype, "fileExtensions", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'jpg',
        description: 'Расширение оригинального файла'
    }),
    (0, _graphql.Field)(),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.Length)(4, 5),
    _ts_metadata("design:type", String)
], PreparedImageDto.prototype, "originalFileExtension", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '3422b448-2460-4fd2-9183-8000de6f8343',
        description: 'Уникальный идентификатор'
    }),
    (0, _graphql.Field)(),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], PreparedImageDto.prototype, "entityId", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'qwert/qwert.jpg',
        description: 'Пример пути к файлу'
    }),
    (0, _graphql.Field)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], PreparedImageDto.prototype, "fullPathExample", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'Яхта',
        description: 'Описание изображения'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], PreparedImageDto.prototype, "altRU", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Описание изображения'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], PreparedImageDto.prototype, "altEN", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Описание изображения'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], PreparedImageDto.prototype, "altAR", void 0);
PreparedImageDto = _ts_decorate([
    (0, _graphql.ObjectType)()
], PreparedImageDto);
class InputPreparedImageDto {
    name;
    fileExtensions;
    originalFileExtension;
    entityId;
    fullPathExample;
    altRU;
    altEN;
    altAR;
}
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'qwer',
        description: 'Название файла'
    }),
    (0, _graphql.Field)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], InputPreparedImageDto.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '[webp, jpg]',
        description: 'Расширения файла'
    }),
    (0, _graphql.Field)(()=>[
            String
        ]),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsString)({
        each: true
    }),
    _ts_metadata("design:type", Array)
], InputPreparedImageDto.prototype, "fileExtensions", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'jpg',
        description: 'Расширение оригинального файла'
    }),
    (0, _graphql.Field)(),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.Length)(4, 5),
    _ts_metadata("design:type", String)
], InputPreparedImageDto.prototype, "originalFileExtension", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '3422b448-2460-4fd2-9183-8000de6f8343',
        description: 'Уникальный идентификатор'
    }),
    (0, _graphql.Field)(),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], InputPreparedImageDto.prototype, "entityId", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'qwert/qwert.jpg',
        description: 'Пример пути к файлу'
    }),
    (0, _graphql.Field)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], InputPreparedImageDto.prototype, "fullPathExample", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'Яхта',
        description: 'Описание изображения'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], InputPreparedImageDto.prototype, "altRU", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Описание изображения'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], InputPreparedImageDto.prototype, "altEN", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Описание изображения'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], InputPreparedImageDto.prototype, "altAR", void 0);
InputPreparedImageDto = _ts_decorate([
    (0, _graphql.InputType)()
], InputPreparedImageDto);
