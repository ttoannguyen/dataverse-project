export type DataverseItem = DatasetItem | FileItem;

export type DatasetItem = {
  persistentId: string;
  type: "dataset";
  global_id: string;
  name: string;
  authors?: string[];
  description?: string;
  url: string;
  image_url?: string;
  published_at?: string; // ISO date string
  publisher?: string;
  citationHtml?: string;
  identifier_of_dataverse?: string;
  name_of_dataverse?: string;
  citation?: string;
  publicationStatuses?: string[];
  storageIdentifier?: string;
  keywords?: string[];
  subjects?: string[];
  fileCount?: number;
  versionId?: number;
  versionState?: string;
  majorVersion?: number;
  minorVersion?: number;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
  contacts?: Contact[];
  publications?: Publication[];
};

export type Contact = {
  name?: string;
  affiliation?: string;
};

export type Publication = {
  citation?: string;
};

export type FileItem = {
  type: "file";
  file_id: string;
  name: string;
  file_type?: string;
  file_content_type?: string;
  size_in_bytes?: number;
  md5?: string;
  checksum?: Checksum;
  file_persistent_id?: string;
  dataset_name?: string;
  dataset_id?: string;
  dataset_persistent_id?: string;
  dataset_citation?: string;
  restricted?: boolean;
  canDownloadFile?: boolean;
  publicationStatuses?: string[];
  releaseOrCreateDate?: string; // ISO date string
  url: string;
  image_url?: string;
  published_at?: string; // ISO date string
};

export type Checksum = {
  type?: string;
  value?: string;
};
