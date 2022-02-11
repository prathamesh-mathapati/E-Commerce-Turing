const knex=require('./../Databese/module')
const express=require('express')
const router = require('./products')
const {autindecationToke,genratetoken}=require('./../Auth/auth')
const roture=express.Router()

router.put('/customers/:customer_id',autindecationToke,(req,res)=>{
    // console.log(req.params.id);
    knex.from('customer').where({customer_id:req.params.customer_id}).update({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        day_phone:req.body.day_phone,
        eve_phone:req.body.eve_phone,
        mob_phone:req.body.mob_phone
    }).then(data=>{
        res.send('customer data is successfuly updedet')
    })
})

router.get('/customers/:customer_id',(req,res)=>{
    knex.from('customer').where({customer_id:req.params.customer_id}).then(data=>{
        res.send(data)
    })
})

router.post('/customers',autindecationToke,(req,res)=>{
    knex.from('customer').insert(req.body).then(data=>{
        res.send('customer data is insert')
    }).catch(err=>{
        res.send('email is allredy exit');
    })
})

router.post("/customers/login",(req,res)=>{
    knex.from('customer').where({
        email:req.body.email,
        password:req.body.password
    }).then(data=>{
        const secretekey=req.body
        const token=genratetoken(secretekey)
        res.cookie('token',token).send('you are logged in successfully')
    })
})


router.put("/customers/address/:customer_id",autindecationToke,(req,res)=>{
    const data = req.body
    knex('customer').where({customer_id: req.params.customer_id})
    .update({
        "address_1": data.address_1,
        "address_2": data.address_2,
        "city": data.city,
        "region": data.region,
        "postal_code": data.postal_code,
        "country": data.country,
        "shipping_region_id": data.shipping_region_id
    })
    .then(() => {
        res.send('customer is successfuly update')

    })
})

router.put("/customers/credit_card/:customer_id",autindecationToke,(req,res)=>{
    knex("customer").where({customer_id:req.params.customer_id}).update({
        "credit_card":req.body.credit_card
    }).then(data=>{
        res.send('credit_card is successfuly puted')
    }).catch(err=>{
        console.log(err);
    })
})
module.exports=router