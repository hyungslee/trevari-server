import { Router } from 'express';
import { getController } from '../controllers';
const router = Router();

router.get('/',getController);

export default router;
