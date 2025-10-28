export const hello =  (_parent: any, _args: any, context: any) => {
  console.log("👤 context.user:", context.user);
  if (!context.user) throw new Error("Unauthorized");
  return `Hello ${context.user.username}!`;
};