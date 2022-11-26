var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RestaurantsSchema = new Schema({
   address : {
    building : String,
    coord : Array,
    street : String,
    zipcode : String
},
borough : String,
cuisine : String,
grades : [
    {
        date: Date , 
        grade :  String ,
        score : Number
    }
],
name : String,
restaurant_id : String
},{collection:'restaurants'})



module.exports = {
    "restaurants" : mongoose.model('restaurants', RestaurantsSchema)
 
}