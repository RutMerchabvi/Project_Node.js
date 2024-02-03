import { generetToken,userModel,userValidator } from "../Model/user.js";
import bcrypt from "bcryptjs";



export const addUser = async (req, res) => {
    let { email, password, userName, role, dateOfRegistration} = req.body;
    const result = await userValidator(req.body);
    console.log(result)
    if(result.error)
    return res.status(404).json({type:"invalid data ",message:result.error.details[0].message})
    try {
        const sameUser = await userModel.findOne({ email: email });
        if (sameUser)
            return res.status(409).json({ type: "same user", message: "user with such email already exists" })
        
            let hashedPassword=await bcrypt.hash(password,15);

         let newUser = new userModel({ email, password:hashedPassword, userName,role });
        await newUser.save();
        let token=generetToken(newUser._id,newUser.role,newUser.userName);
        return res.json({_id:newUser.id,userName:newUser.userName,token,email:newUser.email,role:newUser.role})
    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "cannot add user" })
    }
}


export const login = async (req, res) => {
    let { email, password } = req.body;


    if (!email || !password)
        return res.status(404).json({ type: "missing parameters", message: "please send email  and password" })
    try {
        const user = await userModel.findOne({ email: email });
        if (!user)
            return res.status(404).json({ type: "no  user", message: "one or more details are invalid" })
        if(!await bcrypt.compare(password,user.password))
        return res.status(404).json({ type: "no  user",massage:"user password is invalid"})
        let token=generetToken(user._id,user.role,user.userName);
        // newUser.password="*****"
        return res.json({_id:user._id,userName:user.userName,token,email:user.email,password:user.password})
        
       
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "cannot sign in user" })

    }
}
export const getAllUsers = async (req, res) => {
     try {
        let allUsers = await userModel.find({}, "-password");
        res.json(allUsers);


    } catch (err) {
        res.status(400).json({ type: "invalid operation", message: "cannot sign in user" })
    }
}

