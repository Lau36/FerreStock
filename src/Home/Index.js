// Home.js
import "../Home/Home.css";
import Navbar from "../Components/Navbar";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import AddProducts from "../Components/AddProducts";
import { getProducts } from "../Services/Products";
import ProductList from "../Components/ProductList";

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

  /* Add product to cart */
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
    <div>
      <Navbar />
      <div className="home-container">
        <div className="container-productos">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <ProductList
            productos={productos}
            agregarProductoSeleccionado={agregarProductoSeleccionado}
            searchTerm={searchTerm}
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
                    /> - Precio Total:{" "}
                    {isNaN(producto.precioTotal) || typeof producto.precioTotal !== 'number'
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
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Agregar Producto Modal"
              style={{
                content: {
                  width: "auto",
                  height: "auto",
                  maxWidth: "75%",
                  maxHeight: "75%",
                  margin: "auto",
                },
              }}
            >
              <AddProducts />
              <div className="container-buttonModal">
                <button onClick={closeModal} className="close_modal">
                  x
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;