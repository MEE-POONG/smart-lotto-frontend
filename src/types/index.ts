export * from './user';
export * from './enterprise';
export * from './customer';
export * from './order';
export * from './orderItem';
export * from './itemType';
export * from './quickNote';
export * from './changeLog';
export * from './lottery';

// Common input types for create/update operations
export type CreateInput<T> = Omit<T, 'id' | keyof { [K in keyof T]: T[K] extends Array<unknown> ? K : never }[keyof T]>;
export type UpdateInput<T> = Partial<CreateInput<T>>; 