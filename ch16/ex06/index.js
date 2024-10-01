import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.truncate(path.resolve(__dirname, "file.txt"), 20, () => {
    console.log("turncate was called")
});