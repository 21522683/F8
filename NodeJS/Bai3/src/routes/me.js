import express from 'express';
import meController from '../app/controllers/MeController.js';
var router = express.Router();

router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);

export default router;
