import React, { useState } from "react";
import "./ProductList.css";
import { getProductDetails } from "../Services/Products";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
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
    <div
      className="productos-grid"
      style={{ overflowY: "auto", borderRadius: "10px" }}
    >
      {filteredProducts.map((producto) => (
        <div key={producto.id} className="producto-card">
          <img
            src={producto.image || defaultProductImage}
            alt={producto.name}
            style={{
              height: "auto",
              borderRadius: "10px",
              // border: "1px solid",
            }}
          />
          <h3 style={{ textAlign: "center" }}>{producto.name}</h3>
          <p>${producto.price}</p>
          <p>Disponible: {producto.stock}</p>
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

      <div>
        {modalShow && <div className="overlay"></div>}
        <div className="modal-container">
          <Dialog
            visible={modalShow}
            closable={false}
            modal={true}
            className="dialog-detail-product"
          >
            <div className="close-button-container">
              <button className="close-button" onClick={closeModal}>
                X
              </button>
            </div>
            <div
              className="card-content"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={seleccionarProducto?.image || defaultProductImage}
                alt={seleccionarProducto?.name}
                style={{
                  width: "60%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
              <h3 style={{ textAlign: "center", marginTop: "15px" }}>
                {seleccionarProducto?.name}
              </h3>
              <h4>Descripción</h4>
              <p>{seleccionarProducto?.description}</p>
            </div>
            <div
              className="card-content"
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "30px",
              }}
            >
              <p>Precio: ${seleccionarProducto?.price}</p>
              <p>Stock: {seleccionarProducto?.stock}</p>
              <p>Pendiente en stock: {seleccionarProducto?.pending_stock}</p>
            </div>
            <div
              className="edit-button-container"
              style={{ marginBottom: "10px" }}
            >
              <Button
                className="edit-button"
                label="Editar"
                icon="pi pi-pencil"
                onClick={() => openModal2()}
              />
            </div>
          </Dialog>
        </div>
      </div>

      <div>
        {modal2 && <div className="overlay"></div>}
        <div className="modal-container">
          <Dialog
            visible={modal2}
            draggable={false}
            closable={false}
            modal={true}
            onHide={closeModal2}
            className="dialog-update-product"
          >
            <div className="close-button-container">
              <button className="close-button" onClick={closeModal2}>
                X
              </button>
            </div>
            <h3 className="title-add-product">
              Actualizar información del producto
            </h3>
            <UpdateProduct
              productID={product?.id}
              name={product?.name}
              price={product?.price}
              description={product?.description}
              stock={product?.stock}
              pending_stock={product?.pending_stock}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
