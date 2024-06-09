import { primeNumberGen } from "./index.js";

test.each([
    {index: 1, expected: 2},
    {index: 2, expected: 3},
    {index: 10, expected: 29},
    {index: 20, expected: 71},
    {index: 50, expected: 229},
    {index: 100, expected: 541},
    {index: 300, expected: 1987},
    {index: 500, expected: 3571}
])("test primeNumberGen called $index times", ({index, expected}) => {
    const gen = primeNumberGen();
    let prime;
    for(let i = 0; i < index; i++) {
        prime = gen.next().value;
    }
    expect(prime).toBe(expected);
})