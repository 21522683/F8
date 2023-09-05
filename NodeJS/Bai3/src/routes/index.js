import newsRouter from './news.js';
import siteRouter from './site.js';

function route(app) {
    //route
    app.use('/news', newsRouter);

    app.use('/', siteRouter);
}

export default route;
