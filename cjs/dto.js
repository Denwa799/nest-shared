"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputPreparedImageDto = exports.PreparedImageDto = exports.AllImagesDto = exports.AddTempImagesDto = exports.TempImagesDto = exports.BadGatewayDto = exports.MethodNotAllowedDto = exports.NotFoundDto = exports.ForbiddenDto = exports.UnauthorizedDto = exports.BadRequestDto = exports.CreatedRequestDto = exports.OkRequestDto = exports.ImageFileDto = exports.DeleteDto = exports.Paginate = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let Paginate = class Paginate {
    page;
    pages;
    previous;
    next;
    count;
    limit;
};
exports.Paginate = Paginate;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
        description: 'Страница',
    }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Paginate.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '10',
        description: 'Всего страниц',
    }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Paginate.prototype, "pages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2',
        description: 'Предыдущая страница',
    }),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Paginate.prototype, "previous", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '3',
        description: 'Следующая страница',
    }),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Paginate.prototype, "next", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1000',
        description: 'Количество',
    }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Paginate.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '100',
        description: 'Лимит записей',
    }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Paginate.prototype, "limit", void 0);
exports.Paginate = Paginate = __decorate([
    (0, graphql_1.ObjectType)()
], Paginate);
let DeleteDto = class DeleteDto {
    id;
};
exports.DeleteDto = DeleteDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '3422b448-2460-4fd2-9183-8000de6f8343',
        description: 'Уникальный идентификатор',
    }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], DeleteDto.prototype, "id", void 0);
