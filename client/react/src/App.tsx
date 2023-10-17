import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import {  
  CallComposite, 
  fromFlatCommunicationIdentifier, 
  useAzureCommunicationCallAdapter 
} from '@azure/communication-react';
import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

const App = () => { 
  const url = new URLSearchParams(window.location.search)
  const name = url.get('name')
  const email = url.get('email')
  const [displayName, setDisplayName] = useState(name);
  const [userEmail,setEmailId] = useState(email)
  const [userId, setUserId] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState(true);
  

  const credential = useMemo(() => {
    if (token) {
      return new AzureCommunicationTokenCredential(token)
    }
    return;
    }, [token]);

  const callAdapterArgs = useMemo(() => {
    if (userId && credential && displayName && teamsMeetingLink) {
      
      return {
        userId: fromFlatCommunicationIdentifier(userId) as CommunicationUserIdentifier,
        displayName,
        credential,
        locator: { meetingLink: teamsMeetingLink },
      }
    }
    return {};
  }, [userId, credential, displayName, teamsMeetingLink]);
  
  const callAdapter = useAzureCommunicationCallAdapter(callAdapterArgs);
  
  useEffect(() => {
    console.log(1)
    if (loggedIn) {
      console.log(2)
    const init = async () => {
      setMessage('Getting ACS user');
      //Call Azure Function to get the ACS user identity and token
      const res = await fetch(process.env.REACT_APP_ACS_USER_FUNCTION as string);
      const user = await res.json();
      setUserId(user.userId);
      setToken(user.token);

      setMessage('Getting Teams meeting link...');
      //Call Azure Function to get the meeting link
      const resTeams = await fetch(`${process.env.REACT_APP_TEAMS_MEETING_FUNCTION}?userEmail=${userEmail}`);
      const link = await resTeams.text();
      setTeamsMeetingLink(link);
      console.log('Teams meeting link', link);
    }
    init();}
  }, [loggedIn]);


  const handleLogin = () => {
    setLoggedIn(true);
  };

  
  if (callAdapter&&loggedIn) {
    return (
      <div className="header">
        <h1>Inteltion Contact Customer Service</h1>
        <div className="wrapper">
    
          <CallComposite
            adapter={callAdapter}
          />
        </div>
      </div>
    );
  }
  // if (!credential) {
  //   return <>Failed to construct credential. Provided token is malformed.</>;
  // }
  if (message) {
    return <div className="message">{message}</div>;
  }

    return (
      <main>
      {/* <div id="homePage">
        <h1 className='login-header'>Login</h1>
      
        <div className='container'>
          <label className='username-header'>
            Username:
            <input 
              className='input-box' 
              id="username"
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
            />
            </label>
        
          <button onClick={handleLogin} className='login-button'>Sign in</button>
          </div>
      </div> */}
      </main>
    
  
  
)
};

export default App;