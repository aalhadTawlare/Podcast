import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import AudioPlayer from '../Components/AudioPlayer/AudioPlayer'

const Mainlayout = () => {
  return (
    <div className='relative'>
        <Navbar/>
        <main>
        <Outlet/>
        </main>
        <div className='w-full'>
        <AudioPlayer/>
        </div>
    </div>
  )
}

export default Mainlayout