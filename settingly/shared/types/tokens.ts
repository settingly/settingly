export interface Token {
  _id: string;
  projectId: string;
  token: string;
  createdAt: Date;
  name: string;
  lastUsedAt: string | null;

  // This fields are only available after the token was fetched from the server
  permissions: string[];
  expirationDate: Date;
}
