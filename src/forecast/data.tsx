import { PermitRecord } from "./types";

export const permitData: PermitRecord[] = [
  {
    id: "1",
    name: "Building Permit",
    dependencyIds: [],
    estimatedDuration: 30,
  },
  {
    id: "2",
    name: "Electrical Permit",
    dependencyIds: ["1"],
    estimatedDuration: 10,
  },
  {
    id: "3",
    name: "Plumbing Permit",
    dependencyIds: ["1"],
    estimatedDuration: 15,
  },
  {
    id: "4",
    name: "Demolition Permit",
    dependencyIds: [],
    estimatedDuration: 20,
  },
  {
    id: "5",
    name: "Zoning Permit",
    dependencyIds: ["1", "4"],
    estimatedDuration: 25,
  },
  {
    id: "6",
    name: "Environmental Impact Assessment",
    dependencyIds: ["4"],
    estimatedDuration: 45,
  },
  {
    id: "7",
    name: "Fire Safety Inspection",
    dependencyIds: ["2", "3"],
    estimatedDuration: 10,
  },
  {
    id: "8",
    name: "Accessibility Compliance Inspection",
    dependencyIds: ["1", "2", "3"],
    estimatedDuration: 20,
  },
  {
    id: "9",
    name: "Occupancy Permit",
    dependencyIds: ["5", "6", "8"],
    estimatedDuration: 30,
  },
];
