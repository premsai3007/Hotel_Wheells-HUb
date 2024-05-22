import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Register from './screens/Register';
import Login from './screens/Login';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route path="/book/:roomid" exact Component={Bookingscreen} />
          <Route path='/Register' exact Component={Register}/>
          <Route path='/Login' exact Component={Login}/>
          <Route path='/profile' exact Component={Profilescreen}/>
          <Route path='/admin' exact Component={Adminscreen}/>
          <Route path='/' exact Component={Landingscreen}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
