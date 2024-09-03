import axios from 'axios';
import React, { useState, useEffect } from 'react';

const InputPodcast = () => {
  const [frontImage, setfrontImage] = useState(null);
  const [dragImg, setDragImg] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [token, setToken] = useState('');

  useEffect(() => {
    // Retrieve the token from local storage or any other storage mechanism
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error('No authentication token found. Please log in.');
    }
  }, []);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setfrontImage(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragImg(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragImg(false);
  };

  const handleDropImg = (e) => {
    e.preventDefault();
    setDragImg(false);
    const file = e.dataTransfer.files[0];
    setfrontImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAudioFile = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
  };

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmitPodcast = async () => {
    const data = new FormData();
    data.append('title', inputs.title);
    data.append('description', inputs.description);
    data.append('category', inputs.category);
    if (audioFile) data.append('audiofile', audioFile);
    if (frontImage) data.append('frontImage', frontImage);
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const res = await axios.post('http://localhost:3001/api/v1/add-podcast', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      alert(res.data.message);
    } catch (error) {
      console.error('Error during podcast submission:', error.response?.data?.message || error.message);
    }
  };
  

  return (
    <div className="my-4 px-4 lg:px-12">
      <h1 className="text-2xl font-semibold">Create Your Podcast</h1>
      <div className="mt-5 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="w-full lg:w-2/6 flex items-center justify-center lg:justify-start">
          <div
            className="size-[20vh] lg:size-[60vh] flex items-center justify-center hover:bg-slate-50 transition-all duration-300"
            style={{ border: '1px dashed black' }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDropImg}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              accept="image/*"
              id="file"
              name="frontImage"
              className="hidden"
              onChange={handleChangeImage}
            />
            {frontImage ? (
              <img
                src={URL.createObjectURL(frontImage)}
                alt="thumbnail"
                className="h-[100%] w-[100%] object-cover"
              />
            ) : (
              <label
                htmlFor="file"
                className={`text-xl h-[100%] w-[100%] hover:cursor-pointer flex items-center justify-center ${
                  dragImg ? 'hover:bg-blue-200' : ''
                } hover:bg-zinc-200 transition-all duration-300`}
              >
                <span className="text-center">
                  Drag and Drop the thumbnail or Click to browse
                </span>
              </label>
            )}
          </div>
        </div>
        <div className="w-full lg:w-4/6">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title for your podcast"
              className="mt-4 px-4 py-2 outline-none border border-zinc-800 rounded"
              value={inputs.title}
              onChange={onChangeInputs}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Description of your podcast"
              className="mt-4 px-4 py-2 outline-none border border-zinc-800 rounded"
              value={inputs.description}
              onChange={onChangeInputs}
            />
          </div>
          <div className="flex mt-4">
            <div className="flex flex-col w-2/6">
              <label htmlFor="audiofile">Select Audio</label>
              <input
                type="file"
                accept=".mp3,.wav,.m4a,.ogg"
                id="audiofile"
                name="audiofile"
                className="mt-4"
                onChange={handleAudioFile}
              />
            </div>
            <div className="flex flex-col w-2/6">
              <label htmlFor="category">Select Category</label>
              <select
                name="category"
                id="category"
                className="border border-zinc-900 rounded mt-4 outline-none px-4 py-2"
                value={inputs.category}
                onChange={onChangeInputs}
              >
                <option value="">Select Category</option>
                <option value="Comedy">Comedy</option>
                <option value="Romantic">Romantic</option>
                <option value="Horror">Horror</option>
                <option value="Devotional">Devotional</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
          </div>
          <div className="mt-8 lg:mt-6 flex">
            <button
              className="bg-zinc-900 w-full text-white rounded px-8 py-2 font-semibold hover:bg-zinc-800 transition-all duration-300"
              onClick={handleSubmitPodcast}
            >
              Create Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPodcast;
