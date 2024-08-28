import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoReorderThree } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { useSelector } from 'react-redux';
const Navbar = () => {
  const IsLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  console.log(IsLoggedIn);
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About us",
      link: "/about-us",
    },
    {
      title: "Categories",
      link: "/categories",
    },
    {
      title: "All podcasts",
      link: "/all-podcast",
    },
  ];
  const [Mobilenav, setMobilenav] = useState(false);
  return (
    <>
      <nav className="px-4 md:px-8 lg:px-12 py-2 relative">
        <div className="flex items-center justify-between">
          <div className="logo brand-name w-2/6 flex items-center gap-4">
          <img src="headphone_11122692.png" alt="" className='h-12'/>
            <Link to="/" className="text-2xl font-bold">
              Podcaster
            </Link>
          </div>
          <div className="hidden w-2/6 lg:flex items-center justify-center">
            {links.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="ml-4 hover:font-semibold transition-all duration-300"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="hidden w-2/6 lg:flex items-center justify-end">
          {!IsLoggedIn &&(
          <>
          <Link className='px-6 py-3 border border-black rounded-full' to='/login'>
          Login</Link>
          <Link className='ms-4 px-6 py-3 border border-black rounded-full text-white bg-black' to='/signup'>SignUp</Link>
          </>)}
          {IsLoggedIn && (
            <Link className='ms-4 px-6 py-3 border border-black rounded-full text-white bg-black' to='/profile'>Profile</Link>
          )}
          </div>
          {/* to change the Mobilenav */}
          <div className='w-4/6 flex items-center justify-end z-50 lg:hidden'>
          <button className={`text-4xl ${Mobilenav ? "rotate-360" : "rotate-180"} transition-all duration-300`} 
          onClick={()=>setMobilenav(!Mobilenav)}>
          {Mobilenav ? <ImCross/> : <IoReorderThree/>}
          </button>
          </div>
        </div>
        {/*mobile view*/}
        <div className={`fixed top-0 left-0 w-full h-screen bg-blue-100 ${Mobilenav ? "translate-y-[0%]":"translate-y-[-100%]"} transition-all duration-500`}>
          <div className='h-full flex flex-col items-center justify-center'>
          {links.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="ml-4 hover:font-semibold transition-all duration-300 text-3xl mb-6"
              >
                {item.title}
              </Link>
            ))}
            {!IsLoggedIn &&(
          <>
          <Link className='ml-4 hover:font-semibold transition-all duration-300 text-3xl mb-6' to='/login'>
          Login</Link>
          <Link className='ml-4 hover:font-semibold transition-all duration-300 text-3xl mb-6' to='/signup'>SignUp</Link>
          </>)}
          {IsLoggedIn && (
            <Link className='ml-4 hover:font-semibold transition-all duration-300 text-3xl mb-6' to='/profile'>Profile</Link>
          )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
