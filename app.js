const mongoose = require('mongoose');
const databaseUrl = require('./databaseConfig/database').databaseUrl
const resturant = require('./model/restaurantModel').restaurants
const db = require('./model/databaseFunctions')
const {app,express} = require('./ServerConfig/server')
const restaurantApp = require('./mainRoutes/restaurantRoutes')
const path = require('path')
require('dotenv').config()
const PORT  =  3000


async function serverUp(){
         const state = await db.databaseConnection()
         console.log("DB Connection State : " + state)
         console.log("ENV : " + process.env.DATABASE_URL)
         // if(state==0){
         //    process.exit(0)
         // }
         app.use('/api/restaurants',restaurantApp)
         app.use(express.static(path.join(__dirname, 'public')))
         console.log("Path is : " + path.join(__dirname, 'public'))
         app.listen(PORT,()=> console.log(`Server up and running at port ${PORT}.`))
}

serverUp()

app.get('/',(req,res)=>{
   console.log("Base Url called.")
   res.render('login')
})


