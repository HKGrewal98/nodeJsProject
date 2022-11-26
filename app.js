const mongoose = require('mongoose');
const databaseUrl = require('./databaseConfig/database').databaseUrl
const resturant = require('./model/restaurantModel').restaurants
const db = require('./model/databaseFunctions')
const {app,express} = require('./ServerConfig/server')
const restaurantApp = require('./mainRoutes/restaurantRoutes')
require('dotenv').config()
const PORT  = process.env.PORT || 8000


async function serverUp(){
         const state = await db.databaseConnection()
         console.log("DB Connection State : " + state)
         if(state==0){
            process.exit(0)
         }
         app.use('/api/restaurants',restaurantApp)
         app.listen(PORT,()=> console.log(`Server up and running at port ${PORT}.`))
}

serverUp()

