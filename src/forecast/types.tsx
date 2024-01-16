export type PermitRecord = {
  id: string;
  name: string;
  estimatedDuration: number;
  dependencyIds: string[];
  submitDate?: Date;
  approvalDate?: Date;
};

export enum SortOrder {
  Submit = "Submit Date",
  Approval = "Approval Date",
}