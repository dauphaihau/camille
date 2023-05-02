export class RequiresStandardPlanError extends Error {
  constructor(message = "This action requires a standard plan") {
    super(message)
  }
}
