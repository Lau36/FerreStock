import { useState } from "react";
import { addProducts } from "../Services/Products";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import "./AddProducts.css";

function AddProducts() {
  const navigate = useNavigate();
  const [dataProduct, setDataProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    pending_stock: "",
  });

  const handleChange = (e) => {
    setDataProduct({ ...dataProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...dataProduct,
    };
    console.log("La info de la data es: ", data);

    addProducts(data).then((Response) => {
      try {
        Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: "Ha registrado el producto de forma exitosa",
          confirmButtonText: "Continuar",
          allowOutsideClick: false,
          showCancelButton: false,
        }).then(() => {
          navigate("/Home");
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
      text: "Ocurrió un error al crear el curso, intentalo de nuevo",
      confirmButtonText: "Continuar",
      allowOutsideClick: false,
      showCancelButton: false,
    });
    console.log("Esto está ocurriendo", error);
  };

  return (
    <>
      <div className="lineProduct"></div>
      <form className="form-products" onSubmit={handleSubmit}>
        <div className="form-up">
          <div className="row_ProductsLeft">
            <div className="input-group-products">
              <label className="labelName">Nombre del producto</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Nombre del producto"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group-products">
              <label className="labelName">Cantidad de producto</label>
              <input
                type="number"
                className="form-control"
                name="stock"
                placeholder="Cantidad de producto"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row_ProductsRight">
            <div className="input-group-products">
              <label className="labelName">Precio</label>
              <input
                type="text"
                className="form-control"
                name="price"
                placeholder="Precio"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group-products">
              <label className="labelName">Unidades separadas</label>
              <input
                type="number"
                className="form-control"
                name="pending_stock"
                placeholder="Unidades separadas"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="input-group-productsDown">
          <label className="labelName">Descripción del producto</label>
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Descripcion del producto"
            onChange={handleChange}
            required
          />
          <button type="submit" className="add_product_button">
            Agregar producto
          </button>
        </div>
      </form>
    </>
  );
}

export default AddProducts;