exports.DeleteDto = DeleteDto = __decorate([
    (0, graphql_1.InputType)()
], DeleteDto);
class ImageFileDto {
    imageName;
    originalFileExtension;
    entityId;
    fullPathExample;
    fileExtensions;
}
exports.ImageFileDto = ImageFileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'qwert', description: 'Название файла' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImageFileDto.prototype, "imageName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jpg', description: 'Расширение исходного файла' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImageFileDto.prototype, "originalFileExtension", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'qwert', description: 'Id сущности' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ImageFileDto.prototype, "entityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'qwert/qwert.jpg', description: 'Пример пути к файлу' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImageFileDto.prototype, "fullPathExample", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[webp, jpg]', description: 'Расширения готовых файлов' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ImageFileDto.prototype, "fileExtensions", void 0);
let OkRequestDto = class OkRequestDto {
    statusCode;
    message;
};
exports.OkRequestDto = OkRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '200', description: 'Статус код' }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], OkRequestDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Успех', description: 'Сообщение' }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], OkRequestDto.prototype, "message", void 0);
exports.OkRequestDto = OkRequestDto = __decorate([
    (0, graphql_1.ObjectType)()
], OkRequestDto);
let CreatedRequestDto = class CreatedRequestDto {
    statusCode;
    message;
};
exports.CreatedRequestDto = CreatedRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '201', description: 'Статус код' }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreatedRequestDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Успех', description: 'Сообщение' }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreatedRequestDto.prototype, "message", void 0);
exports.CreatedRequestDto = CreatedRequestDto = __decorate([
    (0, graphql_1.ObjectType)()
], CreatedRequestDto);
class BadRequestDto {
    statusCode;
    message;
    messages;
    error;
}
exports.BadRequestDto = BadRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '400', description: 'Статус код' }),
    __metadata("design:type", Number)
], BadRequestDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ошибка', description: 'Сообщение' }),
    __metadata("design:type", String)
], BadRequestDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '["Ошибка в поле name"]', description: 'Массив сообщений' }),
    __metadata("design:type", Array)
], BadRequestDto.prototype, "messages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Bad Request', description: 'Сообщение ошибки' }),
    __metadata("design:type", String)
], BadRequestDto.prototype, "error", void 0);
class UnauthorizedDto {
    statusCode;
    message;
    messages;
    error;
}
exports.UnauthorizedDto = UnauthorizedDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '401', description: 'Статус код' }),
    __metadata("design:type", Number)
], UnauthorizedDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ошибка', description: 'Сообщение' }),
    __metadata("design:type", String)
], UnauthorizedDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '["Ошибка в поле name"]', description: 'Массив сообщений' }),
    __metadata("design:type", Array)
], UnauthorizedDto.prototype, "messages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Unauthorized', description: 'Сообщение ошибки' }),
    __metadata("design:type", String)
], UnauthorizedDto.prototype, "error", void 0);
class ForbiddenDto {
    statusCode;
    message;
    messages;
    error;
}
exports.ForbiddenDto = ForbiddenDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '403', description: 'Статус код' }),
    __metadata("design:type", Number)
], ForbiddenDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ошибка', description: 'Сообщение' }),
    __metadata("design:type", String)
], ForbiddenDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '["Ошибка в поле name"]', description: 'Массив сообщений' }),
    __metadata("design:type", Array)
], ForbiddenDto.prototype, "messages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Forbidden', description: 'Сообщение ошибки' }),
    __metadata("design:type", String)
], ForbiddenDto.prototype, "error", void 0);
class NotFoundDto {
    statusCode;
    message;
    messages;
    error;
}
exports.NotFoundDto = NotFoundDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '404', description: 'Статус код' }),
    __metadata("design:type", Number)
], NotFoundDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ошибка', description: 'Сообщение' }),
    __metadata("design:type", String)
], NotFoundDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '["Ошибка в поле name"]', description: 'Массив сообщений' }),
    __metadata("design:type", Array)
], NotFoundDto.prototype, "messages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Not Found', description: 'Сообщение ошибки' }),
    __metadata("design:type", String)
], NotFoundDto.prototype, "error", void 0);
class MethodNotAllowedDto {
    statusCode;
    message;
    messages;
    error;
}
exports.MethodNotAllowedDto = MethodNotAllowedDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '405', description: 'Статус код' }),
    __metadata("design:type", Number)
], MethodNotAllowedDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ошибка', description: 'Сообщение' }),
    __metadata("design:type", String)
], MethodNotAllowedDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '["Ошибка в поле name"]', description: 'Массив сообщений' }),
    __metadata("design:type", Array)
], MethodNotAllowedDto.prototype, "messages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Method not allowed', description: 'Сообщение ошибки' }),
    __metadata("design:type", String)
], MethodNotAllowedDto.prototype, "error", void 0);
class BadGatewayDto {
    statusCode;
    message;
    messages;
    error;
}
exports.BadGatewayDto = BadGatewayDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '502', description: 'Статус код' }),
    __metadata("design:type", Number)
], BadGatewayDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ошибка', description: 'Сообщение' }),
    __metadata("design:type", String)
], BadGatewayDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '["Ошибка в поле name"]', description: 'Массив сообщений' }),
    __metadata("design:type", Array)
], BadGatewayDto.prototype, "messages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Method not allowed', description: 'Сообщение ошибки' }),
    __metadata("design:type", String)
], BadGatewayDto.prototype, "error", void 0);
let TempImagesDto = class TempImagesDto {
    tempName;
    altRU;
    altEN;
    altAR;
};
exports.TempImagesDto = TempImagesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test.jpg', description: 'Название файла в temp backet' }),
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 256),
    __metadata("design:type", String)
], TempImagesDto.prototype, "tempName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Вид на Сочи', description: 'Описание изображения' }),
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TempImagesDto.prototype, "altRU", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Описание изображения' }),
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TempImagesDto.prototype, "altEN", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Описание изображения' }),
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TempImagesDto.prototype, "altAR", void 0);
exports.TempImagesDto = TempImagesDto = __decorate([
    (0, graphql_1.InputType)()
], TempImagesDto);
let AddTempImagesDto = class AddTempImagesDto extends TempImagesDto {
    id;
};
exports.AddTempImagesDto = AddTempImagesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '3422b448-2460-4fd2-9183-8000de6f8343',
        description: 'Уникальный идентификатор',
    }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AddTempImagesDto.prototype, "id", void 0);
