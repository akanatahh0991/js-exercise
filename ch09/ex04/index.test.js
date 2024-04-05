import { CSoldier, CMagicSoldier, FSoldier, FMagicSoldier } from "./index.js";

test('CSoldier test', () => {
    const soldier = new CSoldier(10);
    expect(soldier.attack()).toBe(20);
});

test('CMagicSoldier test', () => {
    const soldier = new CMagicSoldier(10, 30);
    expect(soldier.attack()).toBe(50);
    expect(soldier instanceof CSoldier).toBe(true);
});

test('FSoldier test', () => {
    const soldier = new FSoldier(10);
    expect(soldier.attack()).toBe(20);
});

test('FMagicSoldier test', () => {
    const soldier = new FMagicSoldier(10, 30);
    expect(soldier.attack()).toBe(50);
    expect(soldier instanceof FSoldier).toBe(true);
});