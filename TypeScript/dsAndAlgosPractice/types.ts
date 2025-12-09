export type TestCase<T, V> = {
  input: T;
  expected: V; //assuming void in place modification if this is not present
  description?: string;
};

export interface FunctionParams {
  param1: any;
  param2: any;
  param3?: any;
}
