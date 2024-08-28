import React, { useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Mainlayout from './Layout/Mainlayout';
import Authlayout from './Layout/Authlayout';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Categories from './Pages/Categories';
import Profile from './Pages/Profile';
import { useDispatch } from 'react-redux';
import { authActions } from './store/auth';
import Addpodcast from './Pages/Addpodcast';
import AllPodcasts from './Pages/AllPodcasts';
import CategoriesPage from './Pages/CategoriesPage';
import Description from './Pages/Description';
import Aboutus from './Pages/AboutUs';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token")
    )
    {
      dispatch(authActions.login());
    }
  },[]);
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Mainlayout/>}>
        {" "}
      <Route index element={<Home/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/about-us' element={<Aboutus/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/add-podcast" element={<Addpodcast/>}/>
      <Route path="/all-podcast" element={<AllPodcasts/>}/>
      <Route path="/categories/:cat" element={<CategoriesPage/>}/>
      <Route path="/description/:id" element={<Description/>}/>
      </Route>
      <Route path='/' element={<Authlayout/>}>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
 