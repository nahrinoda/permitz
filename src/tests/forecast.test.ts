import { getPermitForecast } from "../forecast/helpers";
import { PermitRecord } from "../forecast/types";

describe("Permit Forecast", () => {
  const mockPermits: PermitRecord[] = [
    { id: "1", name: "Permit A", dependencyIds: [], estimatedDuration: 10 },
    { id: "2", name: "Permit B", dependencyIds: ["1"], estimatedDuration: 5 },
    { id: "3", name: "Permit C", dependencyIds: ["1", "2"], estimatedDuration: 15 },
    { id: "4", name: "Permit D", dependencyIds: ["3"], estimatedDuration: 20 }
  ];

  it("calculates correct forecast dates for permits without dependencies", () => {
    const kickoffDate = new Date('2024-01-01');
    const result = getPermitForecast([{ ...mockPermits[0] }], kickoffDate);

    expect(result[0].submitDate).toEqual(kickoffDate);
    expect(result[0].approvalDate).toEqual(new Date('2024-01-11')); // 10 days after kickoff
  });

  it("calculates correct forecast dates for permits with multiple dependencies", () => {
    const kickoffDate = new Date('2024-01-01');
    const result = getPermitForecast(mockPermits, kickoffDate);

    // Permit A (no dependencies)
    expect(result.find(p => p.id === "1")?.submitDate).toEqual(kickoffDate);
    expect(result.find(p => p.id === "1")?.approvalDate).toEqual(new Date('2024-01-11'));

    // Permit B (depends on Permit A)
    expect(result.find(p => p.id === "2")?.submitDate).toEqual(new Date('2024-01-11'));
    expect(result.find(p => p.id === "2")?.approvalDate).toEqual(new Date('2024-01-16'));

    // Permit C (depends on Permit A and B)
    expect(result.find(p => p.id === "3")?.submitDate).toEqual(new Date('2024-01-16'));
    expect(result.find(p => p.id === "3")?.approvalDate).toEqual(new Date('2024-01-31'));

    // Permit D (depends on Permit C)
    expect(result.find(p => p.id === "4")?.submitDate).toEqual(new Date('2024-01-31'));
    expect(result.find(p => p.id === "4")?.approvalDate).toEqual(new Date('2024-02-20'));
  });

  it("handles empty permit array", () => {
    const result = getPermitForecast([], new Date());
    expect(result).toEqual([]);
  });
});
