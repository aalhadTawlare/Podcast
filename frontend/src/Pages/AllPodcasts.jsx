import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PodcastCard from '../Components/PodcastCard/PodcastCard';

const AllPodcasts = () => {
    const [Data,setData]=useState();
  useEffect(() => {
    const fetch = async()=>{
      const response = await axios.get("http://localhost:3001/api/v1/get-podcasts");
      console.log(response)
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div>
        <div className="w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Data && Data.map((items,i)=><div key={i}>
                <PodcastCard items={items}/>{" "}
            </div>)}
        </div>
    </div>
  )
}

export default AllPodcasts