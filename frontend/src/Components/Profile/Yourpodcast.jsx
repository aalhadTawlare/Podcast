import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PodcastCard from '../PodcastCard/PodcastCard';

const Yourpodcast = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Retrieve token from localStorage
  const token = localStorage.getItem('token'); // Adjust the key based on how you store it

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const response = await axios.get("http://localhost:3001/api/v1/get-user-podcasts", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setData(response.data.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='px-4 lg:px-12 my-4'>
      <div className="flex items-center justify-between gap-4">
        <h1 className='text-xl font-semibold md:font-bold'>Your Podcasts</h1>
        <Link to='/add-podcast' className='px-4 py-2 bg-zinc-800 text-white rounded font-semibold'>
          Add Podcast
        </Link>
      </div>
      {error && <div className="text-red-500">Error: {error}</div>}
      <div className="w-full my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.length > 0 ? (
          data.map((items, i) => (
            <div key={i}>
              <PodcastCard items={items} />
            </div>
          ))
        ) : (
          <div>No podcasts found.</div>
        )}
      </div>
    </div>
  );
};

export default Yourpodcast;
