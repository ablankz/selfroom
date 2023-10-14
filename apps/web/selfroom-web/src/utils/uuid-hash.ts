export function uuidHash(uuid: string, min?: number, max?: number): number {
  const byteArray = uuid.split('-').join('').split('').map(c => c.charCodeAt(0));
  const sum = byteArray.reduce((acc, val) => acc + val, 0);

  return (sum % (typeof max === 'undefined' ? 10 : (max + 1))) + (typeof min === 'undefined' ? 0 : min);
}