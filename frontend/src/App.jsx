import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatRoom from "./pages/room";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import { SnackbarProvider } from 'notistack';
import RoomSelection from "./pages/RoomSelection";

const App = () => {
  return (
    <SnackbarProvider>
      <Routes>
        <Route path="chat/:roomNum" element={<ChatRoom />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="chat" element={<RoomSelection />} />
      </Routes>
    </SnackbarProvider> 
  )
   
}

export default App


