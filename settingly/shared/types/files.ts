export interface File_ {
  _id: string;
  name: string;
  enabledEndpoints: ("rest" | "graphql")[];
  contentVersions: FileContentVersion[];
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
}

export interface FileContentVersion {
  id: string;
  content: string;
  createdAt: Date;
}
