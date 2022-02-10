require('dotenv').config()
const express=require('express')
const app=express()
const router = require('./Roter/ department'),categories=require('./Roter/categories'),attribute=require('./Roter/attributes')
const customer=require('./Roter/customer'),orders=require("./Roter/Orders")
const products=require('./Roter/products'),shoppingcart=require('./Roter/shoppingcart')

app.use(express.json())
app.use('/', router)
app.use('/',categories)
app.use('/',attribute)
app.use('/',products)
app.use('/',customer)
app.use('/',orders)
app.use('/',shoppingcart)

app.listen(process.env.port,()=>{

    console.log(`this ${process.env.port} port is lisen`);
})
