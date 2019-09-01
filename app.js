const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// Load routes
const users = require('./routes/users');
const questions=require('./routes/Questions')

// Passport Config
require('./config/passport')(passport);


// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
// load dbURL
mongoose.connect('mongodb://localhost:27017/ASKfm', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Handlebars Middleware
app.set('view engine', 'ejs');
app.set('views', 'views');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Express session midleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.failureMessage='invalid user name or password';
    res.locals.user = req.user || null;
    next();
});

// Index Route
app.get('/', (req, res) => {
    if(!req.isAuthenticated()){
        res.render('index');
          }else{

        res.redirect('/users/home')

      }

});




// Use routes
app.use('/users', users);
app.use('/question',questions)


const port = process.env.PORT ||3000;

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});
