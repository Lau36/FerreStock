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
    category: null,
  });
  const [loading, setLoading] = useState(false);

  // Lista de categorías predefinidas
  const categories = [
    "Herramientas manuales",
    "Herramientas electricas",
    "Ferreteria",
    "Construccion",
    "Pintura",
    "Plomeria",
    "Electricidad",
    "Jardineria",
    "Adhesivos y pegantes",
  ];
  const categoryImages = {
    "Herramientas manuales": "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/sodimacCO/554340/w=1036,h=832,f=webp,fit=contain,q=85",
    "Herramientas electricas": "https://homecenterco.scene7.com/is/image/SodimacCO/484299",
    "Ferreteria": "https://media.istockphoto.com/id/170112853/es/foto/tuercas-y-pernos.jpg?s=612x612&w=0&k=20&c=5CyKF-WOuXKZpBIw5Ud05zKoCj_S3wZj3g3oX3V7B4c=",
    "Construccion": "https://media.istockphoto.com/id/1456595707/es/foto/carretilla-y-bolsas-de-cemento-aisladas-sobre-blanco-materiales-de-construcci%C3%B3n.jpg?s=612x612&w=0&k=20&c=c32XxUyqVNCnATex3QWeJu0G2yHJyMKHU40HXAzGNrk=",
    "Pintura": "https://media.istockphoto.com/id/170458766/es/foto/pintura-equipo.jpg?s=612x612&w=0&k=20&c=77LUesJPO50LmBOxQB8Q6tL0_YBf_bzNvVQRsnD01PA=",
    "Plomeria": "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/sodimacCO/212479_01/w=300,h=300,f=webp,fit=contain,q=85",
    "Electricidad": "https://media.istockphoto.com/id/1478939666/es/foto/cubo-de-basura-con-l%C3%A1mparas-de-bajo-consumo-reciclaje.jpg?s=612x612&w=0&k=20&c=ypbp3IEV4_5MvRsvmz5GBc1DEPdOioaqeex4kzvqCYE=",
    "Jardineria": "https://media.istockphoto.com/id/528915710/es/vector/vector-de-de-la-carretilla-con-jard%C3%ADn-y-accesorios.jpg?s=612x612&w=0&k=20&c=hceUyaeSIpwXsG054YWsfZJvQKpQZNjfd_ZvGjD0MfY=",
    "Adhesivos y pegantes": "https://media.istockphoto.com/id/2150921508/es/foto/recorte-de-primer-plano-de-un-rollo-de-cinta-adhesiva-de-pvc-negro-de-aislamiento-el%C3%A9ctrico.jpg?s=612x612&w=0&k=20&c=9ZXOdQBBvvV3FZ2NILcZPACmxY2mA0DccAfZ-wpFGnc=",
    "Default": "https://media.istockphoto.com/id/1178775481/es/vector/icono-de-herramientas-de-servicio-aislado-sobre-fondo-blanco-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=jarZzIW3iEZILi7h2Ca8Vt_z7e7bxm3O4omHPCEu5GA=",
  };

  const [categoryImage, setCategoryImage] = useState(categoryImages["Default"]);

  const handleChange = (e) => {
    setDataProduct({ ...dataProduct, [e.target.name]: e.target.value });
    if (e.target.name === "category") {
      setCategoryImage(categoryImages[e.target.value] || categoryImages["Default"]);
    }
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
          <div className="image-container-category">
            <div className="category-image-container">
              <img src={categoryImage} alt="Categoría" />
            </div>
          </div>
          <div className="form-up">
            <div className="row_Products">
              <div className="input-group-products-top">
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
              <div className="input-group-products-top">
                <label className="label-product">Categoría</label>
                <select
                  className="form-control-products-select"
                  name="category"
                  value={dataProduct.category || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row_Products">
              <div className="input-group-products-top">
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
              <div className="input-group-products-top">
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
              <div className="input-group-products-top">
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
          <div className="input-group-products-top">
            <label className="label-product">Descripción del producto</label>
            <textarea
              type="text"
              className="input-description"
              name="description"
              placeholder="Descripcion del producto"
              onChange={handleChange}
              required
            />
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