"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiProperty = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const ApiProperty = ({ type, enumObject, min, max, arrayMinSize, arrayMaxSize, example, description, isOptional = false, isUUID = false, isArray = false, isJson = false, isJWT = false, isUrl = false, isPositive = false, isNegative = false, isEmail = false, isMobilePhone = false, isPhoneNumber = false, isLatitude = false, isLongitude = false, isStrongPassword = false, isArrayNotEmpty = false, isArrayUnique = false, }) => {
    const decorators = [];
    if (isOptional) {
        decorators.push((0, swagger_1.ApiPropertyOptional)({
            example,
            description,
        }));
    }
    else {
        decorators.push((0, swagger_1.ApiProperty)({ example, description }));
    }
    switch (type) {
        case 'int':
            decorators.push((0, graphql_1.Field)(() => (isArray ? [graphql_1.Int] : graphql_1.Int), { nullable: isOptional }));
            if (isOptional)
                decorators.push((0, class_validator_1.IsOptional)());
            if (isArray) {
                decorators.push((0, class_validator_1.IsArray)());
                if (isArrayNotEmpty)
                    decorators.push((0, class_validator_1.ArrayNotEmpty)());
                if (isArrayUnique)
                    decorators.push((0, class_validator_1.ArrayUnique)());
                if (arrayMinSize)
                    decorators.push((0, class_validator_1.ArrayMinSize)(arrayMinSize));
                if (arrayMaxSize)
                    decorators.push((0, class_validator_1.ArrayMaxSize)(arrayMaxSize));
            }
            decorators.push((0, class_validator_1.IsNumber)());
            decorators.push((0, class_validator_1.IsInt)());
            if (min)
                decorators.push((0, class_validator_1.Min)(min, { each: isArray }));
            if (max)
                decorators.push((0, class_validator_1.Max)(max, { each: isArray }));
            break;
        case 'float':
            decorators.push((0, graphql_1.Field)(() => (isArray ? [graphql_1.Float] : graphql_1.Float), { nullable: isOptional }));
            if (isOptional)
                decorators.push((0, class_validator_1.IsOptional)());
            if (isArray) {
                decorators.push((0, class_validator_1.IsArray)());
                if (isArrayNotEmpty)
                    decorators.push((0, class_validator_1.ArrayNotEmpty)());
                if (isArrayUnique)
                    decorators.push((0, class_validator_1.ArrayUnique)());
                if (arrayMinSize)
                    decorators.push((0, class_validator_1.ArrayMinSize)(arrayMinSize));
                if (arrayMaxSize)
                    decorators.push((0, class_validator_1.ArrayMaxSize)(arrayMaxSize));
            }
            decorators.push((0, class_validator_1.IsNumber)());
            if (min)
                decorators.push((0, class_validator_1.Min)(min, { each: isArray }));
            if (max)
                decorators.push((0, class_validator_1.Max)(max, { each: isArray }));
            break;
        case 'date':
            decorators.push((0, graphql_1.Field)(() => (isArray ? [Date] : Date), { nullable: isOptional }));
            if (isOptional)
                decorators.push((0, class_validator_1.IsOptional)());
            if (isArray) {
                decorators.push((0, class_validator_1.IsArray)());
                if (isArrayNotEmpty)
                    decorators.push((0, class_validator_1.ArrayNotEmpty)());
                if (isArrayUnique)
                    decorators.push((0, class_validator_1.ArrayUnique)());
                if (arrayMinSize)
                    decorators.push((0, class_validator_1.ArrayMinSize)(arrayMinSize));
                if (arrayMaxSize)
                    decorators.push((0, class_validator_1.ArrayMaxSize)(arrayMaxSize));
            }
            decorators.push((0, class_validator_1.IsDate)({ each: isArray }));
            break;
        case 'boolean':
            decorators.push((0, graphql_1.Field)({ nullable: isOptional }));
            if (isOptional)
                decorators.push((0, class_validator_1.IsOptional)());
            decorators.push((0, class_validator_1.IsBoolean)());
            break;
        case 'string':
        default:
            if (enumObject) {
                decorators.push((0, graphql_1.Field)(() => (isArray ? [enumObject] : enumObject), { nullable: isOptional }));
            }
            else {
                decorators.push((0, graphql_1.Field)(() => (isArray ? [String] : String), { nullable: isOptional }));
            }
            if (isOptional)
                decorators.push((0, class_validator_1.IsOptional)());
            if (isArray) {
                decorators.push((0, class_validator_1.IsArray)());
                if (isArrayNotEmpty)
                    decorators.push((0, class_validator_1.ArrayNotEmpty)());
                if (isArrayUnique)
                    decorators.push((0, class_validator_1.ArrayUnique)());
                if (arrayMinSize)
                    decorators.push((0, class_validator_1.ArrayMinSize)(arrayMinSize));
                if (arrayMaxSize)
                    decorators.push((0, class_validator_1.ArrayMaxSize)(arrayMaxSize));
            }
            decorators.push((0, class_validator_1.IsString)({ each: isArray }));
            if (isUUID)
                decorators.push((0, class_validator_1.IsUUID)());
            if (isEmail)
                decorators.push((0, class_validator_1.IsEmail)());
            if (isMobilePhone)
                decorators.push((0, class_validator_1.IsMobilePhone)());
            if (isPhoneNumber)
                decorators.push((0, class_validator_1.IsPhoneNumber)());
            if (isPositive)
                decorators.push((0, class_validator_1.IsPositive)());
            if (isNegative)
                decorators.push((0, class_validator_1.IsNegative)());
            if (min)
                decorators.push((0, class_validator_1.MinLength)(min, { each: isArray }));
            if (max)
                decorators.push((0, class_validator_1.MaxLength)(max, { each: isArray }));
            if (enumObject)
                decorators.push((0, class_validator_1.IsEnum)(enumObject, { each: isArray }));
            if (isJson)
                decorators.push((0, class_validator_1.IsJSON)());
            if (isJWT)
                decorators.push((0, class_validator_1.IsJWT)());
            if (isUrl)
                decorators.push((0, class_validator_1.IsUrl)());
            if (isLatitude)
                decorators.push((0, class_validator_1.IsLatitude)());
            if (isLongitude)
                decorators.push((0, class_validator_1.IsLongitude)());
            if (isStrongPassword)
                decorators.push((0, class_validator_1.IsStrongPassword)());
    }
    return (0, common_1.applyDecorators)(...decorators);
};
exports.ApiProperty = ApiProperty;
//# sourceMappingURL=decorators.js.map