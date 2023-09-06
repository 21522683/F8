import Course from '../models/Course.js'
import mongooseUntil  from '../../until/mongoose.js'

class SiteController {
    // GET /
    async index(req, res, next) {

        Course.find({})
            .then(courses => {
                res.render('home', { 
                    courses: mongooseUntil.mutipleMongooseToObject(courses)
                })
            })
            .catch(error => next(error));

        // res.render('home');
    }

    // GET /search
    search(req, res) {
        res.render('search');
    }
}

export default new SiteController();
