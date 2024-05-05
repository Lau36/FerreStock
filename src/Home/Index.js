// Home.js
import "../Home/Home.css";
import Navbar from "../Components/Navbar";
import React, { useState, useEffect } from "react";
import AddProducts from "../Components/AddProducts";
import { getProducts } from "../Services/Products";
import ProductList from "../Components/ProductList";
import { Dialog } from "primereact/dialog";
import { ReactComponent as SearchIcon } from "../Resources/lupa-de-busqueda.svg";

// Principal function of Home Page
function Home() {
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const productosData = await getProducts();
      setProductos(productosData);
    };

    fetchData();
  }, []);

  const agregarProductoSeleccionado = (producto) => {
    const productoExistente = productosSeleccionados.find(
      (p) => p.id === producto.id
    );

    if (productoExistente) {
      const productosActualizados = productosSeleccionados.map((p) => {
        if (p.id === producto.id) {
          return {
            ...p,
            cantidad: p.cantidad + 1,
            precioTotal: (p.cantidad + 1) * producto.price,
          };
        }
        return p;
      });
      setProductosSeleccionados(productosActualizados);
    } else {
      setProductosSeleccionados([
        ...productosSeleccionados,
        { ...producto, cantidad: 1, precioTotal: producto.price },
      ]);
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /*Refresh modal and close sale*/
  const cerrarVenta = () => {
    setProductosSeleccionados([]);
  };

  /*Modal*/
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Design
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="container-productos">
          <div className="search-container">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="search-products"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          <ProductList
            productos={productos}
            agregarProductoSeleccionado={agregarProductoSeleccionado}
            searchTerm={searchTerm}
            showAddButton={true}
          />
        </div>
        <div className="container-venta">
          <div className="card">
            <h2 className="card-title">Venta actual</h2>
            <div
              className="productos-seleccionados"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {productosSeleccionados.map((producto, index) => (
                <div key={index} className="producto-seleccionado">
                  <p>
                    {producto.name} - Cantidad:{" "}
                    <input
                      type="number"
                      min="1"
                      value={producto.cantidad}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        const nuevosProductos = [...productosSeleccionados];
                        nuevosProductos[index] = {
                          ...producto,
                          cantidad: value,
                          precioTotal: (value || 0) * producto.price,
                        };
                        setProductosSeleccionados(nuevosProductos);
                      }}
                    />{" "}
                    - Precio Total:{" "}
                    {isNaN(producto.precioTotal) ||
                    typeof producto.precioTotal !== "number"
                      ? 0
                      : `$${producto.precioTotal.toFixed(2)}`}
                  </p>
                </div>
              ))}
            </div>
            <button className="cerrar-venta" onClick={cerrarVenta}>
              Cerrar venta
            </button>
            <button className="agregar-producto" onClick={openModal}>
              <span>+</span> Agregar producto
            </button>

            <div>
              {modalIsOpen && (
                <div className="overlay" onClick={closeModal}></div>
              )}
              <div className="modal-container">
                <Dialog
                  visible={modalIsOpen}
                  draggable={false}
                  closable={false}
                  modal={true}
                  onHide={closeModal}
                  className="dialog-update-product"
                >
                  <div className="close-button-container">
                    <button className="close-button" onClick={closeModal}>
                      X
                    </button>
                  </div>
                  <h3 className="title-add-product">
                    Agregar un nuevo producto
                  </h3>
                  <AddProducts closeModal={closeModal} />
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
