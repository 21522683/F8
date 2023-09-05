import express from 'express';
import newsController from '../app/controllers/NewsController.js';
var router = express.Router();

router.use('/:slug', newsController.show);
router.use('/', newsController.index);

export default router;
