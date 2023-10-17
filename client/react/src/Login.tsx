import './App.css';
import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();


  const handleLogin = () => {
    // Add your logic to validate login here
    // For simplicity, this example always logs in the user
    if (displayName){
    setLoggedIn(true)
    console.log(displayName)
    }
    if (displayName && email)
    navigate(`/app?name=${displayName}&email=${email}`);
    };



    if (loggedIn) {
      return(
        <main>
      <div id="homePage-after">
        <h1 className='login-header'>Agent Email</h1>
        <div className='container'>
          <label className='email'>
            Email:
            <input 
              className='input-box'
              placeholder="Input email..." 
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </label>
          <button onClick={handleLogin} className='login-button'>Call</button>
          </div>
      </div>
      </main>
      )
    }

    return (
      <main>
      <div id="homePage">
        <h1 className='login-header'>Login</h1>
        <div className='container'>
          <label className='username-header'>
            Username:
            <input 
              className='input-box'
              placeholder="Input name..." 
              id="username"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
            </label>
          <button onClick={handleLogin} className='login-button'>Sign in</button>
          </div>
      </div>
      </main>
  
);
};

export default Login;

