import { throwError, GraphQLErrorCode, HttpStatus } from "./appError.js"

/* ---------------- BAD REQUEST ---------------- */

export function badRequest(message = "BAD_REQUEST"): never {
  return throwError({
    message,
    code: GraphQLErrorCode.BAD_REQUEST,
    status: HttpStatus.BAD_REQUEST,
  })
}

/* ---------------- UNAUTHORIZED ---------------- */

export function unauthorized(message = "UNAUTHORIZED"): never {
  return throwError({
    message,
    code: GraphQLErrorCode.UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
  })
}

/* ---------------- FORBIDDEN ---------------- */

export function forbidden(message = "FORBIDDEN"): never {
  return throwError({
    message,
    code: GraphQLErrorCode.FORBIDDEN,
    status: HttpStatus.FORBIDDEN,
  })
}

/* ---------------- NOT FOUND ---------------- */

export function notFound(message = "NOT_FOUND"): never {
  return throwError({
    message,
    code: GraphQLErrorCode.NOT_FOUND,
    status: HttpStatus.NOT_FOUND,
  })
}

/* ---------------- CONFLICT ---------------- */

export function conflict(message = "CONFLICT"): never {
  return throwError({
    message,
    code: GraphQLErrorCode.CONFLICT,
    status: HttpStatus.CONFLICT,
  })
}

/* ---------------- VALIDATION ---------------- */

export function validationFailed(message = "VALIDATION_FAILED"): never {
  return throwError({
    message,
    code: GraphQLErrorCode.VALIDATION_FAILED,
    status: HttpStatus.UNPROCESSABLE_ENTITY,
  })
}

/* ---------------- RATE LIMIT ---------------- */

export function tooManyRequests(message = "TOO_MANY_REQUESTS"): never {
  return throwError({
    message,
    code: GraphQLErrorCode.TOO_MANY_REQUESTS,
    status: HttpStatus.TOO_MANY_REQUESTS,
  })
}

/* ---------------- INTERNAL ---------------- */

export function internalServerError(message = "INTERNAL_SERVER_ERROR"): never {
  return throwError({
    message,
    code: GraphQLErrorCode.INTERNAL_SERVER_ERROR,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
}