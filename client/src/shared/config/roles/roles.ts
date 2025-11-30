export enum Roles {
  ADMIN = "admin",
  USER = "user",
  DEVELOPER = "developer",
}

export const ALL_ROLES: Roles[] = [
  Roles.ADMIN,
  Roles.USER,
  Roles.DEVELOPER,
];

export const ADMIN_ROLES: Roles[] = [
  Roles.ADMIN,
];

export const USER_ROLES: Roles[] = [
  Roles.USER,
  Roles.DEVELOPER,
];

export const DEVELOPER_ROLES: Roles[] = [
  Roles.DEVELOPER,
]
