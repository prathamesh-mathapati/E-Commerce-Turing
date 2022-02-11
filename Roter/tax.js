const knex=require('./../Databese/module')
const express=require('express')
const router=express.Router()

router.get('/tax',(req,res)=>{
    knex('tax').then(data=>{
        res.send(data)
    })
})

router.get('/tax/:tax_id',(req,res)=>{
    knex('tax').where({tax_id:req.params.tax_id}).then(data=>{
        res.send(data)
    })
})
module.exports=router