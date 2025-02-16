import { IPaginate } from './types';
export declare const getError: ({ error, message }: {
    error?: unknown;
    message?: string;
}) => void;
export declare const createPaginate: (page: number, count: number, limit: number, modelsNumber?: number) => IPaginate;
export declare const getPaginateSkip: (page: number, limit: number) => number;
export declare const formatPhone: (phone: string) => string;
export declare const concatenateTwo32BitNumbers: (low: number, high: number) => number;
