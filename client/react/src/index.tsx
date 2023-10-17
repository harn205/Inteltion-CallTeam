// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App'; 
// import Login from './test';
// // import { initializeIcons } from '@fluentui/react/lib/Icons';
// import './index.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';


// ReactDOM.render(
//   <div className="wrapper">
//     <App />
//   </div>,
//   document.getElementById('root')
// );

// // initializeIcons();


// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <div className="wrapper">
    <div className='logo-container'>
          <img src="https://www.inteltion.com/wp-content/uploads/2021/11/logo-inteltion.svg" className="logo"/>
    </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </div>
  </BrowserRouter>
  ,
  document.getElementById('root')
);
