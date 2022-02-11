// const { default: knex } = require('knex')
const knex = require('../Databese/module')
const express = require('express')
const route = express.Router()

route.get("/department", (req,res)=>{
    knex.from('department').then(data=>{
        res.send(data)
    })
})

route.get("/department/:id",(req,res)=>{
    knex.from('department').where({department_id:req.params.id}).then(data=>{
        res.send(data)
    })
})

module.exports = route;