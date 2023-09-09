import Course from '../models/Course.js'
import mongooseUntil  from '../../until/mongoose.js'

class CoursesController {
    // GET /courses/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render('courses/show', {course: mongooseUntil.mongooseToObject(course)});
            })
            .catch(next)
    }

    // GET /courses/create 
    create(req, res, next) {
        res.render('courses/create');
    }

    // POST /courses/store 
    store(req, res, next) {
        // Xử lý lưu dữ liệu tại đây, dữ liệu từ form sẽ đc trả về 1 object và 
        // được gán cho req.body 
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(error => {

            });
    }

    // GET /courses/:id/edit 
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseUntil.mongooseToObject(course),
            }))
            .catch(next);
    }

    // PUT /course/:id 
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // DELETE   /course/:id 
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // PATCH /course/:id/restore 
    restore(req, res, next) {
        Course.restore({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // DELETE vĩnh viễn /course/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // POST /courses/handle-form-action
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete': 
                Course.delete({ _id: {$in: req.body.courseIds} })
                    .then(() => res.redirect('back'))
                    .catch(next);
            
                break;
            default: 
                res.json({message: 'Invalid action'});
        }
    }
    
    
}

export default new CoursesController();
