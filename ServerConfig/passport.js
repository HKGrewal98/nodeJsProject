const LocalStrategy =require('passport-local').Strategy
const bcrypt = require('bcrypt') 
const db = require('../model/databaseFunctions')
const userModel = require('../model/userModel').users


function initializePassport(passport){

  const authenticateUser = (email,password,done) => {
     
    userModel.findOne({email:email},function(err,user){
         
        if(err){
            return done(err,false,{message:"Unknown Error Occured."})
        }

        
        console.log(user)
        
        if(user == null){
          return done(null,false,{message:"No user with this email exists."})
        } 
    
        try{
               if(bcrypt.compareSync(password,user.password)){
                     return done(null,user)
               }else{
                    return done(null,false,{message:"Password is wrong."})
               }
        }catch(e){
            return done(e)
        }


    })
  }  // authenticateUser ends........

  passport.use(new LocalStrategy({usernameField: 'email',passwordField : 'password'},
  authenticateUser))
  passport.serializeUser((user,done)=>done(null,user.id))
  passport.deserializeUser((id, done)=> {
    userModel.findById(id, function (err, user) {
      done(err, user);
    })
  })

}

module.exports = initializePassport