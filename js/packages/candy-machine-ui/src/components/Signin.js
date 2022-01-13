import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from '../components/SessionContext';

    
export default function Signin() {
  const [session, setSession] = useSessionContext();
  const navigate = useNavigate();

  const handleLogin = () => {
    setSession({...session, isAuthenticated: true});
    navigate(session.redirectPath);
  }

  return (
    <button onClick={handleLogin}>Login</button>
    
    );
}

