const {verify} = require("jsonwebtoken");
const db = require("../models");

module.exports={
    verifyLogin:(req,res,next)=>{
        let token = req.get("authorization");

        if(token){
            let wow = token.slice(7)
            verify(wow,"secretkey",(err,decoded)=>{
                if(err){
                    res.json({
                        message: "Login First"
                    })
                }else{
                    next()        
                }
            })
        }else{
            res.json({
                message: "Access Denied : unauthorized user"
            })
        }
    }
}
