import express from 'express';
import { authenticateToken } from '../middleware/authentication';
import {
  saveUrl,
  getFullUrl,
  getUserUrls,
  deleteUrl,
  updateUrl,
  getStats,
} from '../controller/url.controller';

const router = express.Router();

router.post('/', authenticateToken, saveUrl);

router.get('/', authenticateToken, getUserUrls);

router.delete('/:id', authenticateToken, deleteUrl);

router.put('/:id', authenticateToken, updateUrl);

router.get('/stats/user', authenticateToken, getStats);

export default router;
