import { Router } from "express";
const router = Router();

import oauth from './oauth/index.ts';

router.use('/oauth', oauth);

export default router;