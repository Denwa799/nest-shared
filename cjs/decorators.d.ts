export declare const ApiProperty: ({ type, enumObject, min, max, example, description, isOptional, isUUID, isArray, isJson, isUrl, isPositive, isNegative, }: {
    type: "string" | "int" | "float" | "date" | "boolean";
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
}) => (<TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void);
