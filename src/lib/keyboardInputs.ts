
export function isValidAlphabetKey(key: string): boolean {
    const lowercaseKey = key.toLowerCase();
    // Uses a regex which check for letter a to z lowercase
    const regex: RegExp = /^[a-zA-Z]$/;
    const isValid = regex.test(lowercaseKey);
    return isValid;
}