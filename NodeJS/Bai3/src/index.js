import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import route from './routes/index.js';
import db from './config/db/index.js'
import methodOverride  from 'method-override'

// Connect to DB 
db.connect();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// middleware một thành phần trung gian để xử lý trả dữ liệu về client

app.use(
    express.urlencoded({
        extended: true,
    }),
); // Với form thì dùng cái này để xử lý
app.use(express.json()); // Gửi dữ liệu lên với code javascript như: fetch, XMLhttp, axios ... thì dùng thg này

// html chỉ hỗ trợ 2 phương thức GET và POST
// ta cần dùng cái này để override các phương thức khác mà 
// ta muốn dùng . VD như PUT, PATCH, DELETE ... 
app.use(methodOverride('_method'));


//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Router
route(app);

// 127.0.0.1 - localhost:3000
app.listen(port, () => {
    console.log(`Welcome to website: http://localhost:${port}`);
});

// ================================================================================================
