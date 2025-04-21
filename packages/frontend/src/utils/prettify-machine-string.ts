/**
 * Makes a string format prettier by removing underscores and dashes, and capitalizing the first letter of each word.
 * @param str The string to prettify
 * @returns The prettified string
 */
export default function prettifyMachineString(str: string) {
  return str
    .trim()
    .replace(/[_-]/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
