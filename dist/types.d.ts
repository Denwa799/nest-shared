export interface IResponse<StatusCode, Data = object> {
    statusCode: StatusCode;
    messages?: string[];
    message?: string;
    error?: string;
    data?: Data;
}
export interface IPaginate {
    page: number;
    pages: number;
    previous?: number;
    next?: number;
    count: number;
    limit: number;
}
export type OkNotFoundType = IResponse<404 | 200>;
export type OkNotFoundBadRequestType = IResponse<404 | 400 | 200>;
export type OkNotFoundForbiddenType = IResponse<404 | 403 | 200>;
export type FilterType = 'and' | 'or';
export type SortOrderType = 'asc' | 'desc' | 'ASC' | 'DESC';
