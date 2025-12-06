
export type TestCase<T,V> = {
    input: T;
    expected: V;
    description?: string;
};

export const isAlphaNumeric  = (char: string) => /^[a-zA-Z0-9]$/.test(char);