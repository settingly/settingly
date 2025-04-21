export interface Token {
  id: string;
  collectionId: string;
  collectionName: string;
  project: string;
  token: string;
  created: Date;
  updated: Date;
  name: string;
  lastUsed: string;

  // This fields are only available after the token was fetched from the server
  responsibilities: string[];
  expirationDate: Date;
}
