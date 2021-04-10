export interface DataListado <T> {
  currentPage?:number;
  totalPages?:number;
  pageSize?:number;
  totalEntities?:number;
  data?: T[];
}
