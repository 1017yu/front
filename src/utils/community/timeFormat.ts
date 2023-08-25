export const timeFormatChange = (timeData: string) => {
  const year = new Date(timeData).getFullYear();
  const month = new Date(timeData).getMonth() + 1;
  const date = new Date(timeData).getDate();
  const hours = new Date(timeData).getHours();
  const mins = new Date(timeData).getMinutes();

  return (
    year + '년 ' + month + '월 ' + date + '일 ' + hours + '시 ' + mins + '분'
  );
};
