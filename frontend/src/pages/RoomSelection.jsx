import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomSelection = () => {
  const [roomName, setRoomName] = useState('');
  const navigate  = useNavigate();
  
  useEffect(() => {
    // Check if username is present, otherwise navigate to login
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleEnterRoom = () => {
    navigate(`/chat/${roomName}`);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleEnterRoom();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mb-4 text-xl font-semibold">What chat room would you like to enter?</div>
      <input
        id="room-name-input"
        type="text"
        className="mb-4 p-2 border border-gray-300"
        size="100"
        value={roomName}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      <button
        id="room-name-submit"
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleEnterRoom}
      >
        Enter
      </button>
    </div>
  );
};

export default RoomSelection;
