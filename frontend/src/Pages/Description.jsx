import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { playerActions } from '../store/player';

const Description = () => {
  const [data, setData] = useState([]); // Default to an empty array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch  =useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { id } = useParams(); // Extract category from the URL
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const navigate = useNavigate(); // Navigation hook for redirection
  const handlePlay = (e) =>{
    if(isLoggedIn)
    {
      e.preventDefault();
    dispatch(playerActions.setDiv())
    dispatch(playerActions.changeImage(`http://localhost:3001/${items.frontImage}`))
    dispatch(playerActions.changeSong(`http://localhost:3001/${items.audiofile}`))
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/get-podcasts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data || []); // Ensure data is an array
      } catch (err) {
        setError('Failed to fetch podcasts. Please try again later.');
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  return (
    <div className='px-4 lg:px-12 py-4 h-auto flex flex-col md:flex-row items-start justify-between gap-4'>
        {data && <>
        <div className='w-2/6 flex items-center justify-center md:justify-start md:items-start'>
            <img src={`http://localhost:3001/${data.frontImage}`} alt="/" className='rounded w-full size-[50vh] object-cover'/>
        </div>
        <div className="w-4/6">
        <div className="text-4xl font-semibold">{data.title}</div>
        <h4 className='mt-4'>{data.description}</h4>
        <div className="mt-2 bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center">
            {data.category.categoryname}
        </div>
        <Link 
            to={isLoggedIn ? "#" : "/signup"} 
            className='bg-green-900 text-white px-4 py-2 rounded mt-2 flex items-center justify-center hover:bg-green-800 transition-all duration-300'
            onClick={handlePlay}
          >
            Play Now
          </Link>
        </div>
        </>}
    </div>
  )
}

export default Description