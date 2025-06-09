export interface DatasetInterface {
  status: string;
  data: DatasetData;
}

export interface DatasetData {
  id: number;
  identifier: string;
  persistentUrl: string;
  protocol: string;
  authority: string;
  separator: string;
  publisher: string;
  publicationDate: string;
  storageIdentifier: string;
  datasetType: string;
  latestVersion: DatasetVersion;
}

export interface DatasetVersion {
  id: number;
  datasetId: number;
  datasetPersistentId: string;
  storageIdentifier: string;
  versionNumber: number;
  versionMinorNumber: number;
  versionState: string;
  latestVersionPublishingState: string;
  deaccessionLink: string;
  productionDate: string;
  lastUpdateTime: string;
  releaseTime: string;
  createTime: string;
  publicationDate: string;
  citationDate: string;
  license: License;
  fileAccessRequest: boolean;
  metadataBlocks: MetadataBlocks;
  files: DatasetFile[];
}

export interface License {
  name: string;
  uri: string;
  iconUri: string;
  rightsIdentifier: string;
  rightsIdentifierScheme: string;
  schemeUri: string;
  languageCode: string;
}

export interface MetadataBlocks {
  citation: CitationBlock;
}

export interface CitationBlock {
  displayName: string;
  name: string;
  fields: MetadataField[];
}

export type MetadataField =
  | PrimitiveField
  | CompoundField
  | ControlledVocabularyField;

export interface PrimitiveField {
  typeName: string;
  multiple: boolean;
  typeClass: "primitive";
  value: string;
}

export interface CompoundField {
  typeName: string;
  multiple: boolean;
  typeClass: "compound";
  value: { [key: string]: PrimitiveField }[]; // For compound fields like author, datasetContact...
}

export interface ControlledVocabularyField {
  typeName: string;
  multiple: boolean;
  typeClass: "controlledVocabulary";
  value: string[];
}

export interface DatasetFile {
  label: string;
  restricted: boolean;
  version: number;
  datasetVersionId: number;
  dataFile: DataFile;
}

export interface DataFile {
  id: number;
  persistentId: string;
  filename: string;
  contentType: string;
  friendlyType: string;
  filesize: number;
  storageIdentifier: string;
  rootDataFileId: number;
  md5: string;
  checksum: Checksum;
  tabularData: boolean;
  creationDate: string; // ISO format: "YYYY-MM-DD"
  publicationDate: string; // ISO format
  fileAccessRequest: boolean;
}

export interface Checksum {
  type: string; // e.g., "MD5"
  value: string; // checksum value
}
