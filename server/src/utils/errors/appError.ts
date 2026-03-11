import { GraphQLError } from 'graphql'

export enum GraphQLErrorCode {
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  VALIDATION_FAILED = "VALIDATION_FAILED",
  CONFLICT = "CONFLICT",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

interface ThrowError {
  message: string;
  code: GraphQLErrorCode;
  status: HttpStatus;
}

export function throwError({message, status, code}: ThrowError): never {
  throw new GraphQLError(message, {
    extensions: { code, http: { status } },
  });
}