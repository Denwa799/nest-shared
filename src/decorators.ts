import { applyDecorators } from '@nestjs/common';
import { Field, Float, Int } from '@nestjs/graphql';
import { ApiProperty as SwaggerApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsJSON,
  IsJWT,
  IsLatitude,
  IsLongitude,
  IsMobilePhone,
  IsNegative,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  IsStrongPassword,
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
  arrayMinSize,
  arrayMaxSize,
  example,
  description,
  isOptional = false,
  isUUID = false,
  isArray = false,
  isJson = false,
  isJWT = false,
  isUrl = false,
  isPositive = false,
  isNegative = false,
  isEmail = false,
  isMobilePhone = false,
  isPhoneNumber = false,
  isLatitude = false,
  isLongitude = false,
  isStrongPassword = false,
  isArrayNotEmpty = false,
  isArrayUnique = false,
}: {
  type: 'string' | 'int' | 'float' | 'date' | 'boolean';
  enumObject?: object;
  min?: number;
  max?: number;
  arrayMinSize?: number;
  arrayMaxSize?: number;
  example?: string;
  description?: string;
  isOptional?: boolean;
  isUUID?: boolean;
  isArray?: boolean;
  isJson?: boolean;
  isJWT?: boolean;
  isUrl?: boolean;
  isPositive?: boolean;
  isNegative?: boolean;
  isEmail?: boolean;
  isMobilePhone?: boolean;
  isPhoneNumber?: boolean;
  isLatitude?: boolean;
  isLongitude?: boolean;
  isStrongPassword?: boolean;
  isArrayNotEmpty?: boolean;
  isArrayUnique?: boolean;
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

      if (isArray) {
        decorators.push(IsArray());
        if (isArrayNotEmpty) decorators.push(ArrayNotEmpty());
        if (isArrayUnique) decorators.push(ArrayUnique());
        if (arrayMinSize) decorators.push(ArrayMinSize(arrayMinSize));
        if (arrayMaxSize) decorators.push(ArrayMaxSize(arrayMaxSize));
      }

      decorators.push(IsNumber());
      decorators.push(IsInt());

      if (min) decorators.push(Min(min, { each: isArray }));
      if (max) decorators.push(Max(max, { each: isArray }));

      break;
    case 'float':
      decorators.push(Field(() => (isArray ? [Float] : Float), { nullable: isOptional }));

      if (isOptional) decorators.push(IsOptional());

      if (isArray) {
        decorators.push(IsArray());
        if (isArrayNotEmpty) decorators.push(ArrayNotEmpty());
        if (isArrayUnique) decorators.push(ArrayUnique());
        if (arrayMinSize) decorators.push(ArrayMinSize(arrayMinSize));
        if (arrayMaxSize) decorators.push(ArrayMaxSize(arrayMaxSize));
      }

      decorators.push(IsNumber());

      if (min) decorators.push(Min(min, { each: isArray }));
      if (max) decorators.push(Max(max, { each: isArray }));

      break;
    case 'date':
      decorators.push(Field(() => (isArray ? [Date] : Date), { nullable: isOptional }));

      if (isOptional) decorators.push(IsOptional());

      if (isArray) {
        decorators.push(IsArray());
        if (isArrayNotEmpty) decorators.push(ArrayNotEmpty());
        if (isArrayUnique) decorators.push(ArrayUnique());
        if (arrayMinSize) decorators.push(ArrayMinSize(arrayMinSize));
        if (arrayMaxSize) decorators.push(ArrayMaxSize(arrayMaxSize));
      }

      decorators.push(IsDate({ each: isArray }));
      break;
    case 'boolean':
      decorators.push(Field({ nullable: isOptional }));
      if (isOptional) decorators.push(IsOptional());
      decorators.push(IsBoolean());
      break;
    case 'string':
    default:
      if (enumObject) {
        decorators.push(
          Field(() => (isArray ? [enumObject] : enumObject), { nullable: isOptional }),
        );
      } else {
        decorators.push(Field(() => (isArray ? [String] : String), { nullable: isOptional }));
      }

      if (isOptional) decorators.push(IsOptional());

      if (isArray) {
        decorators.push(IsArray());
        if (isArrayNotEmpty) decorators.push(ArrayNotEmpty());
        if (isArrayUnique) decorators.push(ArrayUnique());
        if (arrayMinSize) decorators.push(ArrayMinSize(arrayMinSize));
        if (arrayMaxSize) decorators.push(ArrayMaxSize(arrayMaxSize));
      }

      decorators.push(IsString({ each: isArray }));

      if (isUUID) decorators.push(IsUUID());
      if (isEmail) decorators.push(IsEmail());
      if (isMobilePhone) decorators.push(IsMobilePhone());
      if (isPhoneNumber) decorators.push(IsPhoneNumber());
      if (isPositive) decorators.push(IsPositive());
      if (isNegative) decorators.push(IsNegative());
      if (min) decorators.push(MinLength(min, { each: isArray }));
      if (max) decorators.push(MaxLength(max, { each: isArray }));
      if (enumObject) decorators.push(IsEnum(enumObject, { each: isArray }));
      if (isJson) decorators.push(IsJSON());
      if (isJWT) decorators.push(IsJWT());
      if (isUrl) decorators.push(IsUrl());
      if (isLatitude) decorators.push(IsLatitude());
      if (isLongitude) decorators.push(IsLongitude());
      if (isStrongPassword) decorators.push(IsStrongPassword());
  }

  return applyDecorators(...decorators);
};
