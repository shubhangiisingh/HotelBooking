import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'
import HotelReg from './components/HotelReg'
import Layout from './pages/HotelOwner/Layout'
import Dashboard from './pages/HotelOwner/Dashboard'
import AddRoom from './pages/HotelOwner/AddRoom'
import ListRoom from './pages/HotelOwner/ListRoom'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
const App = () => {
  const isOwnerPath = useLocation().pathname.includes('owner');
const {showHotelReg} = useAppContext();
  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/hotel-register' element={<HotelReg />} />

          {/* Nested Owner Routes */}
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} /> {/* /owner */}
            <Route path='add-rooms' element={<AddRoom />} /> {/* /owner/add-room */}
            <Route path='list-room' element={<ListRoom />} /> {/* /owner/list-room */}
          </Route>
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </div>
  )
}

export default App


 


