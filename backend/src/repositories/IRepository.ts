export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  findByEmail(email: string): Promise<T | null>;
  create(data: T): Promise<T>;
}
