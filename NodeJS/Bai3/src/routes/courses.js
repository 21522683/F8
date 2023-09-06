import express from 'express';
import coursesController from '../app/controllers/CoursesController.js';
var router = express.Router();

router.get('/:slug', coursesController.show);

export default router;
