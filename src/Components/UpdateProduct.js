import { useState } from "react";
import { updateProduct } from "../Services/Products";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import logo from "../Resources/logoNavbar.png";
import "./AddProducts.css";

function UpdateProduct({
  productID,
  name,
  description,
  price,
  stock,
  pending_stock,
  closeModal,
}) {
  const navigate = useNavigate();
  const [dataProduct, setDataProduct] = useState({
    name: name,
    description: description,
    price: price,
    stock: stock,
    pending_stock: pending_stock,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      ...dataProduct,
    };
    console.log("La info de la data es: ", data);

    updateProduct(data, productID).then((Response) => {
      try {
        setLoading(false);
        closeModal();
        Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: "Has actualizado tu producto de forma exitosa",
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
      text: "Ocurrió un error al crear actualizar el producto, intentalo de nuevo",
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
                  value={dataProduct.name}
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
                  value={dataProduct.description}
                  placeholder="Ingrese una descripción"
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
                  value={dataProduct.stock}
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
                  value={dataProduct.price}
                  placeholder="$0.00"
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
                  value={dataProduct.pending_stock}
                  placeholder="#"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="input-group-productsDown">
            <button type="submit" className="add_product_button">
              Guardar cambios
            </button>
            <div className="lineProduct"></div>
          </div>
        </form>
      )}
    </>
  );
}

export default UpdateProduct;
