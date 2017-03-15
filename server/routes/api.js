import { Router } from 'express';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
const router = Router();

router.get('/countries/', (req, res) => res.json(data));

export default router;
