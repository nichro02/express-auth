const passport = require('passport')
const db = require('../models')
const LocalStrategy = require('passport-local')

//configure strategy
passport.serializeUser((user, doneCallback) => {
    console.log('SERIALIZING USER...')
    doneCallback(null, user.id)
})

passport.deserializeUser((id, doneCallback) => {
    db.user.findByPk(id)
    .then(foundUser => {
        console.log('DESERIALIZING USER...')
        doneCallback(null, foundUser)
    })
    .catch(error=>{
        console.log('error deserializing user')
    })
})

//passport-local strategy
/*
 This is Passport's strategy to provide local authentication. We provide the
 following information to the LocalStrategy:
 Configuration: An object of data to identify our authentication fields, the
 username and password
 Callback function: A function that's called to log the user in. We can pass
 the email and password to a database query, and return the appropriate
 information in the callback. Think of "doneCallback" as a function that'll later look
 like this:
 login(error, user) {
  // do stuff
 }
 We need to provide the error as the first argument, and the user as the
 second argument. We can provide "null" if there's no error, or "false" if
 there's no user.
*/

const findAndLogInUser = (email, password, doneCallback) => {
    db.user.findOne({where: {email: email}})
    .then(async foundUser=>{
        let match
        if(foundUser){
            match = await foundUser.validPassword(password)
        }
        if(!foundUser || !match) { //problem validating user
            return doneCallback(null, false) //send back false
        } else { //legit user
            return doneCallback(null, foundUser) //send found user object
        }
    })
    .catch(error => doneCallback(error))
}

const fieldsToCheck = {
    usernameField: 'email', //we're using email as username
    passwordField: 'password'
}

const strategy = new LocalStrategy(fieldsToCheck, findAndLogInUser)

passport.use(strategy)

module.exports = passport