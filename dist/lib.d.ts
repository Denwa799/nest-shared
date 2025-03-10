import { ReadStream } from 'fs';
import { GraphQLResolveInfo } from 'graphql';
import { IPaginate, IPreparedImage, QueryDataType } from './types';
import { AllImagesDto, ImageFileDto, TempImagesDto } from './dto';
export declare const getError: ({ error, message }: {
    error?: unknown;
    message?: string;
}) => void;
export declare const createPaginate: (page: number, count: number, limit: number, modelsNumber?: number) => IPaginate;
export declare const getPaginateSkip: (page: number, limit: number) => number;
export declare const formatPhone: (phone: string) => string;
export declare const concatenateTwo32BitNumbers: (low: number, high: number) => number;
export declare const checkPageAndLimit: (page: number, limit: number, maxLimit?: number) => {
    checkedPage: number;
    checkedLimit: number;
};
export declare const fileStreamToBuffer: (fileStream: ReadStream) => Promise<Buffer>;
export declare const createQueryData: <Entity>(page: number, limit: number, sortField: string, sortOrder: string, filterType: string, filter?: object, search?: object) => QueryDataType<Entity>;
export declare const extractGraphqlFields: (info: GraphQLResolveInfo) => string[];
export declare const prepareTempImages: (files: ImageFileDto[], tempImages: TempImagesDto[]) => IPreparedImage[];
export declare const getTempImagesInAllImages: (allImages: AllImagesDto[] | undefined) => TempImagesDto[];
export declare const updateEntityImages: (entityImages: string | null, allImages: AllImagesDto[] | undefined, preparedTempImages: IPreparedImage[]) => {
    newImages: IPreparedImage[] | null;
    deletedImages: ImageFileDto[] | null;
};
