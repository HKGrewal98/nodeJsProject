const mongoose = require('mongoose');
const databaseUrl = require('../databaseConfig/database').databaseUrl
const restaurantModel = require('./restaurantModel').restaurants

async function databaseConnection(){
    try {
        const connection =  await mongoose.createConnection(databaseUrl)
        console.log(connection.readyState)
        if(connection.readyState==2){
            mongoose.connect(databaseUrl)
            console.log("Connected to MongoDB.")
        }else{
            console.log("Not able to connect to MongoDB.")
        }
        return connection.readyState
    } catch (err) {
        console.log(err)
        return 0
    }
}


function addNewRestaurant(data,res){
        const newRes = new restaurantModel
        newRes.address = data.address
        newRes.borough = data.borough
        newRes.cuisine = data.cuisine
        newRes.name = data.name
        newRes.restaurant_id = data.restaurant_id
        newRes.grades = data.grades
        console.log(data.grades)
        newRes.save(function(err,result){
            if(err){
                return res.status(400).json({error:err})
            }else{
            return res.status(201).json({status:'SUCCESS',message:`Record created with Id ${result._id}.`})
    }})
}


function getAllRestaurants(page, perPage, borough,res){
   var filter = {}
   if(borough){
    filter = {borough : borough}
   }

   var startIndex = (page-1)*perPage
   var endIndex = page*perPage
  
   restaurantModel
   .find(filter)
   .sort({restaurant_id:1})
   .exec()
   .then((result)=> {
     if(result.length > startIndex && result.length > endIndex){
        result = result.slice(startIndex,endIndex)
     } else if(result.length > startIndex && result.length < endIndex){
        result = result.slice(startIndex,result.length)
     }else {
        result = result.slice(0,perPage)
     }

    return res.status(201).json(result)
   })
   .catch((err)=>{
    console.log(err)
    return res.status(400).json(err)
   })
}

function getRestaurantById(id,res){
    restaurantModel
    .findById(id,function(err,result){
        if(err){
            console.log(err)
            return res.status(400).json(err)
        }else{
            return res.status(200).json(result) 
        }
    })
}

function updateRestaurantById(id,data,res){
       
    restaurantModel.findByIdAndUpdate(id,data)
    .exec()
    .then((result)=> {
        return res.status(200).json({status:'SUCCESS',message:`Record updated with Id ${id}.`})
    })
    .catch((err)=>{
        console.log(err)
        return res.status(400).json(err)
    })
}
    

function deleteRestaurantById(id,res){

restaurantModel
.deleteOne({_id:id},function(err,result){
    if(err){
        console.log(err)
        return res.status(400).json(err)
    }else{
        return res.status(200).json({status:'SUCCESS',message:`Record Deleted with Id ${id}.`}) 
    }
})

}



module.exports = {databaseConnection,addNewRestaurant,updateRestaurantById,
                 getAllRestaurants,deleteRestaurantById,getRestaurantById}