const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')

//set up ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//body parser middleware (to read req.body)
app.use(express.urlencoded({extended: false}))

//session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//flash middleware must come after session middleware
app.use(flash())

//custom middleware
app.use((req, res, next)=>{
    //attach flash messages and current user to res.locals
    //this will give us access to these values in our ejs pages
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() //move on to next piece of middleware
})

//set up middleware for controllers
app.use('/auth', require('./controllers/auth.js'))

app.get('/', (req, res)=> {
    res.render('home.ejs')
})

app.get('/profile', (req, res) => {
    res.render('profile.ejs')
})

app.listen(8000, ()=>{
    console.log('listening on 8000')
})