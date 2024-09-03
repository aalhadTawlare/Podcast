import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Errorpage from './Errorpage';

const Signup = () => {
  const IsLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "") {
        alert("All entries are required");
      } else {
        const response = await axios.post("http://localhost:3001/api/v1/signup", Values);
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      {IsLoggedIn ? (
        <Errorpage />
      ) : (
        <div className="h-screen bg-green-200 px-12 py-8 flex items-center justify-center">
          <div className="rounded-lg px-8 py-5 w-full md:3/6 lg:w-2/6 items-center justify-center">
            <p className="text-xl font-bold">SignUp</p>
            <div className="mt-4">
              <div>
                <label htmlFor="username" className="text-white-400">Username</label>
                <input type="text" className="w-full mt-2 text-white-100 p-2 outline-none"
                  placeholder="Username" name="username" required value={Values.username}
                  onChange={change} />
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="text-white-400">Email</label>
                <input type="email" className="w-full mt-2 text-white-100 p-2 outline-none"
                  placeholder="Email" name="email" required value={Values.email}
                  onChange={change} />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="text-white-400">Password</label>
                <input type="password" className="w-full mt-2 text-white-100 p-2 outline-none"
                  placeholder="Password" name="password" required value={Values.password}
                  onChange={change} />
              </div>
              <div className="mt-4">
                <label htmlFor="address" className="text-white-400">Address</label>
                <textarea name="address" id="address" className="w-full mt-2 text-white-100 p-2 outline-none" value={Values.address} onChange={change} />
              </div>
              <div className="mt-4">
                <button className="w-full bg-green-900 text-white font-semibold py-2 rounded hover:bg-white hover:text-black"
                  onClick={submit}>
                  SignUp
                </button>
              </div>
              <p className="flex mt-4 items-center justify-center text-white-200 font-semibold">Or</p>
              <p className="flex mt-4 items-center justify-center text-white-500 font-semibold">
                Already have an account? &nbsp;
                <Link to="/login" className="hover:text-blue-500">
                  <u>LogIn</u>
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
