const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/signup', (req, res)=> {
    res.render('auth/signup.ejs')
})

router.post('/signup', (req, res)=> {
    console.log('SIGNUP FORM INFO --->',req.body)
    
    //check if user already exists
    //if yes, throw error message
    //else create new user and store them in database
    db.user.findOrCreate({
        where: {email: req.body.email},
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    })
    .then(([createdUser, wasCreated])=> {
        if(wasCreated){
            console.log(`CREATED USER----> ${createdUser}`)
        } else {
            console.log('Account with that email already exists. Try logging in')
        }
        //redirect to login page
        res.redirect('/auth/login')
    })
})

router.get('/login', (req, res)=> {
    res.render('auth/login.ejs')
})

router.post('/login', (req, res)=> {
    console.log('LOGIN INFO -->', req.body)

    //redirect to home route
    res.redirect('/')
})

module.exports = router