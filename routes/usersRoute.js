const express =require("express")
const router = express.Router();
const User = require("../models/User")
router.post('/register',async(req,res)=>{
    const newuser = new  User({name : req.body.name, email:req.body.email,password : req.body.password})
    try {
        const user= await newuser.save()
        res.send('User Registers Successfully')
    } catch (error) {
        return res.status(404).json({error})
    }

})

router.post("/login",async(req,res)=>{
    const  {email , password} =req.body
    try {
        const user = await User.findOne({ email: email, password: password });
        if (user) {
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id
            };
            res.json(temp);
            // console.log(temp)
            // console.log(user) // Using res.json() for sending JSON response
        } else {
            res.status(400).json({ message: 'Login failed' }); // Sending error response with status code
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Sending error response with status code and error message
    }
    
});

router.get("/getallusers",async(req , res)=>{
        try {
            const users = await User.find()
            res.send(users)
        } catch (error) {
            res.status(400).json({error})
        }
})
module.exports=router