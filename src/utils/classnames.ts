export function cn(...classNames: string[]) {
  return classNames.filter(c => c).join(' ');
}
