import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  return (
    <div>
      <LoginForm redirectTo={redirectTo} />
    </div>
  );
};

export default LoginPage;