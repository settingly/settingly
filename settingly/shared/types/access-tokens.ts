export interface AccessToken {
  _id: string;
  projectId: string;
  partialToken: string;
  createdAt: Date;
  name: string;
  permissions: string[];
}
