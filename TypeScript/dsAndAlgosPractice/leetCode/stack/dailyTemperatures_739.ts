function dailyTemperatures(temps: number[]): number[] {
  /**
        I: 
            temp - integer array representing tempratrues
            negative temps?
            range? - 1 <= temperatures.length <= 105
            range of temps[i] = 30 <= temperatures[i] <= 100
        O:
            integer array answer
            answer[i] is the # of days you have to wait after the ith day to get a warmer temperature
        constraints:
            answer[i] == 0 if no day after i is lower than i
            most optimal solution

        example: [73,74,75,71,69,72,76,73] -> [1,1,4,2,1,1,0,0]
        
        Naive approach o(t)^2 wher t is the lenght of input temps
        Notes:
        in  t == 1, return [0]
        temps[t - 1] will always = 0;
        
*/

  if (temps.length === 1) return [0];

  for (let currTemp = 0; currTemp < temps.length - 1; currTemp++) {
    let futureTemp = currTemp + 1;
    while (futureTemp < temps.length) {
      if (temps[futureTemp] > temps[currTemp]) {
        temps[currTemp] = futureTemp - currTemp;
        break;
      } else {
        futureTemp++;
      }
    }
    if (temps[currTemp] !== futureTemp - currTemp) {
      temps[currTemp] = 0;
    }
  }
  temps[temps.length - 1] = 0;
  return temps;
}

function dailyTemperaturesOptimized(temps: number[]): number[] {
  const n = temps.length;
  const answer = new Array(n).fill(0); // Initialize the result array with 0s
  const stack: number[] = []; // Monotonic decreasing stack to store indices

  for (let i = 0; i < n; i++) {
    // While the stack is not empty and the current temperature is warmer
    while (stack.length > 0 && temps[i] > temps[stack[stack.length - 1]]) {
      const prevIndex = stack.pop()!; // Get the index of the previous day
      answer[prevIndex] = i - prevIndex; // Calculate the difference in days
    }
    stack.push(i); // Push the current index onto the stack
  }

  return answer;
}
