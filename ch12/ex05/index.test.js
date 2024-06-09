
import fs from 'fs';
import { readLines } from './index.js';
import { jest } from '@jest/globals';

jest.spyOn(fs, "closeSync");

describe("test readLines", () => {
    const filePath = './test.txt'
    let closeSyncSpy;
    beforeEach(() => {
        closeSyncSpy = jest.spyOn(console, 'log');
      });
      
      afterEach(() => {
        closeSyncSpy.mockRestore();
      });

    it("reading all text lines is success", () => {
        const gen = readLines(filePath, 10);
        expect([...gen]).toStrictEqual(
            [
                "My name is Mike Watoson. I'm 19 years old.",
                "Recently I went to a park near my house and met Yumi!",
                "We talked long time."
            ]
        )
        expect(closeSyncSpy).toHaveBeenCalledTimes(1);
    });
    it("reading empty text file is success", () => {
        const gen = readLines('./empty.txt', 10);
        expect([...gen]).toStrictEqual([])
        expect(closeSyncSpy).toHaveBeenCalledTimes(1);
    });
    it("reading all text lines is success if last text line is empty.", () => {
        const gen = readLines('./emptyline.txt', 10);
        expect([...gen]).toStrictEqual(
            [
                "My name is Mike Watoson. I'm 19 years old.",
                "Recently I went to a park near my house and met Yumi!",
                "We talked long time."
            ]
        )
        expect(closeSyncSpy).toHaveBeenCalledTimes(1);
    });
    it("reading texts is stopped by break.", () => {
        const gen = readLines(filePath, 10);
        for(const line of gen) {
            expect(line).toBe("My name is Mike Watoson. I'm 19 years old.")
            break;
        }
        expect(closeSyncSpy).toHaveBeenCalledTimes(1);
    });
    it("reading texts is stopped by error.", () => {
        const gen = readLines(filePath, 10);
        try {
            for(const line of gen) {
                expect(line).toBe("My name is Mike Watoson. I'm 19 years old.")
                throw new Error();
            }
        } catch(e) {
            // 無視する
        }
        
        expect(closeSyncSpy).toHaveBeenCalledTimes(1);
    })
})