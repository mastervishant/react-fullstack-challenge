# Notes

## What I completed

- Implemented the required car listing and car creation flows.
- Added responsive car images for mobile, tablet, and desktop breakpoints.
- Added loading, error, and empty states.
- Added form validation for required fields, year, make, and color.
- Added model search and sorting.
- Implemented the `useCars()` hook for car data and actions.
- Added tests covering the main components, validation, hook behavior, and API integration.
- All tests are passing.

## What I left out, and why

- Server-side filtering was not implemented because the required client-side functionality was sufficient for the assessment.
- Year filtering and `useCarFilters()` were left out as optional scope.
- Debounced search and car detail routing were also left out as optional enhancements.

## Decisions and trade-offs

- Used React state and the `useCars()` hook to keep car data and actions centralized.
- Kept filtering and sorting on the client side because the dataset is small and this keeps the implementation simple.
- Used Material UI for the UI components and responsive layout.
- Added validation at the form level to provide immediate feedback before submitting.
- Focused tests on user-visible behavior, validation, data loading, and API interactions rather than implementation details.

## If I had another day

- Add server-side filtering for larger datasets.
- Add debounced search.
- Add year filtering and a dedicated `useCarFilters()` hook.
- Add a car details route.
- Expand accessibility and edge-case test coverage.

## Anything you should know to run it

- The project runs with the standard setup:
  `npm install && npm run dev`
- Tests can be run with the project's test command.
- `npm run verify` can be used to run the final verification checks.
