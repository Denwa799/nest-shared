import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString, IsUUID } from 'class-validator';

export class Paginate {
  @ApiProperty({
    example: '1',
    description: 'Страница',
  })
  page: number;

  @ApiProperty({
    example: '10',
    description: 'Всего страниц',
  })
  pages: number;

  @ApiPropertyOptional({
    example: '2',
    description: 'Предыдущая страница',
  })
  previous?: number;

  @ApiPropertyOptional({
    example: '3',
    description: 'Следующая страница',
  })
  next?: number;

  @ApiProperty({
    example: '1000',
    description: 'Количество',
  })
  count: number;

  @ApiProperty({
    example: '100',
    description: 'Лимит записей',
  })
  limit: number;
}

export class DeleteDto {
  @ApiProperty({
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
    description: 'Уникальный идентификатор',
  })
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

export class OkRequestDto {
  @ApiProperty({ example: '200', description: 'Статус код' })
  statusCode: 200;

  @ApiPropertyOptional({ example: 'Успех', description: 'Сообщение' })
  message?: string;
}

export class CreatedRequestDto {
  @ApiProperty({ example: '201', description: 'Статус код' })
  statusCode: 201;

  @ApiPropertyOptional({ example: 'Успех', description: 'Сообщение' })
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
