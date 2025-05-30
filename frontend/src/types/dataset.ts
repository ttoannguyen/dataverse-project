export interface Dataset {
  name: string;
  global_id: string;
  metadata?: {
    country?: string;
    language?: string;
    format?: string;
    organization?: string;
    topic?: string;
    license?: string;
  };
}

export interface Filters {
  keyword: string;
  country: string;
  language: string;
  format: string;
  organization: string;
  topic: string;
  license: string;
  category?: string;
}

export interface DataverseCounts {
  totalDataverses: number;
  totalDatasets: number;
  totalFiles: number;
  rootDataverse: {
    dataverses: number;
    datasets: number;
    files: number;
  };
}

export interface FilterOptions {
  datasets: Dataset[];
  countries: string[];
  languages: string[];
  formats: string[];
  organizations: string[];
  topics: string[];
  licenses: string[];
}
