export class UnprocessableEntityException extends Error {
  status: number;
  errors?: any;
  constructor({
    message = 'Unprocessable Entity',
    errors = {},
  }: {
    message?: string;
    errors?: any;
  }) {
    super(message);
    this.name = 'UnprocessableEntityException';
    this.status = 422;
    this.errors = errors;
  }
}

export class UnauthorizedException extends Error {
  status: number;

  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedException';
    this.status = 401;
  }
}
export class ForbiddenException extends Error {
  status: number;

  constructor(message: string = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenException';
    this.status = 403;
  }
}
export class NotFoundException extends Error {
  status: number;

  constructor(message: string = 'Not Found') {
    super(message);
    this.name = 'NotFoundException';
    this.status = 404;
  }
}
