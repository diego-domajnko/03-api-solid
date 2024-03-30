export class LateCheckinValidationError extends Error {
  constructor() {
    super("The checkin can only be validated within 20 minutes of its creation.");
  }
}
