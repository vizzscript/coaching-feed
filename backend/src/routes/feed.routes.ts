import { Router } from 'express';
import { getFeedsHandler, createFeedHandler } from '../controllers/feed.controller';

const router = Router();

router.get('/', getFeedsHandler);
router.post('/', createFeedHandler);

export default router;
