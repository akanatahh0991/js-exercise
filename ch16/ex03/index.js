import crypto from "crypto";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
// ここを埋める

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENCRIPT_METHOD = "aes-256-cbc";
const ENCRIPT_KEY_FILE_PATH = path.resolve(__dirname, "encrypt_key.json")
const ENCRIPT_DATA_FILE_PATH = path.resolve(__dirname, "encrypt_data.json")

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  // ここを埋める
  return crypto.randomBytes(32);
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  // ここを埋める
  const iv = crypto.randomBytes(16);

  // 暗号化とBase64エンコード
  // ここを埋める
  const cipher = crypto.createCipheriv(ENCRIPT_METHOD ,key, iv);
  const encryptedData = cipher.update(Buffer.from(text));
  const encryptedBase64 = Buffer.concat([encryptedData, cipher.final()]).toString("base64");

  // 暗号文とIVをbase64で返す
  return {
    value: encryptedBase64,
    iv: iv.toString("base64"),
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
    const base64Key = key.toString("base64");
  // ここを埋める（fs.promisesで鍵を保存）
  return fs.promises.writeFile(ENCRIPT_KEY_FILE_PATH, JSON.stringify({key: base64Key}));
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  // ここを埋める（fs.promisesで暗号データを保存）
  return fs.promises.writeFile(ENCRIPT_DATA_FILE_PATH, JSON.stringify(data));
}

async function readKey() {
  // ここを埋める（return Promise<鍵>）
  const jsonText = await fs.promises.readFile(ENCRIPT_KEY_FILE_PATH, {encoding: "utf-8"});
  const obj = JSON.parse(jsonText);
  return Buffer.from(obj.key, "base64");
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  // ここを埋める（return Promise<data>）
  const jsonText = await fs.promises.readFile(ENCRIPT_DATA_FILE_PATH, {encoding: "utf-8"});
  return JSON.parse(jsonText);
}

// 復号して平文を返す
function decrypt64(data, key) {
    const iv = Buffer.from(data.iv, "base64");
    const encryptedText = Buffer.from(data.value, "base64");
  // ここを埋める
  const decipher = crypto.createDecipheriv(ENCRIPT_METHOD, key, iv);
  const decryptedData = decipher.update(encryptedText);
  
  return Buffer.concat([decryptedData, decipher.final()]).toString()
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
  // 平文
  const text = "Hello, World!";

  // 暗号化とBase64エンコード
  const key = generateKey();
  const encryptedData = encrypt64(text, key);

  // 鍵と暗号データをJSONで保存
  await writeKey(key);
  await writeEncrypt64(encryptedData);

  console.log("Encrypted Text (Base64):", encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey();
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log("Decrypted Text:", decryptedText);
})();