/**
 * TypeScript Basics - A Quick Guide for New Developers
 *
 * This file is designed to introduce the fundamental concepts of TypeScript.
 * It's a superset of JavaScript, which means all valid JavaScript code is also valid TypeScript.
 * The primary benefit is adding static types, which helps catch errors early and improves code readability.
 */

// 1. Basic Types

// boolean
let isDone: boolean = false;

// number (integers, floats, etc.)
let decimal: number = 6;
let hex: number = 0xf00d;

// string
let color: string = "blue";
let fullName: string = `John Doe`; // Template strings with backticks

// array
let list: number[] = [1, 2, 3];
let anotherList: Array<number> = [1, 2, 3]; // Generic Array type

// tuple - a fixed-size array where each element has a known type
let x: [string, number];
x = ["hello", 10]; // OK
// x = [10, "hello"]; // Error: Type order is incorrect


//set 
let numberSet = new Set<number>();
numberSet.add(1);
numberSet.has(1) // check existence of element in set
numberSet.delete(1)

numberSet = new Set([1,2,3, 3]) // create a set from an array
numberSet.size // -> 3

// enum - a way of giving more friendly names to sets of numeric values
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
console.log(c); // Prints 1

// any - for when you don't know the type (use sparingly)
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

// void - for functions that do not return a value
function warnUser(): void {
  console.log("This is my warning message");
}

// null and undefined - subtypes of all other types
let u: undefined = undefined;
let n: null = null;

// never - for functions that never return
function error(message: string): never {
  throw new Error(message);
}

// 2. Interfaces - Defining the structure of an object

// An interface acts as a contract for objects.
interface User {
  firstName: string;
  lastName: string;
  age?: number; // The '?' makes this property optional
  readonly id: number; // The 'readonly' keyword prevents modification after creation
}

let user1: User = {
  firstName: "Jane",
  lastName: "Doe",
  id: 1,
};

// user1.id = 2; // Error: Cannot assign to 'id' because it is a read-only property

// 3. Functions

// Type annotations for function parameters and return values
function add(a: number, b: number): number {
  return a + b;
}

// Optional and default parameters
function buildName(firstName: string, lastName: string = "Smith"): string {
  return firstName + " " + lastName;
}

// Function expressions with types
let greet: (name: string) => void = (name: string) => {
  console.log(`Hello, ${name}`);
};
greet("Alice");

// 4. Classes - Defining a blueprint for objects

class Animal {
  // Public by default, can be accessed from anywhere.
  name: string;
  // Private, can only be accessed within this class.
  private species: string;
  // Protected, can only be accessed within this class and its subclasses.
  protected sound: string;

  constructor(name: string, species: string, sound: string) {
    this.name = name;
    this.species = species;
    this.sound = sound;
  }

  // A method
  public makeSound(): void {
    console.log(`${this.name} (${this.species}) says: ${this.sound}`);
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name, "Canine", "Woof");
  }

  // Method overriding
  public makeSound(): void {
    console.log(`${this.name} (${this.sound}) barks.`);
  }

  // Accessing a protected property from a subclass
  public getProtectedSound(): string {
    return this.sound;
  }
}

const dog = new Dog("Buddy");
dog.makeSound(); // Buddy (Woof) barks.
console.log(dog.name); // Buddy
// console.log(dog.species); // Error: 'species' is private

// 5. Union & Intersection Types

// Union Type - A variable can be one of several types.
let userId: number | string;
userId = 123;
userId = "abc";

// Intersection Type - Combines multiple types into one.
// The new type has all the properties of the combined types.
interface Person {
  name: string;
}
interface Employee {
  id: number;
}
let staffMember: Person & Employee = {
  name: "Bob",
  id: 101,
};

// 6. Type Aliases - Creating a new name for a type

type ID = number | string;
let customerId: ID = 456;

// Type aliases for object types
type Point = {
  x: number;
  y: number;
};
let p: Point = { x: 10, y: 20 };

// 7. Generics - Creating reusable components

// A function that can work with any type.
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("myString"); // Type is explicitly set
let output2 = identity("myOtherString"); // Type is inferred by the compiler

// Generic classes
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;

  constructor(zeroValue: T, add: (x: T, y: T) => T) {
    this.zeroValue = zeroValue;
    this.add = add;
  }
}

let myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);
console.log(myGenericNumber.add(5, 10)); // 15

// 8. Type Assertions - Telling the compiler what you know

// The 'as' syntax is preferred
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
console.log(strLength);

// The older angle-bracket syntax
let strLengthLegacy: number = (<string>someValue).length;


// Maps vs Objects
// 1. Plain Object Keys (Always Strings/Symbols)
type UserData = {
    [key: string]: string; // Keys MUST be strings
};

const user = { id: 101, name: "Alice" };

const objectCache: UserData = {};

// When you use an object as a key, it's converted to a string: "[object Object]"
// This means the second assignment overwrites the first.
objectCache[user.id] = "Alice data"; 
objectCache[202] = "Bob data"; // 202 is coerced to "202"

console.log(Object.keys(objectCache)); // Output: ["101", "202"]

// Use Plain Object When:
// 1. You are modeling a known entity (e.g., a User with fixed properties).
// 2. You need quick access to static, known properties (like a configuration object).
// 3. You need to serialize the data to JSON (Objects convert easily).
// 4. You want to use TypeScript interfaces/types to define a fixed structure.

// ---

// 2. Map Keys (Any Type)
const mapCache = new Map<object | number, string>();

// Use Map When:
// 1. Key types must be non-string (e.g., using objects, arrays, or functions as keys).
// 2. You frequently add and remove key-value pairs (better performance).
// 3. Insertion order must be guaranteed during iteration.
// 4. Performance for large data collections is a concern (offers O(1) lookups).

// We can use an object reference (user1) as the literal key.
mapCache.set(user, "Alice data");

// We can use a number (202) as a number key.
mapCache.set(202, "Bob data");

// We can use an array as a key.
const settingsKey = [1, 2, 3];
mapCache.set(settingsKey, "System Settings");

console.log(mapCache.get(user)); // Output: "Alice data" (correctly retrieved)
console.log(mapCache.get(202));  // Output: "Bob data" (correctly retrieved)
console.log(mapCache.size);      // Output: 3 (No keys were overwritten)
