import React, { useState, useRef } from "react";
import "./ProductList.css";
import { deleteProduct, getProductDetails } from "../Services/Products";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import defaultProductImage from "../Resources/herramientas.jpg";
import UpdateProduct from "./UpdateProduct";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

function ProductList({
  productos,
  agregarProductoSeleccionado,
  searchTerm,
  showAddButton,
}) {
  const [modalShow, setModalShow] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [seleccionarProducto, setSeleccionarProducto] = useState(null);
  const [product, setProduct] = useState(null);
  const toast = useRef(null);

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

  const handleDelete = (idProduct) => {
    console.log("EL ID DEL PRODUCTO", idProduct);
    const productID = idProduct;
    Swal.fire({
      title: "Atención, estás seguro de realizar esta acción",
      text: "Vas a eliminar un producto de tu inventario",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      showLoaderOnConfirm: true,
      cancelButtonColor: "#d33",
      confirmButtonText: `Confirmar`,
      allowOutsideClick: false,
      cancelButtonText: "Cancelar",

      preConfirm: () => {
        return new Promise((resolve, reject) => {
          console.log("EL ID QUE PASO ACÁ", productID);
          deleteProduct(productID)
            .then((response) => {
              Swal.fire({
                icon: "success",
                title: "Operación exitosa",
                text: "El producto fue eliminado correctamente",
                confirmButtonText: "Continuar",
                allowOutsideClick: false,
                showCancelButton: false,
              }).then(() => {
                window.location.reload();
              });
            })
            .catch((err) => {
              onError(err);
            });
        });
      },
    });
  };

  const onError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Algo salió mal",
      text: error || "Ocurrió un error al crear el usuario, intenta de nuevo",
      confirmButtonText: "Continuar",
      allowOutsideClick: false,
      showCancelButton: false,
    });
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
      <Toast ref={toast} />
      {filteredProducts.map((producto, index) => {
        const availableStock = producto.stock - producto.pending_stock;

        if (availableStock < 5) {
          toast.current.show({
            severity: "info",
            summary: "Stock bajo",
            detail: `El producto ${producto.name} tiene stock bajo (${availableStock} disponibles)`,
            life: 10000 // 10 segundos
          });
        }

        return (
          <div key={producto.id} className="producto-card">
            <div className="button-delete-product-container">
              <IconButton
                onClick={() => handleDelete(producto?.id)}
                aria-label="delete"
              >
                <DeleteIcon style={{ color: "#CF3429" }} />
              </IconButton>
            </div>
            <img
              src={producto.image || defaultProductImage}
              alt={producto.name}
              style={{
                height: "auto",
                borderRadius: "10px",
              }}
            />
            <h3 style={{ textAlign: "center" }}>{producto.name}</h3>
            <p>${producto.price}</p>
            <p>Disponible: {availableStock}</p>
            {showAddButton && (
              <button
                className="agregar-button"
                onClick={() => agregarProductoSeleccionado(producto)}
              >
                Agregar
              </button>
            )}
            <button
              className="detalles-button"
              onClick={() => openModal(producto.id)}
            >
              Ver detalles
            </button>
          </div>
        );
      })}

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
              closeModal={closeModal2}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
