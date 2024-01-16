import { PermitRecord } from "./types";
import dayjs from 'dayjs';


export function getPermitForecast(permits: PermitRecord[], kickoff: Date): PermitRecord[] {
  let approvalDates = new Map<string, Date>();

  // Sort permits by dependency order
  let sortedPermits = sortPermitsByDependencies(permits);

  sortedPermits.forEach(permit => {
    let submitDate = kickoff;
    if (permit.dependencyIds.length > 0) {
      // Find the latest approval date among dependencies
      submitDate = permit.dependencyIds.reduce((latest, id) => {
        let depApprovalDate = approvalDates.get(id);
        return depApprovalDate > latest ? depApprovalDate : latest;
      }, kickoff);
    }

    let approvalDate = dayjs(submitDate).add(permit.estimatedDuration, 'day').toDate();
    approvalDates.set(permit.id, approvalDate);

    permit.submitDate = submitDate;  // Adding new property to permit
    permit.approvalDate = approvalDate;  // Adding new property to permit
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


