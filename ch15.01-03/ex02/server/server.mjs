import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});