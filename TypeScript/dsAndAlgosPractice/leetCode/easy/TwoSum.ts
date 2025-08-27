//Tnis solutiom runs in o(n log n) time and o (n) space
export const twoSum = (nums: number[], target: number): number[] => {
  if (nums.length === 2 && nums[0] + nums[1] === target) return [0, 1];

  let numberIndexMap = new Object();
  nums.forEach((num, index) => {
    if (numberIndexMap.hasOwnProperty(num)) {
      numberIndexMap[num].push(index);
    } else {
      numberIndexMap[num] = [index];
    }
  });

  nums.sort();

  const result = [];
  for (let i = 0; i < nums.length - 1; i++) {
    let difference = target - nums[i];
    if (nums.slice(i + 1).indexOf(difference) != -1) {
      if (difference === nums[i]) {
        result.push(numberIndexMap[difference][0]);
        result.push(numberIndexMap[difference][1]);
      } else {
        result.push(numberIndexMap[difference][0]);
        result.push(numberIndexMap[nums[i]][0]);
      }
    }
  }
  return result;
};
