import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PodcastCard from '../Components/PodcastCard/PodcastCard';

const CategoriesPage = () => {
  const [data, setData] = useState([]); // Default to an empty array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { cat } = useParams(); // Extract category from the URL
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const navigate = useNavigate(); // Navigation hook for redirection

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/category/${cat}`,
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
  }, [cat, token, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className='px-4 py-4 lg:px-12'>
      <h1 className='text-xl font-semibold'>{cat}</h1>
      <div className="w-full my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <PodcastCard key={item._id} items={item} /> // Ensure each item has a unique key
          ))
        ) : (
          <div>No podcasts found.</div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
