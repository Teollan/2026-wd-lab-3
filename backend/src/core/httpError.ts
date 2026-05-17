export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class BadRequest extends HttpError {
  constructor(message = "Bad request") {
    super(400, message);
  }
}

export class Unauthorized extends HttpError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

export class Forbidden extends HttpError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

export class NotFound extends HttpError {
  constructor(message = "Not found") {
    super(404, message);
  }
}

export class Conflict extends HttpError {
  constructor(message = "Conflict") {
    super(409, message);
  }
}

export class ServiceUnavailable extends HttpError {
  constructor(message = "Service unavailable") {
    super(503, message);
  }
}
