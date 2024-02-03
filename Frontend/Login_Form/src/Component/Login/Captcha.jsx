// Captcha.js

import React, { useState } from 'react';
import './Captcha.css';
import { IoReloadCircle } from "react-icons/io5"
import { Button } from 'react-bootstrap';
const Captcha = () => {
  const [captchaText, setCaptchaText] = useState(generateRandomString(6));
  const [userInput, setUserInput] = useState('');

  const refreshCaptcha = () => {
    setCaptchaText(generateRandomString(6));
    setUserInput('');
  };

  const checkCaptcha = () => {
    // Add your logic to check if the user input is correct
    // For simplicity, let's assume it's correct if it matches the captchaText
    if (userInput === captchaText) {
      alert('Captcha is correct!');
      // Add further actions if the captcha is correct
    } else {
      alert('Captcha is incorrect. Please try again.');
      // Add further actions if the captcha is incorrect
    }
    refreshCaptcha(); // Refresh the captcha after checking
  };

  return (
    <div className="captcha-container">
      <label htmlFor="captcha-input">Enter the text shown:</label>
      <div style={{display:"flex",flexDirection:"row",gap:"10px"}} className='pb-3'>
        <div className="captcha">
        <span>{captchaText}</span>
        </div>
        <Button onClick={refreshCaptcha}><IoReloadCircle /></Button>
        </div>
      <input
        type="text"
        id="captcha-input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={checkCaptcha}>Submit</button>
    </div>
  );
};

const generateRandomString = (length) => {
  // Function to generate a random string of a given length
  // Add your own logic if you need a more complex string generation
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default Captcha;
