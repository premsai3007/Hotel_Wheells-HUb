const express = require("express");
const router =express.Router();
const Room = require('../models/room')

router.get("/getallrooms",async(req,res)=>{
    try {
        const rooms = await Room.find({})
        return res.send(rooms);
    } catch (error) {
        return res.status(400).json({message: error})
    }
});

router.post("/getroombyid",async(req,res)=>{
    const roomid=req.body.roomid
    try {
        const room = await Room.findOne({_id : roomid})
        return res.send(room);
    } catch (error) {
        return res.status(400).json({message: error})
    }
});

router.post('/addroom',async(req , res)=>{
    try {
        const newroom = new Room(req.body)
        await newroom.save()

        res.send('New Added 👌')
    } catch (error) {
        return res.status(404).json({error})
    }
})

module.exports=router;