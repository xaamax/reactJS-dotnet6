import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import './style.css';

import api from "../../services/api";

import logoImage from '../../assets/logo.svg';
import padlock from '../../assets/padlock.png';

export default function Login(){
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(e){
    e.preventDefault();

    const data = {
      userName,
      password
    };

    try {
      const response = await api.post('api/auth/v1/signin', data);
      localStorage.setItem('userName', userName);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    } catch (error) {
      alert("Login Failed! Try again.");
    }
    navigate('/books');
  }

  return (
      <div className="login-container">
        <section className="form">
          <img src={logoImage} alt="Erudio Logo" />
          <form onSubmit={login}>
            <h1>Access your acount</h1>
            <input placeholder="Username" value={userName} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="button" type="submit">Login</button>
          </form>
        </section>

        <img src={padlock} alt="Login" />
      </div>
  )
}