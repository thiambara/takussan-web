export type ClassType<T> = new (...args: any[]) => T;
export type TableName =
  'addresses'
  | 'projects'
  | 'lands'
  | 'bookings'
  | 'users';

export interface BaseModelInterface {
  id?: number;
  created_at?: string;
  updated_at?: string;
  extra?: object;
  selected?: boolean;
}
