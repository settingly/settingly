export interface File_ {
  collectionId: string;
  collectionName: string;
  id: string;
  name: string;
  description: string;
  created: Date;
  updated: Date;
  project: string;

  /**
   * Only available when the file was fetched from the server.
   */
  fileVersions: FileVersion[];
}

export interface FileVersion {
  collectionId: string;
  collectionName: string;
  id: string;
  content: string;
  created: Date;
  updated: Date;
}
