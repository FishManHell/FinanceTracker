import { GraphQLErrorCode, HttpStatus, throwError } from '@/utils/errors.js'

export const hello =  (_parent: any, _args: any, context: any) => {
  console.log("👤 context.user:", context.user);
  if (!context.user) throwError({
    message: "Unauthorized",
    status: HttpStatus.UNAUTHORIZED,
    code: GraphQLErrorCode.UNAUTHORIZED
  });
  return `Hello ${context.user.username}!`;
};