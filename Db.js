const mongoose = require('mongoose');

let mong_url= 'mongodb+srv://Richesh:richesh@cluster0.jllohuh.mongodb.net/Hotel'

mongoose.connect(mong_url , {useUnifiedTopology : true,useNewUrlParser:true})

let connection = mongoose.connection

connection.on('error',()=>{
    console.log("DB CONNECTION FAILED");
})

connection.on('connected',()=>{
    console.log("DB IS CONNECTED");
})

module.exports=mongoose