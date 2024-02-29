import { newHashTable } from "./index.js";

test("newHashTable test", () => {
  const hashTable = newHashTable();
  hashTable.put("key1", [1, 2]);
  expect(hashTable.size).toBe(1);
  expect(hashTable.get("key1")).toStrictEqual([1, 2]);
  hashTable.put("key1", 14);
  expect(hashTable.size).toBe(1);
  expect(hashTable.get("key1")).toBe(14);
  hashTable.put("key2", { value: "value2"});
  hashTable.put("key3", null);
  // key3と同じハッシュ値でチェーンになる場合
  hashTable.put("kex4", 15);
  expect(hashTable.size).toBe(4);
  expect(hashTable.get("kex4")).toBe(15);
  expect(hashTable.get("key3")).toBe(null);
  hashTable.remove("key3");
  expect(hashTable.size).toBe(3);
  expect(hashTable.get("kex4")).toBe(15);
});