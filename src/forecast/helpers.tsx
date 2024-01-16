import { PermitRecord } from "./types";
import dayjs from 'dayjs';


export function getPermitForecast(permits: PermitRecord[], kickoff: Date): PermitRecord[] {
  let approvalDates = new Map<string, Date>();

  // Function to sort permits based on dependencies
  function sortPermitsByDependencies(permits: PermitRecord[]): PermitRecord[] {
    // A helper function to check if all dependencies are resolved
    function areDependenciesResolved(permit: PermitRecord, resolvedIds: string[]): boolean {
      return permit.dependencyIds.every(id => resolvedIds.includes(id));
    }

    let sortedPermits: PermitRecord[] = [];
    let resolvedIds: string[] = [];

    while (sortedPermits.length < permits.length) {
      for (let permit of permits) {
        if (!resolvedIds.includes(permit.id) && areDependenciesResolved(permit, resolvedIds)) {
          sortedPermits.push(permit);
          resolvedIds.push(permit.id);
        }
      }
    }

    return sortedPermits;
  }

  let sortedPermits = sortPermitsByDependencies(permits);
  sortedPermits.forEach((permit: PermitRecord) => {
    let latestApprovalDate = new Date(kickoff.getTime()); // Set to kickoff date for comparison
    permit.dependencyIds.forEach((depId: string) => {
      const depApprovalDate = approvalDates.get(depId);
      if (depApprovalDate && depApprovalDate > latestApprovalDate) {
        latestApprovalDate = depApprovalDate;
      }
    });

    // Calculate the submit date
    let submitDate = latestApprovalDate;
    if (permit.dependencyIds.length === 0 || latestApprovalDate <= kickoff) {
      submitDate = new Date(kickoff.getTime());
    } else {
      submitDate.setDate(submitDate.getDate());
    }

    // Calculate the approval date based on the submit date and the estimated duration
    let approvalDate = new Date(submitDate.getTime());
    approvalDate.setDate(submitDate.getDate() + permit.estimatedDuration);

    approvalDates.set(permit.id, approvalDate);

    permit.submitDate = submitDate;
    permit.approvalDate = approvalDate;
  });

  return sortedPermits;
}

function sortPermitsByDependencies(permits: PermitRecord[]): PermitRecord[] {
  let sortedPermits: PermitRecord[] = [];
  let visited = new Set<string>();
  let visiting = new Set<string>();

  // Function to visit nodes in the graph (permits)
  function visit(permit: PermitRecord) {
    let id = permit.id;

    if (visited.has(id)) {
      return;
    }

    if (visiting.has(id)) {
      throw new Error(`Circular dependency detected at permit: ${id}`);
    }

    visiting.add(id);

    // Visit all dependencies first
    permit.dependencyIds.forEach(depId => {
      const depPermit = permits.find(p => p.id === depId);
      if (depPermit) {
        visit(depPermit);
      }
    });

    visiting.delete(id);
    visited.add(id);
    sortedPermits.push(permit); // Add permit to sorted list after visiting dependencies
  }

  // Start visiting all permits
  permits.forEach(permit => {
    if (!visited.has(permit.id)) {
      visit(permit);
    }
  });

  return sortedPermits.reverse(); // Reverse to get the correct order
}


