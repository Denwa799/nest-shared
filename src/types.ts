import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';

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

export type QueryDataType<Entity> = {
  skip: number;
  take: number;
  order?: FindOptionsOrder<Entity>;
  where?: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity>;
};

export type OkNotFoundType = IResponse<404 | 200>;
export type OkNotFoundBadRequestType = IResponse<404 | 400 | 200>;
export type OkNotFoundForbiddenType = IResponse<404 | 403 | 200>;

export type FilterType = 'and' | 'or';
export type SortOrderType = 'asc' | 'desc' | 'ASC' | 'DESC';

export interface IPreparedImage {
  name: string;
  fileExtensions: string[];
  originalFileExtension: string;
  entityId: string;
  fullPathExample: string;
  altRU?: string;
  altEN?: string;
  altAR?: string;
}

export interface IPreparedImageAndOrder extends IPreparedImage {
  order: number;
}

export interface IGetQuery {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: SortOrderType;
  filterType?: FilterType;
  filter?: object;
  search?: object;
}

export enum ImageContentTypeEnum {
  'image/webp' = 'image/webp',
  'image/jpeg' = 'image/jpeg',
  'image/png' = 'image/png',
  'application/octet-stream' = 'application/octet-stream',
}
