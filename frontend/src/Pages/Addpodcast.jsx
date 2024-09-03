import React from 'react'
import { useSelector } from 'react-redux';
import InputPodcast from '../Components/Addpodcast/InputPodcast';
import Errorpage from './Errorpage';

const Addpodcast = () => {
    const IsLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  return (
   <>
   {IsLoggedIn ? (<InputPodcast/>):(<Errorpage/>)}
   </>
  )
}

export default Addpodcast