import { GraphQLErrorCode, HttpStatus, throwError } from '@/utils/errors.js'


export const hello =  (_parent: any, _args: any, context: any) => {
  // console.log("👤 context.user:", context.user);
  if (!context.user) {
    const err = new Error("Unauthorized");
    (err as any).extensions = { code: "UNAUTHORIZED" };
    throw err;
  }
  return `Hello ${context.user.username}!`;
};