import express from 'express';
import coursesController from '../app/controllers/CoursesController.js';
var router = express.Router();

router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.post('/handle-form-actions', coursesController.handleFormActions);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', coursesController.update);
router.delete('/:id', coursesController.destroy);
router.delete('/:id/force', coursesController.forceDestroy);
router.patch('/:id/restore', coursesController.restore);
router.get('/:slug', coursesController.show);

export default router;
