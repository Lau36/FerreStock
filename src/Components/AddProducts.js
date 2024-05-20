import { useState } from "react";
import { addProducts } from "../Services/Products";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import logo from "../Resources/logoNavbar.png";
import "./AddProducts.css";

function AddProducts({ closeModal }) {
  const navigate = useNavigate();
  const [dataProduct, setDataProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    pending_stock: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDataProduct({ ...dataProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      ...dataProduct,
    };
    console.log("La info de la data es: ", data);

    addProducts(data).then((Response) => {
      try {
        setLoading(false);
        closeModal();
        Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: "Ha registrado el producto de forma exitosa",
          confirmButtonText: "Continuar",
          allowOutsideClick: false,
          showCancelButton: false,
        }).then(() => {
          navigate("/Home");
          window.location.reload();
        });
      } catch (error) {
        onError(error);
      }
    });
  };

  const onError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Algo salió mal",
      text: "Ocurrió un error al registrar el producto, intentalo de nuevo",
      confirmButtonText: "Continuar",
      allowOutsideClick: false,
      showCancelButton: false,
    });
    console.log("Esto está ocurriendo", error);
  };

  return (
    <>
      <div className="lineProduct"></div>
      {loading ? (
        <div className="logo-Container-products">
          <img
            src={logo}
            alt="Logo de la compañía"
            className="logo-Loading-products rotating"
          />
        </div>
      ) : (
        <form className="form-products" onSubmit={handleSubmit}>
          <div className="form-up">
            <div className="row_ProductsLeft">
              <div className="input-group-products">
                <label className="label-product">Nombre del producto</label>
                <input
                  type="text"
                  className="form-control-products"
                  name="name"
                  placeholder="Nombre del producto"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group-products">
                <label className="label-product">
                  Descripción del producto
                </label>
                <textarea
                  type="text"
                  className="input-description"
                  name="description"
                  placeholder="Descripcion del producto"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group-products">
                <label className="label-product">Cantidad de producto</label>
                <input
                  type="number"
                  className="form-control-products"
                  name="stock"
                  placeholder="Cantidad de producto"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row_ProductsRight">
              <div className="input-group-products">
                <label className="label-product">Precio</label>
                <input
                  type="text"
                  className="form-control-products"
                  name="price"
                  placeholder="Precio"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group-products">
                <label className="label-product">Unidades separadas</label>
                <input
                  type="number"
                  className="form-control-products"
                  name="pending_stock"
                  placeholder="Unidades separadas"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="input-group-productsDown">
            <button type="submit" className="add_product_button">
              Agregar producto
            </button>
            <div className="lineProduct"></div>
          </div>
        </form>
      )}
    </>
  );
}

export default AddProducts;
