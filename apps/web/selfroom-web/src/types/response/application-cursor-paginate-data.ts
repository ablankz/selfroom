export interface ApplicationCursorPaginateData<T> {
  data: T[];
  nextCursor: string | null;
  prevCursor: string | null;
}
