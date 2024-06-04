import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const directoryPath = path.join(process.cwd(), 'public/icons');
  const files = fs.readdirSync(directoryPath);
  res.status(200).json(files);
}
