export type PermitRecord = {
  id: string;
  name: string;
  estimatedDuration: number;
  dependencyIds: string[];
};

export enum SortOrder {
  Submit = "Submit Date",
  Approval = "Approval Date",
}
