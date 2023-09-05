import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));

// middleware một thành phần trung gian để xử lý trả dữ liệu về client 

app.use(express.urlencoded({
  extended: true,
})); // Với form thì dùng cái này để xử lý 
app.use(express.json()); // Gửi dữ liệu lên với code javascript như: fetch, XMLhttp, axios ... thì dùng thg này 


//HTTP logger
app.use(morgan("combined"));

//Template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs'
  })
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources','views'));

//route
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
    res.render('news');
});

app.get('/search', (req, res) => {
  res.render('search');
});

app.post('/search', (req, res) => {
  console.log("Data:   ",req.body);
  res.send('')
});
// Start lên web server 127.0.0.1 - localhost:3000
app.listen(port, () => {
    console.log(`Welcome to website: http://localhost:${port}`);
});


// ================================================================================================
