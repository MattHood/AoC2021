type Bit = 0 | 1;
const isBit = (char: number): char is Bit => [0, 1].includes(char as Bit);
const toBits = (input: string): Bit[] => {
    const chars = Array.from(input);
    const bits = chars.map(n => parseInt(n));
    if(bits.every(isBit)) return bits as Bit[];
    else throw new Error(`Non-bit character in: ${input}`);
}

const addArrays = (a: number[], b: number[]) => a.map((_, i) => a[i] + b[i]);
const whichBit = (total: number) => (count: number): Bit => count * 2 < total ? 0 : 1;
const flipBit = (bit: Bit): Bit => (1 - bit) as Bit;
const toDecimal = (bits: Bit[], index = 0): number => 
                        bits.length == 0 ? 
                            0 : 
                            toDecimal(bits.slice(0,-1), index + 1) + bits[bits.length - 1] * Math.pow(2, index);

function partA(data: string[]) {
    const bits = data.map(toBits);
    const init = new Array(bits[0].length).fill(0);
    const counts = bits.reduce<number[]>(addArrays, init);
    const gamma = counts.map(whichBit(bits.length));
    const epsilon = gamma.map(flipBit);
    return toDecimal(gamma) * toDecimal(epsilon);
}

// Part B

type Selector = (length: number, count: number) => Bit;

function filter(words: Bit[][], whichBit: Selector) {
    const recurse = (words: Bit[][], index = 0): Bit[] => {
        if(words.length == 1 || words[0].length <= index) return words[0];
        else {
            const bitCount = words.reduce<number>((acc: number, cur: Bit[]) => acc + cur[index], 0);
            const reducer = (word: Bit[]) => word[index] == whichBit(words.length, bitCount);
            return recurse(words.filter(reducer), index + 1);
        }
    }
    return recurse(words);
}

function partB(data: string[]) {
    const bits = data.map(toBits);
    const oxygenSelector: Selector = (length, count) => 2 * count < length ? 0 : 1;
    const carbonSelector: Selector = (length, count) => 2 * count < length ? 1 : 0;
    const oxygen = filter(bits, oxygenSelector);
    const carbon = filter(bits, carbonSelector);
    return toDecimal(oxygen) * toDecimal(carbon);
}

const testData3 = 
   ['00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010'];
const puzzleData3 = (await Deno.readTextFile('./Matt/day3.csv')).split(/\r?\n/).filter(s => s.trim().length > 0);

console.log(`Test binary->decimal, want 25: ${toDecimal([1,1,0,0,1])}`);
console.log(`Test A, want 198: ${partA(testData3)}`);
console.log(`Part A: ${partA(puzzleData3)}`);
console.log(`Test B, want 230: ${partB(testData3)}`);
console.log(`Part B: ${partB(puzzleData3)}`);