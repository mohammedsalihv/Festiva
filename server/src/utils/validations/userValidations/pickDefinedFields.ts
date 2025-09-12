export function pickDefinedFields<T>(obj: Partial<T>, keys: (keyof T)[]): Partial<T> {
  const result: Partial<T> = {};
  for (const key of keys) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
}