// TODO, fix Deno linting bug. It seems to include declarations from other files in this file's scope.

type Direction = 'forward' | 'up' | 'down';
type PositionA = { horizontal: number, depth: number }
type PositionB = PositionA & { aim: number };
type Velocity = { direction: Direction, magnitude: number };

function isDirection(input: string): input is Direction {
    return ['forward', 'up', 'down'].includes(input);
}

function parse(input: string): Velocity {
    const [direction, magnitude ] = input.split(" ");
    if( isDirection(direction) && !isNaN(Number(magnitude))) {
        return { direction: direction, magnitude: Number(magnitude) }
    }
    else {
        throw new Error(`unknown direction and magnitude for ${input}: [${direction}, ${magnitude}]`);
    }
}

function updateA(pos: PositionA, vel: Velocity): PositionA {
    switch(vel.direction) {
        case 'forward': return { ...pos, horizontal: pos.horizontal + vel.magnitude }
        case 'up':      return { ...pos, depth: pos.depth - vel.magnitude }
        case 'down':    return { ...pos, depth: pos.depth + vel.magnitude }
    }
}

function updateB(pos: PositionB, vel: Velocity): PositionB {
    switch(vel.direction) {
        case 'forward': return { ...pos,
            horizontal: pos.horizontal + vel.magnitude, 
            depth: pos.depth + pos.aim * vel.magnitude }
        case 'up':      return { ...pos, aim: pos.aim - vel.magnitude }
        case 'down':    return { ...pos, aim: pos.aim + vel.magnitude }
    }
}

function multiply(pos: PositionA | PositionB): number {
    return pos.horizontal * pos.depth;
}

function part2A(data: string[]): number {
    const init = { horizontal: 0, depth: 0 };
    const ending = data
        .filter(s => /^[a-zA-Z]+\s\d$/gm.test(s))
        .map(parse)
        .reduce<PositionA>(updateA, init);
    return multiply(ending);
}

function part2B(data: string[]): number {
    const init = { horizontal: 0, depth: 0, aim: 0 };
    const ending = data
        .filter(s => /^[a-zA-Z]+\s\d$/gm.test(s))
        .map(parse)
        .reduce<PositionB>(updateB, init);
    return multiply(ending);
}

const testData2 = 
    ['forward 5',
    'down 5',
    'forward 8',
    'up 3',
    'down 8',
    'forward 2'];
const puzzleData2 = await Deno.readTextFile('./Matt/day2.csv');
const velocities: string[] = puzzleData2
    .split(/\r?\n/);
console.log(`Part A, Test, want 150: ${part2A(testData2)}`);
console.log(`Part A, : ${part2A(velocities)}`);
console.log(`Part B, Test, want 900: ${part2B(testData2)}`);
console.log(`Part B, : ${part2B(velocities)}`);
