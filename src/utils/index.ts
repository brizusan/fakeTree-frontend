export const isValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};