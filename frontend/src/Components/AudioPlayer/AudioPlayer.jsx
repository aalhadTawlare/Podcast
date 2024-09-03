import React, { useEffect, useRef, useState } from 'react'
import { FaForward,FaBackward } from "react-icons/fa6";
import { FaPlay,FaPause } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { playerActions } from '../../store/player';
const AudioPlayer = () => {
  const [isSong, setisSong] = useState(false)
  const [Duration, setDuration] = useState(0)
  const [currentTime, setcurrentTime] = useState()
  const dispatch = useDispatch();
  const PlayerDivState = useSelector((state)=>state.player.isPlayerDiv);
  const songPath = useSelector((state)=>state.player.songPath);
  const img = useSelector((state)=>state.player.img);

  const audioRef = useRef();
  //const duration = audioRef.current.duration;
  const formatTime = (time) =>{
    const minute = Math.floor(time/60);
    const seconds = Math.floor(time%60);
    return `${minute}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const closeAudioPlayerDiv = (e) =>{
    e.preventDefault();
    dispatch(playerActions.closeDiv())
    dispatch(playerActions.changeImage(""))
    dispatch(playerActions.changeSong(""))
  }
  const handlePlayPodcast = () =>{
    setisSong(!isSong)
    if(!isSong)
    audioRef.current.play();
    else
    audioRef.current.pause();
  };
  const handleTimeUpdate = () =>{
    if(audioRef.current)
    {
      setcurrentTime(audioRef.current.currentTime);
    }
  }
  const handleLoadMetadata = () =>{
    if(audioRef.current)
    {
       setDuration(audioRef.current.duration);
    }
  }
  const backward = () =>{
    if(audioRef.current){
      let newTime = Math.max(currentTime-10,0);
      audioRef.current.currentTime = newTime;
      setcurrentTime(newTime);
    }
  }
  const forward = () =>{
    if(audioRef.current){
      let newTime = Math.min(currentTime+10,Duration);
      audioRef.current.currentTime = newTime;
      setcurrentTime(newTime);
    }
  }
  const handleSeek = (e) =>{
    if(audioRef.current){
      const newTime = (e.target.value/100)*Duration;
      audioRef.current.currentTime = newTime;
      setcurrentTime(newTime);
    }
  };
  useEffect(()=>{
    handlePlayPodcast();
    const currentAudio = audioRef.current;
    if(currentAudio){
      currentAudio.addEventListener("timeupdate",handleTimeUpdate);
      currentAudio.addEventListener("loadedmetadata",handleLoadMetadata);
    }
  },[songPath])
  return (
    <div className={`${PlayerDivState ? 'fixed':'hidden'} bottom-0 left-0 w-[100%] bg-zinc-900 text-zinc-300 px-4 rounded px-4 rounded flex items-center gap-4`}>
    <div className="hidden md:block w-1/3">
       <img src={img} alt="" 
       className='size-12 rounded-full object-cover'/>
    </div>
    <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
    <div className="w-full flex items-center justify-center gap-4 text-xl mt-3">
        <button onClick={backward}><FaBackward /></button>
        <button onClick={handlePlayPodcast}>{isSong ? <FaPause/> : <FaPlay/>}</button>
        <button onClick={forward}><FaForward/></button>
        </div>
        <div className="w-full flex items-center justify-center mt-3">
          <input type="range" 
          min='0' 
          max='100' 
          className='w-full hover:cursor-pointer'
          value={(currentTime / Duration)*100 || 0}
          onChange={handleSeek}
          />
        </div>
        <div className="w-full flex items-center justify-between text-sm">
          <span>{formatTime(currentTime)}</span>
          <span></span>
          <span>{formatTime(Duration)}</span>
        </div>
        </div>
        <div className='w-1/3 flex items-center justify-end'>
           <button onClick={closeAudioPlayerDiv}>
            <ImCross/>
           </button>
        </div>
        <audio ref={audioRef} src={songPath}></audio>
    </div>
  )
}

export default AudioPlayer