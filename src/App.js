import React, { useState } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./page/login";
import Article from './page/article';
import Signup from './page/signup';


function App() {
  const [user, setUser]= useState("");
  return (
    <div>
    <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/article" element={user?<Article user={user} />:<Navigate to="/" replace={true}/>} />
        <Route path="/register" element={<Signup setUser={setUser} />} />
    </Routes>
    </div>
  )
}

export default App