import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth'; // Ensure correct import path

const Header = () => {
    const [profileData, setProfileData] = useState(null); // Initialize as null
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/v1/get-user-info", { headers });
                setProfileData(response.data);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
                // Handle error (optional): for example, redirect to login if unauthorized
            }
        };
        fetchProfileData();
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(authActions.logout()); // Use the correct action name
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className='bg-green-900 rounded py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between px-4 lg:px-12'>
            {profileData ? (
                <>
                    <div className="flex flex-col items-center md:items-start">
                        <p className='text-zinc-300'>Profile</p>
                        <h1 className='text-3xl md:text-4xl lg:text-5xl text-zinc-100 font-bold text-center'>
                            {profileData.username}
                        </h1>
                        <p className='text-zinc-300 mt-1'>{profileData.email}</p>
                    </div>
                    <div>
                        <button className='bg-white px-4 py-2 rounded text-zinc-800 font-semibold hover:shadow-x1 transition-all duration-300'
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-white">Loading...</p>
            )}
        </div>
    );
};

export default Header;
