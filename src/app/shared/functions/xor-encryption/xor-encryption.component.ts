export function xorEncryptDecrypt(input: string, key: string): string {
  let output = '';

  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    output += String.fromCharCode(char ^ keyChar);
  }

  return output;
}
