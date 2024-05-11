import { convertToLittleEndian, convertToBigEndian } from "./index.js";

test.each([
    {input: [0x00000000], expected: [0x000000000]},
    {input: [
        0x12345678
    ], expected: [
        0x78563412
    ]},
    {input: [
        0x12345678, 0x12345678, 0x12345678
    ], expected: [
        0x78563412, 0x78563412, 0x78563412
    ]},
    {input: [
        0x10000000, 0x00000001, 0x11111111
    ], expected: [
        0x00000010, 0x01000000, 0x11111111
    ]},
])("convertToLittleEndian(Uint32Array($input)) => Unit32Array($expected)", ({input, expected}) => {
    expect(convertToLittleEndian(new Uint32Array(input)).buffer).toStrictEqual(new Uint32Array(expected).buffer);
})

test.each([
    {input: [0x00000000], expected: [0x000000000]},
    {input: [
        0x12345678
    ], expected: [
        0x78563412
    ]},
    {input: [
        0x12345678, 0x12345678, 0x12345678
    ], expected: [
        0x78563412, 0x78563412, 0x78563412
    ]},
    {input: [
        0x10000000, 0x00000001, 0x11111111
    ], expected: [
        0x00000010, 0x01000000, 0x11111111
    ]},
])("convertToBigEndian(Uint32Array($input)) => Unit32Array($expected)", ({input, expected}) => {
    expect(convertToBigEndian(new Uint32Array(input)).buffer).toStrictEqual(new Uint32Array(expected).buffer);
})