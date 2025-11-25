
export const Roles = {
  DEVELOPER: "developer",
  USER: "user",
  ADMIN: "admin",
} as const;

export type Role = typeof Roles[keyof typeof Roles];

export interface IUser {
  username: string;
  password: string;
  email: string;
  role: Role
}