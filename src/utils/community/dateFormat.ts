// ISO -> 23.01.01
export const formatDate = (dateTimeString: string) => {
  const dateObj = new Date(dateTimeString);

  const year = String(dateObj.getFullYear()).slice(2);
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};
