const knex=require('./../Databese/module')
const express=require('express')
const router=express.Router()

router.get('/products',(req,res)=>{
    knex.from('product').then(data=>{
        res.send(data)
    })
})

//http://localhost:5001/products/search?query_string=St
router.get('/products/search',(req,res)=>{
    const search=req.query
    knex.from('product').select('product_id','name','description','price','discounted_price','thumbnail')
    .where("name",'like',`%${search['query_string']}%`).then(data=>{
        var count=0,dict={}
        for(var i of data){
            count++
        }
    dict['count']=count,dict['rows']=data
    res.send(dict);
    }).catch(err=>{
        console.log(err);
    })
})

router.get('/products/:product_id',(req,res)=>{
    knex.from('product').where({product_id:req.params.product_id}).then(data=>{
        res.send(data)
    })
})

router.get('/products/incategory/:category_id',(req,res)=>{
    knex.select('product.product_id','name','description','price','discounted_price','thumbnail')
    .from('product').join('product_category',function(){
        this.on('product.product_id','product_category.product_id')})
        .where('product_category.category_id',req.params.category_id)
        .then((data)=>{
            var count=0,dict={}
            for(i in data){
                count++
            }
            dict['count']=count,dict['row']=data
            res.send(dict)
        })  
})

router.get('/products/inDepartment/:department_id',(req,res)=>{
    knex.select('product.product_id','product.name','product.description','product.price','product.discounted_price','product.thumbnail')
    .from('product').join('product_category','product_category.product_id','product.product_id')
    .join("category", "product_category.category_id", "category.category_id")
.where('category.department_id',req.params.department_id).then(data=>{
        var count=0,dic={}
        for(i in data){
            count++
        }
        dic['count']=count,dic['rows']=data
        res.send(dic)
    })
})
router.get('/products/:product_id/details',(req,res)=>{
    knex.select('product_id','name','description','price','discounted_price','image','image_2')
    .from('product').where({product_id:req.params.product_id}).then(data=>{
        res.send(data)
    })
})

router.get('/products/:product_id/locations',(req,res)=>{
    knex('product_category').select('product_category.category_id','category_name','department.department_id','department_name')
    .join('category','category.category_id','product_category.category_id')
    .join('department','department.department_id','category.department_id').where({product_id:req.params.product_id})
    .then(data=>{
        res.send(data)
    })
})

router.get('/products/:product_id/reviews',(req,res)=>{
    knex.from('review').select('customer.name','review.review','review.rating','review.created_on')
    .join('customer','customer.customer_id','review.customer_id').then(data=>{
        res.send(data)
    })
})

router.post('/products/:id/reviews',(req,res)=>{
    knex.from('review').where({product_id:req.params.id})
    .insert(req.body).then((data)=>{
        res.send({message:'reviwes data is successfuly inserted'})
        console.log(data);
    })
})

module.exports=router