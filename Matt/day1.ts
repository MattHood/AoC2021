const testData = [199, 200, 208, 210, 200, 207,240,269,260, 263];
const puzzleData = await Deno.readTextFile('./Matt/day1a.csv');
const depthInfo: number[] = puzzleData
    .split(/\r?\n/)
    .map(n => parseInt(n));

const windowSum = 
    (arr: number[], window = 1) => arr
        .slice(0, -1 * window)
        .map((_, i) => arr[i + window] - arr[i]);
const countPositive = (arr: number[]) => arr.filter( n => n > 0 ).length;

console.log(`Test A, want 7: ${countPositive(windowSum(testData))}`)
console.log(`Test B, want 5: ${countPositive(windowSum(testData, 3))}`)
console.log(`Result for Part A: ${countPositive(windowSum(depthInfo))}`);
console.log(`Result for Part B: ${countPositive(windowSum(depthInfo, 3))}`);