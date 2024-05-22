import React, { useState , useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { Divider, Flex, Tag } from 'antd';

const { TabPane } = Tabs;
function Profilescreen() {
    const user = JSON.parse(localStorage.getItem("currentuser"))
    useEffect(()=>{
        if(!user){
            window.location.href='/login'
        }
    },[])
  return (
    <div className='ml-3 mt-3'>
         <Tabs defaultActiveKey="1" >
    <TabPane tab="Profile" key="1">
      <h1>My Profile</h1>
      <br />
      <h1>Name : {user.name}</h1>
      <h1>Email : {user.email}</h1>
      <h1>Is Admin : {user.isAdmin ? 'YES' : 'NO'}</h1>
    </TabPane>
    <TabPane tab="Bookings" key="2">
      <MyBookings/>
    </TabPane>
  </Tabs>
        
    </div>
  )
}

export default Profilescreen



export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentuser"));
    const [bookings , setbookings] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })).data;
                console.log(data);
                setbookings(data)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
                setError(error)
            }
        };
        fetchData();
    }, [user._id]); // Include user._id in the dependency array to re-fetch bookings when user ID changes
    async function  cancelbooking(bookingid , roomid){
        try {
            setLoading(true)
            const result = (await axios.post("/api/bookings/cancelbooking",{bookingid,roomid})).data
            console.log(result)
            setLoading(false)
            Swal.fire('🥲🥲','Your Booking has been cancelled👌','Success').then(result=>{
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {loading && <Loader/>}
                    {bookings && (bookings.map(booking=>{
                       return <div className='bs'>
                            <h1>{booking.room}</h1>
                            <p><b>Booking Id</b> : {booking._id}</p>
                            <p><b>Check In</b> : {booking.fromdate}</p>
                            <p><b>Check Out</b>:{booking.todate}</p>
                            <p><b>Amount</b> : {booking.a}</p>
                            <p><b>Status</b> :{" "}
                             {booking.status=='Cancelled' ?  (<Tag color="red">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)}
                            </p>
                           {booking.status !==  'Cancelled' && ( <div className='text-right'>

<button className='btn btn-primary' onClick={()=>{cancelbooking(booking._id , booking.roomid)}}>CANCEL BOOKING</button>

</div>)}
                        </div>
                    }))}
                </div>
            </div>
        </div>
    );
}

