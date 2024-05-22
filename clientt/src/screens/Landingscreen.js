import React from 'react'
import {Link} from 'react-router-dom'
function Landingscreen() {
  return (
    <div className='row landing justify-constent-center'>
        <div className="col-md-12  text-center">
            <h1 id ='hh'style={{fontSize:'150px'}}>Hotelswheels HUB</h1>
            <h1 style={{color : '#fff'}}>"Welcome to Hotelswheels HUB"</h1>
            <Link to='/home'>
            <button className='btn landingbtn'>Get Started</button>
            </Link>
           
        </div>
    </div>
  )
}

export default Landingscreen