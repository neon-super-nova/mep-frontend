import './App.css';
import LoginButton from './components/ui-basic-reusables/buttons/button-login'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import LabelLogin from './components/ui-basic-reusables/labels/label-input-login'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import MyAppleSigninButton from './components/ui-basic-reusables/buttons/apple-bougie-sign-in-button';
import FacebookLogin from '@greatsumini/react-facebook-login';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; 

  const handleLogin = () => {
    console.log('Login button clicked!');
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="app-container">
              <div className="left-block">
                <p>This is the left block, which takes up 7/12 of the width.</p>
              </div>
              <div className="right-block">
                <h1>Login</h1>
                <div style={{ marginBottom: '20px' }}></div> 
                <LabelLogin
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
                <div style={{ marginBottom: '10px' }}></div> 
                <LabelLogin
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <div style={{ marginBottom: '10px' }}></div> 
                <Link to="/dashboard">
                  <LoginButton onPress={handleLogin} />
                </Link>
                <div style={{ marginBottom: '40px' }}></div> 
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
                <div style={{ marginBottom: '10px' }}></div> 
                <FacebookLogin
                  appId="1088597931155576"
                  onSuccess={(response) => {
                    console.log('Login Success!', response);
                  }}
                  onFail={(error) => {
                    console.log('Login Failed!', error);
                  }}
                  onProfileSuccess={(response) => {
                    console.log('Get Profile Success!', response);
                  }}
                  className="btn-fb-signin"
                >
                  <FontAwesomeIcon icon={faFacebook} style={{ marginRight: '8px' }} />
                    Continue with Facebook
                </FacebookLogin>
                <div style={{ marginBottom: '10px' }}></div> 
                <MyAppleSigninButton
                  onPress={() => {
                    console.log('Apple Sign In button clicked!');
                  }}
                  className="btn-apple-signin"
                />
              </div>
            </div>
          </header>
        </div>
        <Routes>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;