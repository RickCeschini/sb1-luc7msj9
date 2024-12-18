let lastId = 0;

export function generateUniqueId(): number {
  return ++lastId;
}