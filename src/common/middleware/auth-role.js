


export const checkRole  = (type = "student")=>{
    return (req , res , next)=>{     
           
        if(req.user.role == type) next()
        else res.status(400).json({
            message:"This action is not intended for you."
    })
    }
}