export function stripTypename<T>(obj: T): T {
  return JSON.parse(
    JSON.stringify(
      obj,
      (key, value) => (key === "__typename" ? undefined : value)
    )
  );
}
