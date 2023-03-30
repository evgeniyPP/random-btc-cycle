export function getRandomUnixTimestamp(startTimestamp: number, endTimestamp: number) {
  const randomTimestamp = Math.random() * (endTimestamp - startTimestamp) + startTimestamp;
  return Math.round(randomTimestamp);
}
