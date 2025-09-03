import React from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <div>
      <RegisterForm onSubmit={(data) => console.log(data)} />
    </div>
  );
};

export default RegisterPage;
