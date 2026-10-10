import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

let latestReading = null;

app.get('/api/iot/readings', (req, res) => {
  res.json(latestReading || { status: 'waiting' });
});

app.post('/api/iot/readings', (req, res) => {
  latestReading = {
    ...req.body,
    timestamp: req.body?.timestamp || new Date().toISOString(),
  };
  res.status(200).json({ ok: true, data: latestReading });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AgroPoly Smart server running at http://0.0.0.0:${PORT}`);
});
