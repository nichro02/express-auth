const express = require('express')
const router = express.Router()

router.get('/signup', (req, res)=> {
    res.render('auth/signup.ejs')
})

router.post('/signup', (req, res)=> {
    console.log('posting to /auth/signup')
    //redirect to login page
    res.redirect('/auth/login')
})

router.get('/login', (req, res)=> {
    res.render('auth/login.ejs')
})

router.post('/login', (req, res)=> {
    console.log('posting to /auth/login')
    //redirect to home route
    res.redirect('/')
})

module.exports = router