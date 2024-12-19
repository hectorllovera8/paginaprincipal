import React from 'react';
import FormularioLogin from '../Components/FormularioLogin';
import FONDO from '../assets/FONDO.jpg';

const Login = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${FONDO})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '130vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FormularioLogin />
    </div>
  );
};

export default Login;
