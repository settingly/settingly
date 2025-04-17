/**
 * Parses a server error message and extracts a readable error description.
 *
 * This function attempts to match a specific pattern in the provided error message.
 * If a match is found, it extracts and returns the readable portion of the error.
 * If no match is found, the original error message is returned.
 *
 * @param errorMessage - The raw error message string to parse.
 * @returns A readable error description if a match is found, otherwise the original error message.
 */
export default function parseReadableServerError(errorMessage: string): string {
  const match = errorMessage.match(/"[^"]*"\s*:\s*\d+\s(.+)/);
  return match ? match[1] ?? errorMessage : errorMessage;
}
