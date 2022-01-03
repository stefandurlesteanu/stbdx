export interface IAbstractService<T> {
  getAll(qs?: Record<string, unknown>): Promise<T[]>;
  get(id: string, qs?: Record<string, unknown>): Promise<T>;
}
