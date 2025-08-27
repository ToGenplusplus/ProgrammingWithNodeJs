// my solution (), o(n^2) and amortized o(n) space
export function romanToInt(s: string): number {
  const subtractions = new Set();
  subtractions.add("I");
  subtractions.add("X");
  subtractions.add("C");

  const romanIntegerDict = {
    I: [1, "V", "X"],
    V: [5],
    X: [10, "L", "C"],
    L: [50],
    C: [100, "D", "M"],
    D: [500],
    M: [1000],
  };

  if (s.length === 1) return romanIntegerDict[s.charAt(0)][0];

  let sIter = 0;
  let num = 0;
  while (sIter < s.length) {
    const currIter = sIter;
    const currNum = num;
    const currChar = s.charAt(sIter);

    if (subtractions.has(currChar)) {
      if (sIter + 1 < s.length) {
        const nextChar = s.charAt(sIter + 1);
        if (romanIntegerDict[currChar].indexOf(nextChar) !== -1) {
          num += romanIntegerDict[nextChar][0] - romanIntegerDict[currChar][0];
          sIter += 2;
        }
      }
    }

    if (sIter - currIter !== 2) {
      sIter += 1;
    }

    if (currNum === num) {
      num = num + romanIntegerDict[currChar][0];
    }
  }
  return num;
}

// better solution O(n) time and amortized O(1) space
function romanToIntBetter(s: string): number {
  let romHashmap = new Map<string, number>();
  romHashmap.set("I", 1);
  romHashmap.set("V", 5);
  romHashmap.set("X", 10);
  romHashmap.set("L", 50);
  romHashmap.set("C", 100);
  romHashmap.set("D", 500);
  romHashmap.set("M", 1000);

  let result: number = 0;

  for (let i = 0; i < s.length - 1; i++) {
    if (romHashmap.get(s[i]) < romHashmap.get(s[i + 1])) {
      result = result - romHashmap.get(s[i]);
    } else {
      result = result + romHashmap.get(s[i]);
    }
  }
  return (result = result + romHashmap.get(s[s.length - 1]));
}
