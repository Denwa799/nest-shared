import { applyDecorators } from '@nestjs/common';
import { Field, Float, Int } from '@nestjs/graphql';
import { ApiProperty as SwaggerApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsJSON,
  IsNegative,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export const ApiProperty = ({
  type,
  enumObject,
  min,
  max,
  example,
  description,
  isOptional = false,
  isUUID = false,
  isArray = false,
  isJson = false,
  isUrl = false,
  isPositive = false,
  isNegative = false,
}: {
  type: 'string' | 'int' | 'float' | 'date' | 'boolean';
  enumObject?: object;
  min?: number;
  max?: number;
  example?: string;
  description?: string;
  isOptional?: boolean;
  isUUID?: boolean;
  isArray?: boolean;
  isJson?: boolean;
  isUrl?: boolean;
  isPositive?: boolean;
  isNegative?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
}): (<TFunction extends Function, Y>(
  target: TFunction | object,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void) => {
  const decorators = [];

  if (isOptional) {
    decorators.push(
      ApiPropertyOptional({
        example,
        description,
      }),
    );
  } else {
    decorators.push(SwaggerApiProperty({ example, description }));
  }

  switch (type) {
    case 'int':
      decorators.push(Field(() => (isArray ? [Int] : Int), { nullable: isOptional }));

      if (isOptional) decorators.push(IsOptional());
      if (isArray) decorators.push(IsArray());

      decorators.push(IsNumber());

      if (min) decorators.push(Min(min, { each: isArray }));
      if (max) decorators.push(Max(max, { each: isArray }));

      break;
    case 'float':
      decorators.push(Field(() => (isArray ? [Float] : Float), { nullable: isOptional }));

      if (isOptional) decorators.push(IsOptional());
      if (isArray) decorators.push(IsArray());

      decorators.push(IsNumber());

      if (min) decorators.push(Min(min, { each: isArray }));
      if (max) decorators.push(Max(max, { each: isArray }));

      break;
    case 'date':
      decorators.push(Field(() => (isArray ? [Date] : Date), { nullable: isOptional }));

      if (isOptional) decorators.push(IsOptional());
      if (isArray) decorators.push(IsArray());

      decorators.push(IsDate({ each: isArray }));
      break;
    case 'boolean':
      decorators.push(Field({ nullable: isOptional }));
      if (isOptional) decorators.push(IsOptional());
      decorators.push(IsBoolean());
      break;
    case 'string':
    default:
      decorators.push(Field(() => (isArray ? [String] : String), { nullable: isOptional }));

      if (isOptional) decorators.push(IsOptional());
      if (isArray) decorators.push(IsArray());

      decorators.push(IsString({ each: isArray }));

      if (isUUID) decorators.push(IsUUID());
      if (isPositive) decorators.push(IsPositive());
      if (isNegative) decorators.push(IsNegative());
      if (min) decorators.push(MinLength(min, { each: isArray }));
      if (max) decorators.push(MaxLength(max, { each: isArray }));
      if (enumObject) decorators.push(IsEnum(enumObject, { each: isArray }));
      if (isJson) decorators.push(IsJSON());
      if (isUrl) decorators.push(IsUrl());
  }

  return applyDecorators(...decorators);
};
