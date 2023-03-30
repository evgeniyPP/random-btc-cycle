export function copyToClipboard(text: string) {
  const textarea = document.createElement('textarea');

  textarea.value = text;
  textarea.style.opacity = '0';
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');

  document.body.removeChild(textarea);
}
