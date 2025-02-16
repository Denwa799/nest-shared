import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID, Length } from 'class-validator';

@ObjectType()
export class Paginate {
  @ApiProperty({
    example: '1',
    description: 'Страница',
  })
  @Field(() => Int)
  page: number;

  @ApiProperty({
    example: '10',
    description: 'Всего страниц',
  })
  @Field(() => Int)
  pages: number;

  @ApiPropertyOptional({
    example: '2',
    description: 'Предыдущая страница',
  })
  @Field(() => Int, { nullable: true })
  previous?: number;

  @ApiPropertyOptional({
    example: '3',
    description: 'Следующая страница',
  })
  @Field(() => Int, { nullable: true })
  next?: number;

  @ApiProperty({
    example: '1000',
    description: 'Количество',
  })
  @Field(() => Int)
  count: number;

  @ApiProperty({
    example: '100',
    description: 'Лимит записей',
  })
  @Field(() => Int)
  limit: number;
}

@InputType()
export class DeleteDto {
  @ApiProperty({
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
    description: 'Уникальный идентификатор',
  })
  @Field()
  @IsUUID()
  id: string;
}

export class ImageFileDto {
  @ApiProperty({ example: 'qwert', description: 'Название файла' })
  @IsString()
  imageName: string;

  @ApiProperty({ example: 'jpg', description: 'Расширение исходного файла' })
  @IsString()
  originalFileExtension: string;

  @ApiProperty({ example: 'qwert', description: 'Id сущности' })
  @IsUUID()
  entityId: string;

  @ApiProperty({ example: 'qwert/qwert.jpg', description: 'Пример пути к файлу' })
  @IsString()
  fullPathExample: string;

  @ApiProperty({ example: '[webp, jpg]', description: 'Расширения готовых файлов' })
  @IsArray()
  @IsString({ each: true })
  fileExtensions: string[];
}

@ObjectType()
export class OkRequestDto {
  @ApiProperty({ example: '200', description: 'Статус код' })
  @Field(() => Int)
  statusCode: 200;

  @ApiPropertyOptional({ example: 'Успех', description: 'Сообщение' })
  @Field({ nullable: true })
  message?: string;
}

@ObjectType()
export class CreatedRequestDto {
  @ApiProperty({ example: '201', description: 'Статус код' })
  @Field(() => Int)
  statusCode: 201;

  @ApiPropertyOptional({ example: 'Успех', description: 'Сообщение' })
  @Field({ nullable: true })
  message?: string;
}

export class BadRequestDto {
  @ApiProperty({ example: '400', description: 'Статус код' })
  statusCode: 400;

  @ApiPropertyOptional({ example: 'Ошибка', description: 'Сообщение' })
  message?: string;

  @ApiPropertyOptional({ example: '["Ошибка в поле name"]', description: 'Массив сообщений' })
  messages?: string[];

  @ApiPropertyOptional({ example: 'Bad Request', description: 'Сообщение ошибки' })
  error?: string;
}

export class UnauthorizedDto {
  @ApiProperty({ example: '401', description: 'Статус код' })
  statusCode: 401;

  @ApiPropertyOptional({ example: 'Ошибка', description: 'Сообщение' })
  message?: string;

  @ApiPropertyOptional({ example: '["Ошибка в поле name"]', description: 'Массив сообщений' })
  messages?: string[];

  @ApiPropertyOptional({ example: 'Unauthorized', description: 'Сообщение ошибки' })
  error?: string;
}

export class ForbiddenDto {
  @ApiProperty({ example: '403', description: 'Статус код' })
  statusCode: 403;

  @ApiPropertyOptional({ example: 'Ошибка', description: 'Сообщение' })
  message?: string;

  @ApiPropertyOptional({ example: '["Ошибка в поле name"]', description: 'Массив сообщений' })
  messages?: string[];

  @ApiPropertyOptional({ example: 'Forbidden', description: 'Сообщение ошибки' })
  error?: string;
}

export class NotFoundDto {
  @ApiProperty({ example: '404', description: 'Статус код' })
  statusCode: 404;

  @ApiPropertyOptional({ example: 'Ошибка', description: 'Сообщение' })
  message?: string;

  @ApiPropertyOptional({ example: '["Ошибка в поле name"]', description: 'Массив сообщений' })
  messages?: string[];

  @ApiPropertyOptional({ example: 'Not Found', description: 'Сообщение ошибки' })
  error?: string;
}

