const jwt=require('jsonwebtoken')

exports.genratetoken=data=>{
    return jwt.sign({data},'prathamesh')
}

exports.autindecationToke=(req,res,next)=>{
    if (req.headers.cookies){
        const token=req.headers.cookie.split('=')[1]
        console.log(token);
        const decode=jwt.verify(token,'prathamesh')
        req.data=decode
        next()
    }else{
        req.data="cookie is remove"
        next()
    }
}