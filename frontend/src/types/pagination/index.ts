export type Item = {
  id: number;
  name: string;
};

export type PaginatedResponse = {
  data: Item[];
  total: number;
  page: number;
  pageSize: number;
};
