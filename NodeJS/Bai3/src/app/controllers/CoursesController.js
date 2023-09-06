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
}

export default new CoursesController();
