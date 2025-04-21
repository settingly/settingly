export interface Project {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  organization: ProjectOrganization;
  name: string;
  description?: string;

  // only for projects, which were fetched from the server
  filesCount?: number;
}

export interface ProjectOrganization {
  type: "user" | "organization";
  id: string;
}
