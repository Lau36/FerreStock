import React, { useState } from "react";
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section id="pantalla-dividida" className='pantalla-dividida'>
      <div className='izquierda-login'>
        <div className='login-container'>
          <form className='login-form'>
            {/* Título del formulario */}
            <h2 className='login-title'>Iniciar Sesión</h2>
            {/* Campo de entrada para el correo electrónico */}
            <div className='form-group'>
              <input
                className='textfield'
                type="text"
                id="email"
                placeholder="Correo electrónico"
                required
              />
              
            </div>

            {/* Campo de entrada para la contraseña */}
            <div className='form-group'>
              <input
                className='textfield'
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Contraseña"
                required
              />
              
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className='toggle-password-button'
              >
               <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
              </button>
            </div>

            {/* Botón para enviar el formulario */}
            <button type="submit" className='login-button'>
              Iniciar Sesión
            </button>
            <div className='register-link'>
              <a href="#">¿No tienes tu otra sede registrada? Regístrala</a>
            </div>
          </form>
        </div>
      </div>
      <div className='derecha-login'>
        <div className='logo'>
          <img src="/images/ferremax.png" alt="Logo de la empresa" />
        </div>
      </div>
    </section>
  );
}

export default Login;
