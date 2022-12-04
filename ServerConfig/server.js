const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const path = require('path')
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require("cookie-parser")
const passport = require('passport')
const hbps = exphbs.create({ extname: '.hbs'})
require('dotenv').config({path:path.join(__dirname,'../.env')})
app.engine('.hbs', hbps.engine);
app.set('view engine', '.hbs');
app.use(express.json())
app.use(express.urlencoded({urlencoded : false}))
app.use(flash())
const thirty_minutes = 1000 * 60 * 30;
app.use(session({
    secret : process.env.SESSION_SECRET ,
    resave : false,
    saveUninitialized : false,
    cookie : {maxAge : thirty_minutes }
}))
app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


module.exports = {app,express,passport}