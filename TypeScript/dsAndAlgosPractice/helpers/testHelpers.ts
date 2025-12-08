export type TestCase<T, V> = {
  input: T;
  expected: V; //assuming void in place modification if this is not present
  description?: string;
};
