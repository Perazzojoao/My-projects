export const setLogicNumber = (prev: string, value: string) => {
  if (prev === '0' && value !== '.') {
    return String (Number (prev) + Number (value));
  }
  if (!prev.includes('.') && value === '.') {
    return prev + value;
  }
  if (value !== '.') {
    return prev + value;
  }
  return prev;
}