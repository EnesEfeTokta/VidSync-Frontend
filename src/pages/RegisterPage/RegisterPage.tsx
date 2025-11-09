import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm";
import "../../App.css";
import './RegisterPageStyles.css';

const RegisterPage: React.FC = () => {
  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">Create Account</h1>
        <p className="login-subtitle">We can't wait to join the adventure!</p>
        <RegisterForm />
        <div className="separator">OR</div>
        <div className="social-logins">
          <button className="social-login-btn">
            Continue with Google
          </button>
          <button className="social-login-btn">
            Continue with GitHub
          </button>
        </div>
        <p className="signup-link">
          Already have an account?{' '}
          <Link to="/login">Log In</Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;