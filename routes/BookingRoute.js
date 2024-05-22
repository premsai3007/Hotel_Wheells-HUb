const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const moment = require("moment");
const Room = require("../models/room");

router.post("/bookroom", async (req, res) => {
    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token
    } = req.body;

    try {
        // Create a new booking entry
        const newBooking = await Booking.create({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate: moment(fromdate).format('YYYY-MM-DD'),
            todate: moment(todate).format('YYYY-MM-DD'),
            totalamount,
            totaldays,
            transaction_id: '1234' // Assuming a static transaction ID for now
        });

        // Update the corresponding room's currentbooking array
        const roomTemp = await Room.findOne({ _id: room._id });
        if (!roomTemp) {
            throw new Error("Room not found");
        }
        roomTemp.currentbooking.push({
            bookingid: newBooking._id,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            userid: userid,
            status: newBooking.status // Assuming status is included in newBooking
        });
        await roomTemp.save();

        res.status(200).send('Room booked successfully');
    } catch (error) {
        console.error("Error booking room:", error.message);
        res.status(400).json({ error: error.message });
    }
});

router.post("/getbookingsbyuserid", async (req, res) => {
    const { userid } = req.body;

    try {
        // Retrieve bookings by user ID
        const bookings = await Booking.find({ userid });
        res.status(200).send(bookings);
    } catch (error) {
        console.error("Error retrieving bookings:", error.message);
        res.status(400).json({ error: error.message });
    }
});


router.post("/cancelbooking",async(req,res)=>{
    const{bookingid , roomid} = req.body
    try {
        const bookingitem = await Booking.findOne({_id : bookingid})
        bookingitem.status = 'Cancelled'
        await bookingitem.save()
        const room = await Room.findOne({_id : roomid})
        const bookings =room.currentbooking
        const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid)
        room.currentbooking = temp;

        await room.save();
        res.send("Canceled !!");

    } catch (error) {
       return  res.status(400).json({error});
    }
})

router.get("/getallbookings",async(req , res)=>{
    try {
        const bookings = await Booking.find()
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({error});
    }
})
module.exports = router;
