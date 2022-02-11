const express=require("express")
const knex=require("./../Databese/module")
const router=express.Router()
const {autindecationToke}=require('./../Auth/auth')
// In this API i am join two tables(shopping_cart,product) and afrer that insert data in other tow tabes(orders,order_detail)   
router.post('/orders',autindecationToke, (req, res) => {
    knex
    .select("*")
    .from("shopping_cart")
    .join("product",'shopping_cart.product_id', 'product.product_id')
    .then((data) => {
        var customer_id = req.body.customer_id;
        knex("orders").insert({
            "total_amount": data[0].quantity * data[0].price,
            "created_on": new Date(),
            "customer_id": customer_id,
            "shipping_id": req.body.shipping_id,
            "tax_id": req.body.tax_id
        }).then((data1) => {
            knex("order_detail").insert({
                "unit_cost": data[0].price,
                "quantity": data[0].quantity,
                "product_name": data[0].name,
                "attributes": data[0].attributes,
                "product_id": data[0].product_id,
                "order_id": data1[0]
            })
        })
            .then((data3) => {
                knex.select("*").from("shopping_cart").where("cart_id", req.body.cart_id).delete()
                    .then(() => {
                        res.send({ "order Id": "orders successfully" })
                    }).catch((err) => {
                        res.send(err)
                    })
            }).catch(() => {
                res.send({ "error": "error in insserting data in orders detail." })
            })
    })
})


router.get('/orders/:order_id',autindecationToke,(req,res)=>{
    knex('orders').where({order_id:req.params.order_id}).then(data=>{
        res.send(data)
    })
})

router.get('/orders/inCustomer', autindecationToke, (req, res) => {

    var customer_id = req.token_data.customer_id
    knex.select('*')
    .from('customer')
    .where('customer_id', customer_id)
        .then((data) => {
            res.send(data)
        })
})

//in API where get order_id,total_amount,created_on, shipped_on,status,product.name anda jooin two tables
router.get('/orders/shortdetail/:order_id', (req, res) => {
    const order_id = req.params.order_id;
    knex('orders').select('order_id', 'total_amount', "created_on", "shipped_on", "status", 'product.name')
    .join('product','orders.order_id', 'product.product_id')
    .where('orders.order_id', order_id).then((data) => {
        res.send(data)
    })

})



module.exports=router