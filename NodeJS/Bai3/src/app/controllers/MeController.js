import Course from '../models/Course.js'
import mongooseUntil  from '../../until/mongoose.js'

class MeController {
    
    // GET /me/stored/courses 
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.findDeleted({})])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    courses: mongooseUntil.mutipleMongooseToObject(courses),
                    deletedCount: deletedCount.filter(course => course.deleted).length
                }),
            )
            .catch(next);
    }

    // GET /me/trash/courses 
    trashCourses(req, res, next) {
        Course.findWithDeleted({deleted:true})
            .then(courses => res.render('me/trash-courses', {
                courses: mongooseUntil.mutipleMongooseToObject(courses),
            }))
            .catch(next);
    }



    
}

export default new MeController();
