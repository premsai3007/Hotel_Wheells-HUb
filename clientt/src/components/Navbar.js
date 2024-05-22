import React from 'react'

function Navbar() {
  const user = JSON.parse(localStorage.getItem('currentuser'))
  function logout(){
    localStorage.removeItem('currentuser')
    window.location.href='/login'
  }
  return (
    <div>
       <nav className="navbar navbar-expand-lg ">
  <a className="navbar-brand" href="/home">Hotelswheels HUB</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" style={{color : 'white'}}><i class="fas fa-bars" style={{color : 'white'}}></i></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
  <ul className="navbar-nav " style={{ marginRight: '50px' }}>
      {user ? (<>
        <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   <i className='fa fa-user'></i> {user.name}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <li><a className="dropdown-item" href="/profile" style={{ marginRight: '0px' }}>Profile</a></li>
  <li><a className="dropdown-item" href="#" onClick={logout} style={{ marginRight: '0px' }}>Logout</a></li>
    
  </ul>
</div>
      </>): (<>
        <li className="nav-item active">
        <a className="nav-link" href="/register">Registers</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="login">Login</a>
      </li>
      </>)}
      
    </ul>
  </div>
</nav>
    </div>
  )
}

export default Navbar