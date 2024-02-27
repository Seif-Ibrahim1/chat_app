import React from 'react';
import LogoutButton from './LogoutButton';

const Navbar = ({ roomNum }) => {
  return (
    <nav className="bg-blue-500 p-4 mb-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Chat Room {roomNum}</h1>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
