const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')

//set up ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//body parser middleware (to read req.body)
app.use(express.urlencoded({extended: false}))

//set up middleware for controllers
app.use('/auth', require('./controllers/auth.js'))

app.get('/', (req, res)=> {
    res.send('HOME ROUTE')
})

app.listen(8000, ()=>{
    console.log('listening on 8000')
})