# Project Forecast Solution

## Overview

The `getPermitForecast` function in our application calculates forecasted submission (submitDate) and approval (approvalDate) dates for a set of permits, considering their dependencies.

## Functionality

### Dependency Sorting

Permits are sorted based on their dependencies using the `sortPermitsByDependencies` function. This sorting ensures that each permit is processed only after all its dependencies have been processed.

### Date Calculation

For each permit, if it has dependencies, the `submitDate` is set to the day the latest `approvalDate` of all its dependencies. If there are no dependencies, `submitDate` is set to the project's kickoff date. The `approvalDate` is calculated by adding the `estimatedDuration` of the permit to its `submitDate`.

## Testing Strategy

- **Unit Tests**: Comprehensive unit tests are written for `getPermitForecast` to ensure accuracy in various scenarios: permits with no dependencies, permits with multiple dependencies, and permits with sequential dependencies.

- **Edge Cases**: Tests include handling edge cases like zero duration permits or permits with dependencies that have not yet been resolved.

- **Mock Data**: Mock permit data is used in tests to simulate real-world scenarios. This data helps validate the accuracy of date calculations and dependency resolution.

## Runtime Complexity

The runtime complexity of the `getPermitForecast` function depends on two primary factors:

- **Sorting by Dependencies**: The `sortPermitsByDependencies` function performs topological sorting, which has a complexity of O(V + E), where V is the number of permits and E is the number of dependencies.

- **Date Calculation**: Iterating through each permit to calculate dates has a complexity of O(N), where N is the number of permits.

Overall, the complexity is O(V + E + N), which is generally efficient for practical use-cases.

## Future Improvements (if more time were available)

If more time were available, several improvements could be considered:

- **Optimization**: Performance optimization could be explored to make the calculation even more efficient for large datasets.

- **Parallel Processing**: Depending on the requirements, parallel processing of permits could be investigated to speed up calculations.

- **Visualization**: Creating a visualization of the permit approval workflow could be beneficial for project planning and monitoring.

## Other Approaches Not Pursued

One alternative approach would be to use a graph-based data structure to model permit dependencies explicitly. This could simplify the dependency resolution process but might require more memory and complexity in managing the graph.

Another approach could involve a more iterative dependency resolution process that repeatedly scans the permits to check for resolved dependencies until all permits are processed. However, this might not be as efficient as the topological sorting method used in the current implementation.
