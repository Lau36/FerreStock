import "../Inventory/Inventario.css";
import Navbar from "../Components/Navbar";
import React, { useState } from "react";
import Modal from "react-modal";
import AddProducts from "../Components/AddProducts";

// Products
const productos = [
    { id: 1, nombre: "Martillo", precio: 10.99, imagen: "url_imagen" },
    { id: 2, nombre: "Destornillador", precio: 5.99, imagen: "url_imagen" },
    { id: 3, nombre: "Sierra", precio: 15.99, imagen: "url_imagen" },
    { id: 4, nombre: "Taladro eléctrico", precio: 39.99, imagen: "url_imagen" },
    { id: 5, nombre: "Cinta métrica", precio: 3.99, imagen: "url_imagen" },
    { id: 6, nombre: "Llave ajustable", precio: 7.99, imagen: "url_imagen" },
    { id: 7, nombre: "Alicates", precio: 6.99, imagen: "url_imagen" },
    { id: 8, nombre: "Clavos de acero", precio: 1.99, imagen: "url_imagen" },
    {
        id: 9,
        nombre: "Tornillos de alta resistencia",
        precio: 2.99,
        imagen: "url_imagen",
    },
    { id: 10, nombre: "Cepillo para madera", precio: 8.99, imagen: "url_imagen" },
    {
        id: 11,
        nombre: "Pintura para interiores",
        precio: 12.99,
        imagen: "url_imagen",
    },
    { id: 12, nombre: "Brocas para metal", precio: 4.99, imagen: "url_imagen" },
    { id: 13, nombre: "Lija de grano fino", precio: 2.49, imagen: "url_imagen" },
    { id: 14, nombre: "Barniz para madera", precio: 9.99, imagen: "url_imagen" },
    { id: 15, nombre: "Pegamento multiusos", precio: 3.49, imagen: "url_imagen" },
    {
        id: 16,
        nombre: "Cerradura de seguridad",
        precio: 19.99,
        imagen: "url_imagen",
    },
    { id: 17, nombre: "Bombillo LED", precio: 1.99, imagen: "url_imagen" },
    { id: 18, nombre: "Escalera plegable", precio: 29.99, imagen: "url_imagen" },
    { id: 19, nombre: "Tubo de PVC", precio: 2.99, imagen: "url_imagen" },
    { id: 20, nombre: "Cable eléctrico", precio: 0.99, imagen: "url_imagen" },
];

//Principal function of Inventory
function Inventory() {
    /*Modal*/
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    /* Design */
    return (
        <div>
            <Navbar />
            <div className="inventory-container">
                <div className="container-productos2">
                    <input type="text" placeholder="Buscar productos..." />
                    <div className="productos-grid2">
                        {productos.map((producto) => (
                            <div key={producto.id} className="producto-card2">
                                <img src={producto.imagen} alt={producto.nombre} />
                                <h3>{producto.nombre}</h3>
                                <p>${producto.precio.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="container-venta2">
                    <button className="agregar-producto2" onClick={openModal}>
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
                        <div className="container-buttonModal2">
                            <button onClick={closeModal} className="close_modal">
                                x
                            </button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Inventory;
