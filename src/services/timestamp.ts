export function getCurrentTimestamp(): string {
  const currentDate = new Date().toISOString().split('T')[0].split('-');
  return `${currentDate[0]}${currentDate[1]}${currentDate[2]}`;
}
