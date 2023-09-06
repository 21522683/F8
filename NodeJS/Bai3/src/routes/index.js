import newsRouter from './news.js';
import siteRouter from './site.js';
import coursesRouter from './courses.js';

function route(app) {
    //route
    app.use('/news', newsRouter);

    app.use('/courses', coursesRouter);

    app.use('/', siteRouter);
}

export default route;
