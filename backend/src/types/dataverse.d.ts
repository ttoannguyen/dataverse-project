export interface DataverseItem {
  name: string;
  identifier: string;
  global_id: string;
  description: string;
  // Add more fields as needed
}

export interface DataverseSearchResponse {
  status: string;
  data: {
    total_count: number;
    start: number;
    items: DataverseItem[];
  };
}
