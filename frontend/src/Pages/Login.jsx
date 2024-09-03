import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import Errorpage from './Errorpage';

const Login = () => {
  const IsLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        setErrorMessage("All entries are required");
      } else {
        const response = await axios.post("http://localhost:3001/api/v1/signin", Values);
        alert("Login successful");
        dispatch(authActions.login());
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        navigate("/profile");
        console.log(response.data.token)
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      {IsLoggedIn ? (
        <Errorpage />
      ) : (
        <div className="h-screen bg-green-200 px-12 py-8 flex items-center justify-center">
          <div className="rounded-lg px-8 py-5 w-full md:3/6 lg:w-2/6">
            <p className="font-bold text-xl">LogIn</p>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="mt-4">
              <div>
                <label htmlFor="username" className="text-white-400">Username</label>
                <input type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                  placeholder="Username" name="username" required value={Values.username}
                  onChange={change} />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="text-white-400">Password</label>
                <input type="password" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                  placeholder="Password" name="password" required value={Values.password}
                  onChange={change} />
              </div>
              <div className="mt-4">
                <button className="w-full bg-green-900 text-white font-semibold py-2 rounded hover:bg-white hover:text-black"
                  onClick={submit}>
                  LogIn
                </button>
              </div>
              <p className="flex mt-4 items-center justify-center font-semibold">Or</p>
              <p className="flex mt-4 items-center justify-center font-semibold">
                Don't have an account? &nbsp;
                <Link to="/signup" className="hover:text-blue-500">
                  <u>SignUp</u>
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
