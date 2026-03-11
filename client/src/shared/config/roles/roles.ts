export enum Roles {
  ADMIN = "admin",
  USER = "user",
  DEVELOPER = "developer",
  SUPERADMIN = "super_admin",
}

export const ALL_ROLES: Roles[] = [
  Roles.ADMIN,
  Roles.USER,
  Roles.DEVELOPER,
  Roles.SUPERADMIN,
];

export const ADMIN_ROLES: Roles[] = [
  Roles.ADMIN,
  Roles.SUPERADMIN
];

export const USER_ROLES: Roles[] = [
  Roles.USER,
  Roles.DEVELOPER,
];

export const DEVELOPER_ROLES: Roles[] = [
  Roles.DEVELOPER,
]
