import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ValidationPipe implements PipeTransform<unknown> {
    transform(value: unknown, metadata: ArgumentMetadata): Promise<unknown>;
}
