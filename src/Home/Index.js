import "../Home/Home.css";
import Navbar from "../Components/Navbar";
import React, { useState, useEffect } from "react";
import AddProducts from "../Components/AddProducts";
import { getProducts, updateProductStock } from "../Services/Products";
import ProductList from "../Components/ProductList";
import { Dialog } from "primereact/dialog";
import { ReactComponent as SearchIcon } from "../Resources/lupa-de-busqueda.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import Switch from '@mui/material/Switch';


function Home() {
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalAPagar, setTotalAPagar] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const productosData = await getProducts();
      setProductos(productosData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const total = productosSeleccionados.reduce((total, producto) => {
      return total + (producto.precioTotal || 0);
    }, 0);
    setTotalAPagar(total);
  }, [productosSeleccionados]);

  const handleSwitchChange = (index, checked) => {
    const nuevosProductos = [...productosSeleccionados];
    nuevosProductos[index] = {
      ...productosSeleccionados[index],
      pendiente: checked,
    };
    setProductosSeleccionados(nuevosProductos);
  };

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


  const actualizarInventario = async () => {
    for (const producto of productosSeleccionados) {
      try {
        await updateProductStock(producto.id, producto.pendiente, producto.cantidad);
      } catch (error) {
        console.error("Error al actualizar el inventario:", error);
      }
    }
    setProductosSeleccionados([]);
  };


  const handleCantidadChange = (index, newCantidad) => {
    const nuevosProductos = [...productosSeleccionados];
    nuevosProductos[index] = {
      ...productosSeleccionados[index],
      cantidad: newCantidad,
      precioTotal: newCantidad * productosSeleccionados[index].price,
    };
    setProductosSeleccionados(nuevosProductos);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
            <h2 className="card-title">Productos seleccionados</h2>
            <div className="table-container">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Nombre</TableCell>
                      <TableCell align="center">Cantidad</TableCell>
                      <TableCell align="center">Precio Total</TableCell>
                      <TableCell align="center">Pendiente</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productosSeleccionados.map((producto, index) => (
                      <TableRow key={index}>
                        <TableCell>{producto.name}</TableCell>
                        <TableCell align="right">
                          <TextField
                            type="number"
                            value={producto.cantidad}
                            onChange={(e) =>
                              handleCantidadChange(
                                index,
                                parseInt(e.target.value)
                              )
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          $
                          {typeof producto.precioTotal === "number"
                            ? producto.precioTotal.toFixed(2)
                            : ""}
                        </TableCell>
                        <TableCell align="center" className="switch-container">
                          <Switch
                            checked={producto.pendiente || false}
                            onChange={(e) => handleSwitchChange(index, e.target.checked)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            {typeof totalAPagar === "number" && (
              <div className="total-a-pagar">
                <strong>Total a pagar: ${totalAPagar.toFixed(2)}</strong>
              </div>
            )}

            <div className="buttons-container">
              <button className="cerrar-venta" onClick={actualizarInventario}>
                Actualizar inventario
              </button>
            </div>
            <button className="agregar-producto" onClick={openModal}>
              <span>+</span> Agregar producto
            </button>
            <button
              className="productos-pendientes"
              onClick={() => (window.location.href = '/EstadoProductos')}
            >
              Estado de productos
            </button>
          </div>
        </div>
      </div>
      <div>
        {modalIsOpen && <div className="overlay" onClick={closeModal}></div>}
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
            <h3 className="title-add-product">Agregar un nuevo producto</h3>
            <AddProducts closeModal={closeModal} />
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default Home;