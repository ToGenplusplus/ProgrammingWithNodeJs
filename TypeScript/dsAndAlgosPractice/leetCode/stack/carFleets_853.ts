/**
      example
          position: starting mile for car @ pos[i]
          speed: mph for car @ speed[i]
          target: mile target
          Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3] mph
          i= 0; car starting at mile 10 going 2mph -> 1 hour reaches target
          i= 1; car starting at mile 8 going 4 mph -> 1 hour reaches target
          i= 2; car starting at mile 0 going 1mph -> 12 hour reaches target
          i= 3; car starting at mile 5 going 1mph -> 7 hour reaches target
              after 1 hours reaches mile 6
          i= 4; car starting at mile 3 going 3mph -> 3 hour reaches target
              after 1 hour reaches mile 6, so it will be travelling with car 4 together

          output: 3
          1, for cars 1 and 2
          1 - for car 3
          1 - car 4 and 5

          Ouput is an integer representing the unique # of car fleet

          constraint:
          **A car cannot pass another car, but it can catch up and then travel next to it at the speed of the slower car.**

          A car fleet is a car or cars driving next to each other. The speed of the car fleet is the minimum speed of any car in the fleet.

          If a car catches up to a car fleet at the mile target, it will still be considered as part of the car fleet. 


          Fastest a car can reach target is in 1 hr
          slowest is in target hrs   

          Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3] mph
         hrs: []
         1hr: car 1 -> 12, 2 -> 12, 3 -> 1, 4 -> 6, 5 -> 6
         2hr: 3 -> 2, 4-> 7, 5 -> 7
         3hr: 3 -> 3, 4-> 8, 5 -> 9
         4hr: 3 -> 4, 4-> 9, 5 -> 9
   */
function carFleetNaive(
  target: number,
  position: number[],
  speed: number[]
): number {
  //ex: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
  // Pair each car's position and speed, then sort by position in descending order
  const cars = position.map((pos, i) => [pos, speed[i]]);
  cars.sort((a, b) => b[0] - a[0]); // Sort by position in descending order

  // cars = [[10, 2], [8, 4], [5, 1], [3, 3], [0, 1]];

  const times: number[] = [];
  for (const [pos, spd] of cars) {
    // Calculate the time it takes for each car to reach the target
    times.push((target - pos) / spd);
  }

  // times = [1, 1, 7, 3, 12];

  let fleets = 0;
  let currentFleetTime = 0;

  // Iterate through the times array to group cars into fleets
  // this works because the times were calculated based on the sorted start positions of the cars
  for (const time of times) {
    if (time > currentFleetTime) {
      // If the current car takes longer to reach the target than the current fleet,
      // it forms a new fleet. Otherwise, it joins the current fleet.
      //This works because we are starting with the cars closest to the target.
      // So if the current care which is farther away from the target takes longer to reach the target than the current fleet,
      // it means that the current car will not be able to catch up to the current fleet. At this point, current car will form a new fleet.
      fleets++;
      currentFleetTime = time; // Update the current fleet's time
    }
  }

  return fleets;
}
/**
 * This brute force implementation is straightforward and works efficiently for the given constraints.
    The time complexity of O(n log n) is acceptable for most practical scenarios, as it is dominated by the sorting step.
    Further optimizations would focus on reducing the sorting overhead, but for this problem, sorting is necessary to process cars in the correct order.
 */
