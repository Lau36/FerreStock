import React, { useState } from "react";
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { login } from "../api/api";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    
}

  const handleSubmit = async () => {
    try {
        const response = await login(username, password);

        if (response.status === 200) {
          
            Swal.fire({
                icon: 'success',
                title: 'Login exitoso',
                text: '¡Has iniciado sesion correctamente!',
            }).then((result) => {
                if (result.isConfirmed) {
                    setUsername('');
                    setPassword('');
                    localStorage.setItem('token', response.data.token);
                    navigate("/Home");
                    sessionStorage.setItem("email", response.data.email);
                    sessionStorage.setItem("id", response.data.user_id);

          console.log(sessionStorage.getItem("id"))
                }
            });
        } else {
            throw new Error('Error al iniciar sesion');
        }
    } catch (error) {
        console.error('Error al iniciar sesion:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al iniciar sesion. Por favor, intenta nuevamente más tarde.',
        });
    }
}

  return (
    <section id="pantalla-dividida" className='pantalla-dividida'>
      <div className='izquierda-login'>
        <div className='login-container'>
          <div className='login-form'>
            {/* Título del formulario */}
            <h2 className='login-title'>Iniciar Sesión</h2>
            {/* Campo de entrada para el correo electrónico */}
            <div className='form-group'>
              <input
                className='textfield'
                type="text"
                id="email"
                placeholder="Correo electrónico"
                value={username}
                onChange={(e) => handleInputChange(e, setUsername)}
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
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
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
            <button type="submit" className='login-button' onClick={handleSubmit}>
              Iniciar Sesión
            </button>
            <div className='register-link'>
              <a href="/Registro">¿No tienes tu otra sede registrada? Regístrala</a>
            </div>
          </div>
        </div>
      </div>
      <div className='derecha-login'>
        <div className='logo'>
          <img src="../Resources/CompanyLogo.png" alt="Logo de la empresa" />
        </div>
      </div>
    </section>
  );
}

export default Login;