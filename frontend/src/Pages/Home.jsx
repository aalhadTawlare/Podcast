import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div className="bg-green-100 px-12 h-screen flex flex-col justify-center">
      <div className="flex items-center justify-between gap-4">
        <div className="w-full lg:w-5/6">
        <h1 className='text-4xl md:text-6xl lg:text-8xl text-center font-bold lg:text-start'>Create and Listen the 
        <p className='flex items-end justify-center lg:justify-start'>P<span><img className='h-10 md:h-12 lg:h-20 mx-2' src="headphones_2113324.png" alt="" /></span>dcast</p>
        </h1>
        </div>
        <div className="hidden lg:block w-1/6">
        <div className="py-3 border border-black text-xl font-semibold rounded-full text-center -rotate-90 bg-white">Scroll Down</div></div>
      </div>
      <div className="mt-12 w-full items-center justify-between flex flex-col lg:flex-row">
        <div className='flex flex-col items-center justify-center'>
          <p className='text-xl font-semibold'>Listen to the most popular podcasts on just one platform {" "}<b>-PODCASTER</b></p>
        <Link className='px-6 py-4 bg-green-900 text-white font-semibold rounded-full mt-8' to="/login">Login to Listen</Link>
        </div>
        <div className='mt-8 lg:mt-0'>
          <p className='text-zinc-600 font-bold text-center lg:text-end'>Our app contains more than 200 podcasts for you</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home