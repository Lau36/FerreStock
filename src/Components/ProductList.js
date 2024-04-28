import React, { useState } from "react";
import "./ProductList.css";
import { getProductDetails } from "../Services/Products";
import Modal from "react-bootstrap/Modal";
import defaultProductImage from "../Resources/herramientas.jpg";
import UpdateProduct from "./UpdateProduct";

function ProductList({ productos, agregarProductoSeleccionado, searchTerm }) {
  const [modalShow, setModalShow] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [seleccionarProducto, setSeleccionarProducto] = useState(null);
  const [product, setProduct] = useState(null);

  const openModal = async (productId) => {
    try {
      const productDetails = await getProductDetails(productId);
      setSeleccionarProducto(productDetails);
      setProduct(productDetails);
      setModalShow(true);
    } catch (error) {
      console.error("Error al ver detalles de producto:", error);
    }
  };

  const openModal2 = async () => {
    setModal2(true);
    setModalShow(false);
  };

  const closeModal2 = () => {
    setModal2(false);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  const filteredProducts = productos.filter((producto) => {
    return (
      producto.name &&
      producto.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <div className="productos-grid">
        {filteredProducts.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img
              src={producto.image || defaultProductImage}
              alt={producto.name}
            />
            <h3>{producto.name}</h3>
            <p>${producto.price}</p>
            <button
              className="agregar-button"
              onClick={() => agregarProductoSeleccionado(producto)}
            >
              Agregar
            </button>
            <button
              className="detalles-button"
              onClick={() => openModal(producto.id)}
            >
              Ver detalles
            </button>
          </div>
        ))}
      </div>
      <Modal show={modalShow} onHide={closeModal}>
        <Modal.Header>
          <div className="close-button-container">
            <button className="close-button" onClick={closeModal}>
              x
            </button>
          </div>
          <Modal.Title>{seleccionarProducto?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={seleccionarProducto?.image || defaultProductImage}
            alt={seleccionarProducto?.name}
            style={{ width: "50%", height: "auto" }}
          />
          <p className="description">{seleccionarProducto?.description}</p>
          <p>Precio: ${seleccionarProducto?.price}</p>
          <p>Stock: {seleccionarProducto?.stock}</p>
          <p>Pendiente en stock: {seleccionarProducto?.pending_stock}</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="edit-button-container">
            <button className="edit-button" onClick={() => openModal2()}>
              Editar
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal show={modal2} onHide={closeModal2}>
        <Modal.Header>
          <div className="close-button-container">
            <button className="close-button" onClick={closeModal2}>
              x
            </button>
          </div>
        </Modal.Header>
        <UpdateProduct
          productID={product?.id}
          name={product?.name}
          price={product?.price}
          description={product?.description}
          stock={product?.stock}
          pending_stock={product?.pending_stock}
        />
      </Modal>
    </div>
  );
}

export default ProductList;
