import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div>
      <LoginForm onSubmit={(data) => console.log(data)} />
    </div>
  );
};

export default LoginPage;
