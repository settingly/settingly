export interface Project {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  organization: ProjectOrganization;
  name: string;
  description?: string;
}

export interface ProjectOrganization {
  type: "user" | "organization";
  id: string;
}
