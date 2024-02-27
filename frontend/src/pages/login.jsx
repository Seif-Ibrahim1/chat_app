import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make Axios POST request to your API endpoint
      const response = await axios.post(`http://127.0.0.1:8000/api/token/`, formData);

      // Save the access token and refresh token in local storage
      localStorage.setItem('access_token', response.data.access);
      
      const refreshResponse = await axios.post(`http://127.0.0.1:8000/api/token/refresh/`, {
        refresh: response.data.refresh,
      });

      // Save the refresh token in local storage
      localStorage.setItem('refresh_token', refreshResponse.data.access);
      
      localStorage.setItem('username', formData.username);

      navigate('/chat');
    } catch (error) {
      // Handle error response
      console.error('Error:', error.response.data);
      enqueueSnackbar('Error logging in', { variant: 'error' });
    }
  };

  return (
    <div className="container mx-auto my-10">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <div>
          <h1 className="text-2xl font-bold mb-4">Log in</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full border border-solid border-gray-300 p-2 mb-2 rounded-md"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-solid border-gray-300 p-2 mb-4 rounded-md"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
            <div className="mt-4">
              <p className="text-base">
                Not registered? <a href="/signup" className="text-blue-500">Create an account</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
