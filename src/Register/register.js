import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createsede } from "../api/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "../Resources/CompanyLogo.png";
import "./register.css";
import LoadingPage from "../Components/LoadingPage";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [manager, setManager] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await createsede(
        username,
        email,
        password,
        address,
        contact,
        manager
      );

      if (response.status === 201) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "¡Tu sede ha sido registrada correctamente!",
        }).then((result) => {
          navigate("/");
          // Limpiar los campos del formulario después de aceptar el Swal
          if (result.isConfirmed) {
            setUsername("");
            setEmail("");
            setPassword("");
            setAddress("");
            setContact("");
            setManager("");
          }
        });
      } else {
        throw new Error("Error al registrar la sede");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error al registrar la sede:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al registrar la sede. Por favor, intenta nuevamente más tarde.",
      });
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="container">
          <div className="img-container">
            <img src={CompanyLogo} alt="Descripción de la imagen" />
          </div>
          <div className="register-container">
            <div className="form-container">
              <h2>REGISTRAR NUEVA SEDE</h2>
              <div className="line"></div>
              <div className="form">
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="sede" className="form-label">
                        Nombre de la sede
                      </label>
                      <input
                        type="text"
                        className="form-control-register"
                        id="sede"
                        placeholder="Nombre de la sede"
                        value={username}
                        onChange={(e) => handleInputChange(e, setUsername)}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="encargado" className="form-label">
                        Nombre del encargado
                      </label>
                      <input
                        type="text"
                        className="form-control-register"
                        id="encargado"
                        placeholder="Nombre del encargado"
                        value={manager}
                        onChange={(e) => handleInputChange(e, setManager)}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="correo" className="form-label">
                        Correo electronico
                      </label>
                      <input
                        type="email"
                        className="form-control-register"
                        id="correo"
                        placeholder="Correo electronico"
                        value={email}
                        onChange={(e) => handleInputChange(e, setEmail)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="celular" className="form-label">
                        Numero de celular
                      </label>
                      <input
                        type="text"
                        className="form-control-register"
                        id="celular"
                        placeholder="Numero de celular"
                        value={contact}
                        onChange={(e) => handleInputChange(e, setContact)}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="direccion" className="form-label">
                        Dirección
                      </label>
                      <input
                        type="text"
                        className="form-control-register"
                        id="direccion"
                        placeholder="Direccion"
                        value={address}
                        onChange={(e) => handleInputChange(e, setAddress)}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="contrasena" className="form-label">
                        Contraseña
                      </label>
                      <div className="input-with-icon">
                        <input
                          type={mostrarContrasena ? "text" : "password"}
                          className="form-control-register"
                          id="contrasena"
                          placeholder="Contraseña"
                          value={password}
                          onChange={(e) => handleInputChange(e, setPassword)}
                        />
                        <button
                          type="button"
                          className="toggle-password"
                          onClick={toggleMostrarContrasena}
                        >
                          {mostrarContrasena ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Registrarse
              </button>
              <p>
                <a href="/">Iniciar sesión</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
