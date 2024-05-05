import "../Inventory/Inventario.css";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Dropdown } from 'primereact/dropdown';
import ProductList from "../Components/ProductList";
import { getProducts, getSedes, getProductsSede } from "../Services/Products";
import { ReactComponent as SearchIcon } from "../Resources/lupa-de-busqueda.svg";

function Inventory() {
  // Estados
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSede, setSelectedSede] = useState([]);
  const [sedeOptions, setSedeOptions] = useState([]);

  // Efecto para obtener las sedes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sedesData = await getSedes();
        setSedeOptions(sedesData);
      } catch (error) {
        console.error("Error fetching sedes:", error);
      }
    };
    fetchData();
  }, []);

  // Efecto para obtener los productos al cargar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosData = await getProducts();
        setProductos(productosData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  // Efecto para obtener los productos de la sede seleccionada

  useEffect(() => {
    const fetchData = async () => {
      if (selectedSede) {
        try {
          const productosData = await getProductsSede(selectedSede.id);
          setProductos(productosData);

          console.log(productosData)
        } catch (error) {
          console.error("Error fetching products for sede:", error);
        }
      }
    };
    fetchData();
  }, [selectedSede]);


  // Handlers
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSedeChange = (e) => {
    setSelectedSede(e.value);
    console.log(e.value);
  };

  return (
    <div>
      <Navbar />
      <div className="inventory-container">
        <div className="container-productos2">
          <div className="search-container-inventory">
            <Dropdown
              value={selectedSede}
              onChange={handleSedeChange}
              options={sedeOptions}
              optionLabel="username"
              placeholder="Selecciona una sede"
              className="select-inventory"
              highlightOnSelect={false}
              panelClassName="dropdown-panel"
              itemTemplate={(option) => (
                <div className={option.id === selectedSede?.id ? "selected-option" : ""}>
                  {option.username}
                </div>
              )}
            />
            <SearchIcon className="search-icon-inventory" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="search-products-inventory"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          {productos.length === 0 ? (
            <p>No hay productos disponibles</p>
          ) : (
            <ProductList productos={productos} searchTerm={searchTerm} showAddButton={false} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Inventory;