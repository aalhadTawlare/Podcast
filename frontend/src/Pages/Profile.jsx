import React from 'react'
import { useSelector } from 'react-redux'
import Errorpage from './Errorpage';
import Header from '../Components/Profile/Header';
import Yourpodcast from '../Components/Profile/Yourpodcast';

const Profile = () => {
  const IsLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  return (
    <div>
      {IsLoggedIn ? (<>
        <Header/>
      <Yourpodcast/>
      </>) : (<Errorpage/>)}
    </div>
  )
}

export default Profile