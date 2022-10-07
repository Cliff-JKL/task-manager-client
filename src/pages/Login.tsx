import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

interface ILoginProps {
  isLoggedIn: boolean;
}

const Login = (props: ILoginProps) => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '50px 0 0 0' }}>
    {
        props.isLoggedIn
          ? <LoginForm />
          : <RegisterForm />
      }
  </div>
);

export default Login;
