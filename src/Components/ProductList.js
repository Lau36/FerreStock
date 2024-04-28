import React, { useState } from "react";
import "./ProductList.css";
import { getProductDetails } from "../Services/Products";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import defaultProductImage from "../Resources/herramientas.jpg";

function ProductList({ productos, agregarProductoSeleccionado, searchTerm }) {
    const [modalShow, setModalShow] = useState(false);
    const [seleccionarProducto, setSeleccionarProducto] = useState(null);

    const openModal = async (productId) => {
        try {
            const productDetails = await getProductDetails(productId);
            setSeleccionarProducto(productDetails);
            setModalShow(true);
        } catch (error) {
            console.error("Error al ver detalles de producto:", error);
        }
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
                        <img src={producto.image || defaultProductImage} alt={producto.name} />
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
                    <Modal.Title>{seleccionarProducto?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={seleccionarProducto?.image || defaultProductImage} alt={seleccionarProducto?.name} style={{ width: "50%", height: "auto" }} />
                    <p className="description">{seleccionarProducto?.description}</p>
                    <p>Precio: ${seleccionarProducto?.price}</p>
                    <p>Stock: {seleccionarProducto?.stock}</p>
                    <p>Pendiente en stock: {seleccionarProducto?.pending_stock}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="close" variant="secondary" onClick={closeModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProductList;
