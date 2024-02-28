import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make Axios POST request to your API endpoint
    axios.post('http://127.0.0.1:8000/api/users', formData)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        // You might want to redirect or perform other actions upon successful signup
      })
      .catch((error) => {
        // Handle error response
        console.error('Error:', error.response.data);
        // Update messages state with error messages
        setMessages([error.response.data.message]);
      });
  };

  return (
    <div className="container mx-auto my-10">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
        <div>
          <h1 className="text-2xl font-bold mb-4">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full border-1px-solid-ccc p-2 mb-2"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border-1px-solid-ccc p-2 mb-2"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border-1px-solid-ccc p-2 mb-2"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              className="w-full border-1px-solid-ccc p-2 mb-4"
              value={formData.password2}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Sign up
            </button>
            <div className="mt-4">
              <p>
                Do you have an account? <a href="/login" className="text-blue-500">Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
