const knex=require('./../Databese/module')
const express=require('express')
const router=express.Router()

router.get('/shippings/regions',(req,res)=>{
    knex('shipping').then(data=>{
        res.send(data)
    })
})

router.get('/shippings/regions/:shipping_region_id',(req,res)=>{
    knex('shipping').where({shipping_region_id:req.params.shipping_region_id}).then(data=>{
        res.send(data)
    })
})

module.exports=router;