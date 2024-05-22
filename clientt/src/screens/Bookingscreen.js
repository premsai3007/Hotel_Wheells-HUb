import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import swal from 'sweetalert2'


function Bookingscreen() {
  const { roomid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [room, setRoom] = useState(null);
  const [fromdate, setFromDate] = useState(moment().set('date', 29).toDate());
  const [todate, setToDate] = useState(moment().set('date', 29).toDate());

  

  // Convert fromdate and todate to moment objects
  const fromDateMoment = moment(fromdate);
  const toDateMoment = moment(todate);

  // Calculate total days
  const totaldays = toDateMoment.diff(fromDateMoment, 'days')+1;
  const [totalamount , settotalamount] = useState();
  

  useEffect(() => {
      if(!localStorage.getItem('currentuser')){
        window.location.reload='/logins'
      }
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.post('/api/rooms/getroombyid', { roomid })).data;
        settotalamount(data.rentperday * totaldays)
       
        // totalamount=totaldays * room.rentperday
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    fetchData();
  }, [roomid]);



  async function onToken(token){
    console.log(token)
    const bookingdetails = {
      room,
      userid:JSON.parse(localStorage.getItem('currentuser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    }
    try {
      setLoading(true)
      const result = await axios.post('/api/bookings/bookroom',bookingdetails)
      setLoading(false)
      swal.fire('congratulations','Your room is booked','Success').then(result=>{
        window.location.href='/bookings'
      })
    } catch (error) {
      setLoading(false)
      swal.fire('!!!','Something went wrong', 'error')
    }
  }

  return (
    <div className='m-5'>
      {loading ? (
        <h1><Loader/></h1>
      ) : room ?  (
        <div id='book' className='row justify-content-center mt-5 bs'>
          <div className="col-md-6">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className='bigimg' alt="Room" />
          </div>
          <div className="col-md-6">
            <div id='bd' style={{textAlign : 'right'}}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>Name:{JSON.parse(localStorage.getItem('currentuser')).name}</p>
                <DatePicker className='dp' selected={fromdate} onChange={date => setFromDate(date)}/>
                <DatePicker className='dp' selected={todate} onChange={date => setToDate(date)} />
                <p>Max Count: {room.maxcount}</p>
              </b>
            </div>
            <div style={{textAlign : 'right'}}>
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Total Days: {totaldays}</p>
                <p>Rent Per Day: {room.rentperday}</p>
                <p>Total Amount: {totaldays * room.rentperday}</p>
              </b>
            </div>
            <div style={{float: 'right'}}>
              

              <StripeCheckout
              amount={(totaldays * room.rentperday) * 100}
        token={onToken}
        currency='INR'
        stripeKey="pk_test_51OzgFcSDe7bQ3jPCPeILsV2Aw4EBGe2ANSjaaXJ9UIHRXHg7uSgItOD1iiREj217SeQFzYszNgTabP8jJwgcxv2y00ZpWAKMNr"
      >
        <button id='pn' className='btn btn-primary' >Pay Now{" "}</button>
      </StripeCheckout>

            </div>
          </div>
        </div>
      ) : (
        <h1><Error/></h1>
      )}
    </div>
  );
}

export default Bookingscreen;
