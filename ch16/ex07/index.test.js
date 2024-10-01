import { checkEntry } from "./index.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// ここを埋める

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


describe('checkEntry test', () => {
  const testFilePath = path.resolve(__dirname, './testfile.txt');
  const testDirPath = path.resolve(__dirname, './testdir');
  const testSymbolickLinkPath = path.resolve(__dirname, './test_symbolic_link');

  beforeAll(async () => {
    await fs.promises.writeFile(testFilePath, 'Hello, World!');
    await fs.promises.mkdir(testDirPath);
    await fs.promises.symlink(testFilePath, testSymbolickLinkPath);
  });

  afterAll(async () => {
    await fs.promises.unlink(testFilePath);
    await fs.promises.rmdir(testDirPath);
    await fs.promises.unlink(testSymbolickLinkPath);
  });

  test('file test', async () => {
    const type = await checkEntry(testFilePath);
    expect(type).toBe('file');
  });

  test('directory test', async () => {
    const type = await checkEntry(testDirPath);
    expect(type).toBe('directory');
  });

  test('symbolic link test', async () => {
    const type = await checkEntry(testSymbolickLinkPath);
    expect(type).toBe('symboliclink');
  });

  test('no exist entry test', async () => {
    await expect(checkEntry('./invalid_path')).rejects.toThrow();
    ;
  });
});