export class MethodNotAllowedDto {
  @ApiProperty({ example: '405', description: 'Статус код' })
  statusCode: 405;

  @ApiPropertyOptional({ example: 'Ошибка', description: 'Сообщение' })
  message?: string;

  @ApiPropertyOptional({ example: '["Ошибка в поле name"]', description: 'Массив сообщений' })
  messages?: string[];

  @ApiPropertyOptional({ example: 'Method not allowed', description: 'Сообщение ошибки' })
  error?: string;
}

export class BadGatewayDto {
  @ApiProperty({ example: '502', description: 'Статус код' })
  statusCode: 502;

  @ApiPropertyOptional({ example: 'Ошибка', description: 'Сообщение' })
  message?: string;

  @ApiPropertyOptional({ example: '["Ошибка в поле name"]', description: 'Массив сообщений' })
  messages?: string[];

  @ApiPropertyOptional({ example: 'Method not allowed', description: 'Сообщение ошибки' })
  error?: string;
}

@InputType()
export class TempImagesDto {
  @ApiProperty({ example: 'test.jpg', description: 'Название файла в temp backet' })
  @Field(() => String)
  @IsString()
  @Length(1, 256)
  tempName: string;

  @ApiPropertyOptional({ example: 'Вид на Сочи', description: 'Описание изображения' })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  altRU?: string;

  @ApiPropertyOptional({ description: 'Описание изображения' })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  altEN?: string;

  @ApiPropertyOptional({ description: 'Описание изображения' })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  altAR?: string;
}

@InputType()
export class AddTempImagesDto extends TempImagesDto {
  @ApiProperty({
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
    description: 'Уникальный идентификатор',
  })
  @Field()
  @IsUUID()
  id: string;
}

@InputType()
export class AllImagesDto {
  @ApiProperty({ example: 'test', description: 'Название файла' })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 256)
  name?: string;

  @ApiProperty({ example: 'test.jpg', description: 'Название файла в temp backet' })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 256)
  tempName?: string;

  @ApiPropertyOptional({ example: 'Вид на Сочи', description: 'Описание изображения' })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  altRU?: string;

  @ApiPropertyOptional({ description: 'Описание изображения' })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  altEN?: string;

  @ApiPropertyOptional({ description: 'Описание изображения' })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  altAR?: string;
}

@ObjectType()
export class PreparedImageDto {
  @ApiProperty({ example: 'qwer', description: 'Название файла' })
  @Field()
  @IsString()
  name: string;

  @ApiProperty({ example: '[webp, jpg]', description: 'Расширения файла' })
  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  fileExtensions: string[];

  @ApiProperty({ example: 'jpg', description: 'Расширение оригинального файла' })
  @Field()
  @IsString()
  @Length(4, 5)
  originalFileExtension: string;

  @ApiProperty({
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
    description: 'Уникальный идентификатор',
  })
  @Field()
  @IsUUID()
  entityId: string;

  @ApiProperty({ example: 'qwert/qwert.jpg', description: 'Пример пути к файлу' })
  @Field()
  @IsString()
  fullPathExample: string;

  @ApiPropertyOptional({ example: 'Яхта', description: 'Описание изображения' })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  altRU?: string;

  @ApiProperty({ description: 'Описание изображения' })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  altEN?: string;

  @ApiProperty({ description: 'Описание изображения' })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  altAR?: string;
}

@InputType()
export class InputPreparedImageDto {
  @ApiProperty({ example: 'qwer', description: 'Название файла' })
  @Field()
  @IsString()
  name: string;

  @ApiProperty({ example: '[webp, jpg]', description: 'Расширения файла' })
  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  fileExtensions: string[];

  @ApiProperty({ example: 'jpg', description: 'Расширение оригинального файла' })
  @Field()
  @IsString()
  @Length(4, 5)
  originalFileExtension: string;

  @ApiProperty({
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
    description: 'Уникальный идентификатор',
  })
  @Field()
  @IsUUID()
  entityId: string;

  @ApiProperty({ example: 'qwert/qwert.jpg', description: 'Пример пути к файлу' })
  @Field()
  @IsString()
  fullPathExample: string;

  @ApiProperty({ example: 'Яхта', description: 'Описание изображения' })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  altRU?: string;

  @ApiProperty({ description: 'Описание изображения' })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  altEN?: string;

  @ApiProperty({ description: 'Описание изображения' })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  altAR?: string;
}
