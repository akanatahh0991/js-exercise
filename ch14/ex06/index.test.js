import { bindAccessHistorySavingProxy } from "./index.js";
import { jest } from '@jest/globals';

function createTestObj() {
    return {
        prop: 'test0',
        test1() {
            return "test1";
        },
        test2(a, b) {
            return a + b;
        }
    }
} 

describe("bindAccessHistorySavingProxy test", () => {
    it("test accessHistory", async () => {
        function saveCallingMethodDate(proxy, propertyName, ...args) {
            const startTime = new Date();
            proxy[propertyName](...args);
            const endTime = new Date();
            return {
                startTime,
                endTime,
                propertyName,
                args
            }
        }
        const testObj = createTestObj()
        const {obj, proxy} = bindAccessHistorySavingProxy(testObj);
        expect(obj).toBe(testObj);
        const results = []
        results.push(saveCallingMethodDate(proxy, "test1"))
        await new Promise(resolve => setTimeout(resolve, 100));
        results.push(saveCallingMethodDate(proxy, "test2"))
        await new Promise(resolve => setTimeout(resolve, 50));
        results.push(saveCallingMethodDate(proxy, "test1"))
        await new Promise(resolve => setTimeout(resolve, 150));
        results.push(saveCallingMethodDate(proxy, "test2"))

        proxy.accessHistory.forEach((history, index) => {
            const result = results[index]
            expect(history.calledDate.getTime()).toBeGreaterThanOrEqual(result.startTime.getTime());
            expect(history.calledDate.getTime()).toBeLessThanOrEqual(result.endTime.getTime());
            expect(history.methodName).toBe(result.propertyName);
            expect(history.args).toStrictEqual(result.args);
        })
        
    });
    it("test calling obj method via proxy", () => {
        const testObj = createTestObj();
        jest.spyOn(testObj, "test1");
        jest.spyOn(testObj, "test2");
        const {obj, proxy} = bindAccessHistorySavingProxy(testObj);
        expect(obj).toBe(testObj);
        proxy.test1();
        expect(proxy.test2(3, 4)).toBe(7);
        expect(proxy.test2(1, 4)).toBe(5);
        proxy.test1();
        proxy.test1();
        expect(testObj.test1).toHaveBeenCalledTimes(3);
        expect(testObj.test2).toHaveBeenCalledTimes(2);
    })
    it("test throw error when null assigned", () => {
        expect(() => {bindAccessHistorySavingProxy(null)}).toThrow();
    })
    it("test throw error when undefined assigned", () => {
        expect(() => {bindAccessHistorySavingProxy(undefined)}).toThrow();
    })
})