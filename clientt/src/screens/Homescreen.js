import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Homescreen() {
  const [originalRooms, setOriginalRooms] = useState([]); // Store the original list of rooms
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [type, setType] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get('/api/rooms/getallrooms')).data;
        setOriginalRooms(data); // Save original list of rooms
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function filterBySearch() {
    const tempRooms = originalRooms.filter(room => room.name.toLowerCase().includes(searchKey.toLowerCase()));
    setRooms(tempRooms);
  }

  function handleSearchInputChange(e) {
    const { value } = e.target;
    setSearchKey(value);
    if (value === '') {
      // If search input is empty, revert back to original list of rooms
      setRooms(originalRooms);
    }
  }

  function filterByType(e) {
    setType(e)
    const selectedType = e.target.value.toLowerCase();
    // console.log("Selected Type:", selectedType); // Check the selected type
    setType(selectedType); // Update the type state
    if (selectedType !== 'all') {
      // console.log("Original Rooms:", originalRooms); // Check original rooms
      const tempRooms = originalRooms.filter(room => room.type.toLowerCase() === selectedType.toLowerCase());
      setRooms(tempRooms); // Reset to originalRooms
    } else {
      const tempRooms = originalRooms.filter(room => room.type.toLowerCase() === selectedType);
      // console.log("Filtered Rooms:", tempRooms); // Check filtered rooms
      setRooms(rooms);
    }
  }
  

  return (
    <div id='home' className='container'>
      <div className='row mt-5 bs'>
        <div className="col-md-5">
          <input type="text" className='form-control' placeholder='Search Rooms'
            value={searchKey} onChange={handleSearchInputChange} onKeyUp={filterBySearch}
          />
        </div>
        <div className='col-md-3'>
          <select className='form-control' value={type} onChange={filterByType}>
            <option value="all">All</option>
            <option value="Delux">Delux</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>
      </div>

      <div className='row justify-content-center mt-5'>
        {loading ? (<h1><Loader/></h1>) :  (
          rooms.map(room => (
            <div className="col-md-9 mt-3" key={room.id}> 
              <Room room={room} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;
