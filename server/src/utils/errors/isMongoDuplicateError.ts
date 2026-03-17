import { MongoServerError } from 'mongodb'

export const isMongoDuplicateError = (
  error: unknown
): error is MongoServerError => {
  return error instanceof MongoServerError && error.code === 11000
}