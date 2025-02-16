import parsePhoneNumber from 'libphonenumber-js';

import { IPaginate } from './types';

/**
 * @description Отлов ошибки
 * @param options - Объект параметров
 * @param options.error - Объект ошибки
 * @param options.message - Сообщение ошибки
 */
export const getError = ({ error, message }: { error?: unknown; message?: string }): void => {
  if (error) console.error(error);
  if (message) console.error(message);
};

/**
 * @description Создает объект с информацией о пагинации
 * @param {number} page - Текущая страница
 * @param {number} count - Общее количество записей
 * @param {number} limit - Сколько записей на одной странице,
 * @param {number} modelsNumber - Количество участвующих таблиц
 * @return Возвращает объект пагинации
 */
export const createPaginate = (
  page: number,
  count: number,
  limit: number,
  modelsNumber = 1,
): IPaginate => {
  const pages = Math.ceil(count / (limit * modelsNumber));

  const paginate: IPaginate = {
    page,
    pages,
    previous: page > 1 ? page - 1 : undefined,
    next: page <= pages - 1 ? page + 1 : undefined,
    count,
    limit,
  };

  return paginate;
};

/**
 * @description Превращает страницу и лимит в то, сколько пропустить записей в orm
 * @param {number} page - Текущая страница
 * @param {number} limit - Сколько записей на одной странице,
 * @return Возвращает orm skip
 */
export const getPaginateSkip = (page: number, limit: number): number => {
  return (page - 1) * limit;
};

/**
 * @description Валидация номера телефона
 * @param {string} phone - Номер телефона
 * @return {string} Возвращает либо пустую строку, либо отформатированный номер телефона
 * @example
 * const phone = formatPhone(+79885054219)
 * phone === "+7 988 5054219"
 */
export const formatPhone = (phone: string): string => {
  const parsedPhone = parsePhoneNumber(phone);
  if (!parsedPhone?.isValid()) return '';

  return parsedPhone.formatInternational();
};

/**
 * @description Объединяет два 32 битных числа
 * @param {number} low - младшие 32 бита числа
 * @param {number} hight - старшие 32 бита числа
 * @return {number} Готовое число
 */
export const concatenateTwo32BitNumbers = (low: number, high: number): number => {
  return (high >>> 0) * Math.pow(2, 32) + (low >>> 0);
};
