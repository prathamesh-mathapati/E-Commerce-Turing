const knex=require('./../Databese/module')
const express=require('express')
const router=express.Router()

router.get('/attributes',(req,res)=>{
    knex.from('attribute').then(data=>{
        res.send(data)
    })
})

router.get('/attributes/:attribute_id',(req,res)=>{
    knex.from('attribute').where({attribute_id:req.params.attribute_id}).then(data=>{
        res.send(data)
    })
})

router.get('/attributes/valuse/:attribute_id',(req,res)=>{
    knex.from('attribute_value').select('attribute_value_id','value').where({attribute_id:req.params.attribute_id}).then(data=>{
        res.send(data)
    })
})

router.get('/attributes/inProduct/:attribute_id',(req,res)=>{
    knex.from('attribute_value').where({attribute_id:req.params.attribute_id}).then(data=>{
        res.send(data)
    })
})

module.exports=router