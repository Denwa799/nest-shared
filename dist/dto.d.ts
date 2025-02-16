export declare class Paginate {
    page: number;
    pages: number;
    previous?: number;
    next?: number;
    count: number;
    limit: number;
}
export declare class DeleteDto {
    id: string;
}
export declare class ImageFileDto {
    imageName: string;
    originalFileExtension: string;
    entityId: string;
    fullPathExample: string;
    fileExtensions: string[];
}
export declare class OkRequestDto {
    statusCode: 200;
    message?: string;
}
export declare class CreatedRequestDto {
    statusCode: 201;
    message?: string;
}
export declare class BadRequestDto {
    statusCode: 400;
    message?: string;
    messages?: string[];
    error?: string;
}
export declare class UnauthorizedDto {
    statusCode: 401;
    message?: string;
    messages?: string[];
    error?: string;
}
export declare class ForbiddenDto {
    statusCode: 403;
    message?: string;
    messages?: string[];
    error?: string;
}
export declare class NotFoundDto {
    statusCode: 404;
    message?: string;
    messages?: string[];
    error?: string;
}
export declare class MethodNotAllowedDto {
    statusCode: 405;
    message?: string;
    messages?: string[];
    error?: string;
}
export declare class BadGatewayDto {
    statusCode: 502;
    message?: string;
    messages?: string[];
    error?: string;
}
