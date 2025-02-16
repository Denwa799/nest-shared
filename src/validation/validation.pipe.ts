import { ArgumentMetadata, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { IResponse } from '../types';

import { ValidationException } from './validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(value: unknown, metadata: ArgumentMetadata): Promise<unknown> {
    if (!metadata.metatype) return value;

    const obj: object = plainToClass(metadata.metatype, value);
    if (typeof obj !== 'object') return value;

    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((err) => {
        if (!err.constraints) return `${err.property}`;
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
      });

      const response = {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad request',
        messages,
      } as IResponse<HttpStatus.BAD_REQUEST>;

      throw new ValidationException(JSON.stringify(response));
    }
    return value;
  }
}
