const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const session = require('express-session')

const pageRouter = require('./router/page')
const carsRouter = require('./router/cars')
const usersRouter = require('./router/users')
const authRouter = require('./router/auth')
const varMid = require('./middleware/var')


const { getUnpackedSettings } = require('http2')
const app = express('')
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(session({
    secret: 'some secret key',
    saveUninitialized:false,
    resave:false
}))
app.use(varMid)
app.use(pageRouter)
app.use('/users',usersRouter)
app.use('/auth',authRouter)
// app.use('/persons', personRouter)

// app.listen(3000,()=>{
//     console.log('Server ishga tushdi')
// })

app.use('/cars',carsRouter)
async function dev(){
    try {
        const url = 'mongodb://127.0.0.1:27017/cars'
        await mongoose.connect(url,{useNewUrlParser:true})
        app.listen(3000,()=>{
            console.log('Server is running');
        })
    } catch (error) {
        console.log(error);
    }
}

dev()