export const errorHandling=(err,req,res,next)=>{

    let statusCode=req.statusCode||500;
    let message=err.message||"מצטערים התרחשה שגיאה"
    res.status(statusCode).send(message)
}