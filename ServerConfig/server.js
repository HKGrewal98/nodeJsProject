const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const path = require('path')
const hbps = exphbs.create({ extname: '.hbs'})
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', hbps.engine);
app.set('view engine', '.hbs');
app.use(express.json())
app.use(express.urlencoded({urlencoded : true}))

module.exports = {app,express}