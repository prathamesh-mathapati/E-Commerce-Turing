const express=require('express')
const router=express.Router()
const knex=require('./../Databese/module')
const random=require('randomstring')
const { LATIN1_SPANISH_CI } = require('mysql/lib/protocol/constants/charsets')
router.get('/shoppingcart/generateUniqueId',(req,res)=>{
    const cart_id=random.generate({charset:"prathamesh"})
    // console.log(cart_id);
    res.send({"This is your cart id":cart_id})
})

router.post('/shoppingcart/add',(req,res)=>{
    knex('shopping_cart').join('product','product.product_id','shopping_cart.product_id').
    where({product_id:req.body.product_id}).insert({ 
        // req.body
        cart_id:req.body.cart_id,
        product_id:req.body.product_id,
        attributes:req.body.attributes,
        added_on: new Date,
        quantity:req.body.quantity
    }).then(data=>{
        res.send('shopping cart data is inserted')
    })
})

router.get('/shoppingcart/:cart_id',(req,res)=>{
    knex('shopping_cart').where({cart_id:req.params.cart_id}).then(data=>{
        res.send(data)
    })
})

router.put('/shoppingcart/update/:item_id',(req,res)=>{
    knex('shopping_cart').where({item_id:req.params.item_id}).update({
        item_id:req.params.item_id,
        quantity:req.body.quantity
    }).then(data=>{
        res.send('data shoppingcart is updated by item_id')
    })
})

router.delete('/shoppingcart/movetocart/:item_id',(req,res)=>{
    knex('shopping_cart').where({cart_id:req.params.item_id}).del().then(data=>{
        res.send('data is delete')
    })
})
//this API is just  move  shopping_cart table data in move_cart

router.get('/shoppingcart/movetocart/:item_id',(req,res)=>{
    knex.schema.createTable('move_cart',table=>{
        table.increments('item_id').primary();
        table.string('cart_id'),
        table.integer('product_id'),
        table.string('attributes'),
        table.integer('quantity'),
        table.integer('buy_now'),
        table.datetime('added_on')
    }).then(()=>{
        console.log('move_cart table is create')
    }).catch(err=>{
        console.log('move_cart table is allredy create')
    })
        knex('shopping_cart').where({item_id:req.params.item_id}).then(data=>{
            knex('move_cart').insert(data).then(data=>{
                knex('shopping_cart').where({item_id:req.params.item_id}).del().then(()=>{
                    res.send('data is successfuly move')
                })
            }).catch(err=>{
                res.send({'err':'item_id is not available in shopping_cart'})
            })
        })
})

router.get('/shoppingcart/totalAmount/:cart_id',(req,res)=>{
    knex('shopping_cart').join('product','product.product_id','shopping_cart.product_id')
    .where("shopping_cart.cart_id",`${req.params.cart_id}`).then(data=>{
        var count=0
        count=data[0].quantity*data[0].price
        res.send({'totelAmount':count})
    })
})

// In this API we are we copy all data to shopping_cart in saveForLater table

router.get('/shoppingcart/saveForLater/:item_id',(req,res)=>{
    knex.schema.createTable('saveForLater',table=>{
        table.increments('item_id').primary();
        table.string('cart_id'),
        table.integer('product_id'),
        table.string('attributes'),
        table.integer('quantity'),
        table.integer('buy_now'),
        table.datetime('added_on')
    }).then(()=>{
        console.log('saveForLater this table successfuly created');
    }).catch(err=>{
        console.log('saveForLater is allready created');
    })

    knex('shopping_cart').where({item_id:req.params.item_id}).then(data=>{
        knex('saveForLater').insert(data).then(()=>{
            res.send('data is successfuly copy')
        }).catch(err=>{
            res.send({err:'item_id is not available in shopping_cart'})
        })
    })
})

// IN this API we are just get data by use two database
router.get('/shoppingcart/getSaved/:cart_id',(req, res) => {
    knex.select('item_id', 'name', 'attributes', 'shopping_cart.product_id','price','quantity','image')
    .from('shopping_cart').join('product','shopping_cart.product_id', 'product.product_id')
    .where('shopping_cart.cart_id', req.params.cart_id)
        .then((data) => {
            if (data.length===0){
                console.log(typeof(data));
                res.send({err:'cart_id is not available in shopping_car'})
            }else{ 
            res.send(data)
        }})
})

router.delete('/shoppingcart/removedProduct/:item_id', (req, res) => {
    knex('shopping_cart').where({item_id:req.params.item_id}).del().then((data) => {
        res.send('product removed successfully from shopping cart')
    }).catch((Err) => {
        res.send({ err:'item_id is not available in shopping cart' })
    })
})

module.exports=router