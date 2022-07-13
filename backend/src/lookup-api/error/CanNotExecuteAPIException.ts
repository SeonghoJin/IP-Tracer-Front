export class CanNotExecuteAPIException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