exports.AddTempImagesDto = AddTempImagesDto = __decorate([
    (0, graphql_1.InputType)()
], AddTempImagesDto);
let AllImagesDto = class AllImagesDto {
    name;
    tempName;
    altRU;
    altEN;
    altAR;
};
exports.AllImagesDto = AllImagesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test', description: 'Название файла' }),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 256),
    __metadata("design:type", String)
], AllImagesDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test.jpg', description: 'Название файла в temp backet' }),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 256),
    __metadata("design:type", String)
], AllImagesDto.prototype, "tempName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Вид на Сочи', description: 'Описание изображения' }),
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AllImagesDto.prototype, "altRU", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Описание изображения' }),
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AllImagesDto.prototype, "altEN", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Описание изображения' }),
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AllImagesDto.prototype, "altAR", void 0);
exports.AllImagesDto = AllImagesDto = __decorate([
    (0, graphql_1.InputType)()
], AllImagesDto);
let PreparedImageDto = class PreparedImageDto {
    name;
    fileExtensions;
    originalFileExtension;
    entityId;
    fullPathExample;
    altRU;
    altEN;
    altAR;
};
exports.PreparedImageDto = PreparedImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'qwer', description: 'Название файла' }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreparedImageDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[webp, jpg]', description: 'Расширения файла' }),
    (0, graphql_1.Field)(() => [String]),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], PreparedImageDto.prototype, "fileExtensions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jpg', description: 'Расширение оригинального файла' }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 5),
    __metadata("design:type", String)
], PreparedImageDto.prototype, "originalFileExtension", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '3422b448-2460-4fd2-9183-8000de6f8343',
        description: 'Уникальный идентификатор',
    }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PreparedImageDto.prototype, "entityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'qwert/qwert.jpg', description: 'Пример пути к файлу' }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreparedImageDto.prototype, "fullPathExample", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Яхта', description: 'Описание изображения' }),
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreparedImageDto.prototype, "altRU", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Описание изображения' }),
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreparedImageDto.prototype, "altEN", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Описание изображения' }),
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreparedImageDto.prototype, "altAR", void 0);
exports.PreparedImageDto = PreparedImageDto = __decorate([
    (0, graphql_1.ObjectType)()
], PreparedImageDto);
let InputPreparedImageDto = class InputPreparedImageDto {
    name;
    fileExtensions;
    originalFileExtension;
    entityId;
    fullPathExample;
    altRU;
    altEN;
    altAR;
};
exports.InputPreparedImageDto = InputPreparedImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'qwer', description: 'Название файла' }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InputPreparedImageDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[webp, jpg]', description: 'Расширения файла' }),
    (0, graphql_1.Field)(() => [String]),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], InputPreparedImageDto.prototype, "fileExtensions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jpg', description: 'Расширение оригинального файла' }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 5),
    __metadata("design:type", String)
], InputPreparedImageDto.prototype, "originalFileExtension", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '3422b448-2460-4fd2-9183-8000de6f8343',
        description: 'Уникальный идентификатор',
    }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], InputPreparedImageDto.prototype, "entityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'qwert/qwert.jpg', description: 'Пример пути к файлу' }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InputPreparedImageDto.prototype, "fullPathExample", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Яхта', description: 'Описание изображения' }),
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InputPreparedImageDto.prototype, "altRU", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Описание изображения' }),
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InputPreparedImageDto.prototype, "altEN", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Описание изображения' }),
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InputPreparedImageDto.prototype, "altAR", void 0);
exports.InputPreparedImageDto = InputPreparedImageDto = __decorate([
    (0, graphql_1.InputType)()
], InputPreparedImageDto);
//# sourceMappingURL=dto.js.map