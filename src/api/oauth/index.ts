import { Router } from "express";
const router = Router();

import authorize from './authorize/index.ts';
import token from './token/index.ts';

router.use(authorize);
router.use(token);

export default router;