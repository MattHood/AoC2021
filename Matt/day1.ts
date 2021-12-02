const testData = [199, 200, 208, 210, 200, 207,240,269,260, 263];
const puzzleData = await Deno.readTextFile('./Matt/day1a.csv');
const depthInfo: number[] = puzzleData
    .split(/\r?\n/)
    .map(n => parseInt(n));

// I don't think recursion is always a great idea in JS, but hey, this is AoC.
function partition<T>(arr: T[], size: number, overlap: number, result: T[][] = []): T[][] {
    console.assert(size > overlap);
    if(arr.length < size) return result;
    else return partition(arr.slice(size - overlap),
                          size, 
                          overlap,
                          [...result, arr.slice(0, size)]);
}       
const differences = (arr: number[]) => arr.slice(0, -1).map((_, i) => arr[i + 1] - arr[i]);
const countPositive = (arr: number[]) => arr.filter( n => n > 0 ).length;
const sumArray = (arr: number[]) => arr.reduce((a, b) => a + b);

const partA = (data: number[]) => countPositive(differences(data));
const partB = (data: number[]) => countPositive(differences(partition(data, 3, 2).map(sumArray)));
console.log(`Test A, want 7: ${partA(testData)}`)
console.log(`Test B, want 5: ${partB(testData)}`)
console.log(`Result for Part A: ${partA(depthInfo)}`);
console.log(`Result for Part B: ${partB(depthInfo)}`);