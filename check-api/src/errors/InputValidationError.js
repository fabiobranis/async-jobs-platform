export default class InputValidationError extends Error {
  constructor(details) {
    super();
    this.details = details;
  }

  getDetails() {
    return this.details;
  }
}
