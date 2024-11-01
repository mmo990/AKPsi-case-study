import React from 'react';
import './Login.css';
import logo from './path_to_logo.svg';  // Replace with actual path
import googleIcon from './path_to_google_icon.svg';  // Replace with actual path

function Login() {
  return (
    <div className="login-page">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="HabitHub Logo" />
          <span>HabitHUB</span>
        </div>
        <nav>
          <a href="#">About us</a>
          <a href="#">Contacts</a>
        </nav>
      </header>

      <div className="login-container">
        <h2>Login</h2>
        <p>Welcome back! Sign in using your social account or email to continue</p>
        <button className="google-signin">
          <img src={googleIcon} alt="Google Logo" />
        </button>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <a href="#" className="signup-link">Signup</a>
      </div>
    </div>
  );
}

export default LogInScreen;