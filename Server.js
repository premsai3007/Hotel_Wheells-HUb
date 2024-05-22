const express =require('express');

const app=express();
const dbcon=require('./Db');
const roomsRoutes=require('./routes/roomsRoute')
const usersroute=require('./routes/usersRoute')
//app.use('/api/rooms',roomsRoutes)
const bookingsroute = require('./routes/BookingRoute')
app.use(express.json())
app.use('/api/rooms',roomsRoutes)
app.use('/api/users',usersroute)
app.use('/api/bookings',bookingsroute)

const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server is running on port no:${port}`)
})