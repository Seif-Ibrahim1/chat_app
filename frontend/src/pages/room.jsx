import { w3cwebsocket as W3CWebSocket } from 'websocket';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LogoutButton from '../component/LogoutButton';
import Navbar from '../component/Navbar';

const ChatRoom = () => {
  const [chatLog, setChatLog] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const { roomNum } = useParams();
  const authToken = localStorage.getItem('access_token');
  const username = localStorage.getItem('username');
  const chatSocket = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${roomNum}/?token=${authToken}`);
  const navigate = useNavigate()

  useEffect(() => {
    if (!username) {
      navigate('/login');
      return;
    }

    // Set up WebSocket listeners
    chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);

      fetch('http://127.0.0.1:7000/api/getLang', {
        method: 'POST',
        body: JSON.stringify({ text: data.message, lang: 'en' }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      })
        .then((response) => response.json())
        .then((translatedData) => {
          setChatLog((prevLog) => [
            ...prevLog,
            {
              username: data.username,
              message: translatedData.text,
            },
          ]);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    chatSocket.onclose = (e) => {
      console.error('Chat socket closed unexpectedly');
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      chatSocket.close();
    };
  }, [navigate, roomNum, authToken, username]);

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const sendMessage = () => {
    // Include the 'username' along with the 'message' when sending data to the server
    const messageData = {
      message: messageInput,
      username: username, // Include the username obtained from the UserContext
    };

    chatSocket.send(JSON.stringify(messageData));
    setMessageInput('');
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && messageInput.trim() !== '') {
      sendMessage();
    }
  };

  return (
    <>
      <Navbar roomNum={roomNum} />
    
      <div className="container mx-auto my-10">
        
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
          <div
            id="chat-log"
            className={`block w-full h-200px overflow-y-auto cursor-default border border-1px-solid-ccc p-5 ${
              chatLog.length === 0 ? 'text-gray-500 italic' : ''
            }`}
          >
            {chatLog.length === 0 ? 'No messages yet' : null}
            {chatLog.map((entry, index) => (
              <div key={index}>
                <span className="font-bold">{entry.username}:</span>
                <span>{entry.message}</span>
              </div>
            ))}
          </div>
          <br />
          <input
            id="chat-message-input"
            type="text"
            className="w-full border border-1px-solid-ccc p-2"
            size="100"
            value={messageInput}
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
          />
          <br />
          <button
            id="chat-message-submit"
            type="button"
            className="bg-blue-500 text-white p-2 rounded-md mt-2"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
