const knex=require('./../Databese/module')
const express=require('express')
const router=express.Router()

router.get('/categories',(req,res)=>{
    knex.from('category').then(data=>{
        res.send(data)
    })
})

router.get('/categories/:category_id',(req,res)=>{
    knex.from('category').where({category_id:req.params.category_id}).then(data=>{
        res.send(data)
    })
})

router.get('/categories/inProduct/:product_id',(req,res)=>{
    knex.from('category').select('category_id','department_id','name').where({category_id:req.params.product_id}).then(data=>{
        res.send(data)
    })
})

router.get('/categories/inDepartment/:department_id',(req,res)=>{
    knex.from('category').select('category_id','name','description').where({category_id:req.params.department_id})
    .then(data=>{
        res.send(data)
    })
})


module.exports=router