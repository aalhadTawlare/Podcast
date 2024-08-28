import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const cat = [
    {
      name: "Comedy",
      color: "bg-red-400",
      to: "/categories/Comedy",
      img: "front-view-man-being-ventriloquist.jpg",
    },
    {
      name: "Romantic",
      color: "bg-pink-200",
      to: "/categories/Romantic",
      img: "dark-style-valentines-day-celebration.jpg",
    },
    {
      name: "Horror",
      color: "bg-gray-200",
      to: "/categories/Horror",
      img: "haunted-house-gothic-style.jpg",
    },
    {
      name: "Devotional",
      color: "bg-orange-200",
      to: "/categories/Devotional",
      img: "portrait-indian-woman-celebrating-baisakhi-festival.jpg",
    },
    {
      name: "Spanish",
      color: "bg-yellow-200",
      to: "/categories/Spanish",
      img: "spain-flag-wrinkled-dark-background-3d-render.jpg",
    },     
  ];

  return (
    <div className='h-screen lg:h-[78vh]'>
      <div className="px-4 lg:px-12 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cat.map((items, i) => (
          <Link 
            to={items.to} 
            key={i} 
            className={`rounded px-8 py-4 text-xl font-semibold ${items.color} hover:scale-105 shadow-xl transition-all duration-300 relative h-[22vh] overflow-hidden`}
          >
            <div>{items.name}</div>
            <div className="w-[100%] flex items-center justify-end absolute -bottom-2 -right-2">
              <img src={items.img} alt={items.name} className='rounded rotate-12 h-[15vh] md:h-[17vh] lg:h-[18vh]'/>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
