export interface File_ {
  collectionId: string;
  collectionName: string;
  id: string;
  name: string;
  description: string;
  created: string;
  updated: string;
  project: string;

  /**
   * Only available when the file was fetched from the server.
   */
  versions: FileVersion[];
}

export interface FileVersion {
  collectionId: string;
  collectionName: string;
  id: string;
  content: Record<string, unknown>;
  created: Date;
  file: string;
  updated: Date;
}
