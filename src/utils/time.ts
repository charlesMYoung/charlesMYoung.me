// 时间转换，格式为：2020-01-01
export function formatDate(date?: Date | null): string {
  if (!date) {
    return "";
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formatMonth = month < 10 ? `0${month}` : month;
  const formatDay = day < 10 ? `0${day}` : day;

  return `${year}-${formatMonth}-${formatDay}`;
}
