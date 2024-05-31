import "../Suppliers/Suppliers.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import logo from "../Resources/logoNavbar.png";
import Navbar from "../Components/Navbar";
import { createsupplier } from "../api/api";



function Suppliers() {
  const [company_name, setCompanyName] = useState("");
  const [contact_name, setContactName] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };


  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await createsupplier(
        company_name,
        contact_name,
        address,
        tel,
        email
      );

      if (response.status === 201) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Ha registrado el proveedor de forma exitosa!",
        }).then((result) => {
          navigate("/");
          // Limpiar los campos del formulario después de aceptar el Swal
          if (result.isConfirmed) {
            setCompanyName("");
            setContactName("");
            setAddress("");
            setTel("");
            setEmail("");
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
        text: "HOcurrió un error al registrar el proveedor, intentalo de nuevo.",
      });
    }
  };
  
  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="logo-Container-products">
          <img
            src={logo}
            alt="Logo de la compañía"
            className="logo-Loading-products rotating"
          />
        </div>
      ) : (
        <div className="form-register-suppliers" >
          <div className="py-3 h-100">
            <div className="py-5 h-100">
              <div className="row justify-content-center align-items-center h-100">
                <div className="col-7 col-lg-7 col-xl-7">
                  <div
                    className="card shadow-2-strong card-registration"
                    style={{ borderRadius: "15px" }}
                  >
                    <div className="card-body p-4 p-md-5">
                      <h2 className="mb-4 pb-2 pb-md-0 mb-md-5">
                        Registro de proveedores
                      </h2>
                      <form>
                        <div className="row">
                          <div className="col-md-6 mb-4 ">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="companyName"
                                className="form-control form-control-lg"
                                value={company_name}
                                onChange={(e) => handleInputChange(e, setCompanyName)}
                              />
                              <label className="form-label" htmlFor="firstName">
                                Nombre de la compañia
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="contactName"
                                className="form-control form-control-lg"
                                value={contact_name}
                                onChange={(e) => handleInputChange(e, setContactName)}
                              />
                              <label className="form-label" htmlFor="lastName">
                                Nombre de contacto
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 mb-4 d-flex align-items-center">
                            <div className="form-outline-address w-100">
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                id="address"
                                value={address}
                                onChange={(e) => handleInputChange(e, setAddress)}
                              />
                              <label
                                className="form-label"
                              >
                                Direccion
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <input
                                type="email"
                                id="emailAddress"
                                className="form-control form-control-lg"
                                value={email}
                                onChange={(e) => handleInputChange(e, setEmail)}
                              />
                              <label
                                className="form-label"
                                htmlFor="emailAddress"
                              >
                                Email
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <input
                                type="tel"
                                id="phoneNumber"
                                className="form-control form-control-lg"
                                value={tel}
                                onChange={(e) => handleInputChange(e, setTel)}
                              />
                              <label
                                className="form-label"
                                htmlFor="phoneNumber"
                              >
                                Numero de telefono
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4 pt-2">
                          <button 
                            className="btn btn-primary btn-lg d-flex align-items-center justify-content-center large-button"
                            type="submit"
                            onClick={handleSubmit}>                    
                            Registrar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Suppliers;
