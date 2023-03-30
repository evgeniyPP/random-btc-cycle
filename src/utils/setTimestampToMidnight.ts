export function setTimestampToMidnight(timestamp: number) {
  const date = new Date(timestamp * 1000);

  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);

  return Math.floor(date.getTime() / 1000);
}
