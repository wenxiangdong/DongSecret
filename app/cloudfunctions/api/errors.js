class MyError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
class NotFoundError extends MyError {
  constructor(message) {
    super(message, 404);
  }
}

class BadRequestError extends MyError {
  constructor(message) {
    super(message, 400);
  }
}

class ServerError extends MyError {
  constructor(message) {
    super(message, 500);
  }
}

module.exports = {
  MyError,
  NotFoundError,
  BadRequestError,
  ServerError
};
