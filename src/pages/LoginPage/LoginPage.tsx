import React from "react";
import { useLocation, Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import "../../App.css";
import './LoginPageStyles.css';

const LoginPage: React.FC = () => {
  const location = useLocation();

  const isRegisterPage = location.pathname.includes('/register');

  const pageContent = {
    title: isRegisterPage ? "Create Account" : "Welcome Back!",
    subtitle: isRegisterPage ? "We're excited to have you join the adventure!" : "Great to see you again!",
    formType: isRegisterPage ? "register" : "login",
    redirect: {
      text: isRegisterPage ? "Already have an account? " : "Don't have an account? ",
      linkText: isRegisterPage ? "Sign In" : "Sign Up",
      to: isRegisterPage ? "/login" : "/register",
    }
  };

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">{pageContent.title}</h1>
        <p className="login-subtitle">{pageContent.subtitle}</p>

        <LoginForm {...({ formType: pageContent.formType, redirectTo } as unknown as React.ComponentProps<typeof LoginForm>)} />

        <p className="signup-link">
          {pageContent.redirect.text}
          <Link to={pageContent.redirect.to}>
            {pageContent.redirect.linkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
