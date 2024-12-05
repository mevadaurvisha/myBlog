const express = require('express');
const path = require('path');
const app = express();
const env = require('dotenv');
const passport = require('./config/passport.js')
const express_session = require('express-session');
const bodyParser = require('body-parser');
const router = require('./routes/routes.js');
const db = require('./config/db.js');
const blogRoutes = require('./routes/blogRoutes.js')

env.config();

const PORT = process.env.PORT || 3000;
const mypath = path.join(__dirname, "views");

app.set('view engine' , 'ejs');
app.set('views', mypath);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload',express.static(path.join(__dirname,'upload')));
app.use(express.static(mypath));

//use body-parser
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//authentication
app.use(express_session({secret: 'mySecret',resave: false,saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());


// use routes
app.use('/', router);

app.use('/' , blogRoutes)

app.listen(PORT , (err) => {
    if(!err) {
        console.log(`server is running on http://localhost:${PORT}`);
    }
})