import "../Inventory/Inventario.css";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Dropdown } from 'primereact/dropdown';
import ProductList from "../Components/ProductList";
import { getProducts } from "../Services/Products";
import { ReactComponent as SearchIcon } from "../Resources/lupa-de-busqueda.svg";

// Constantes
const sedeOptions = [
    { name: 'Todas las sedes', id: '0' },
    { name: 'Sede 1', id: '1' },
    { name: 'Sede 2', id: '2' },
    { name: 'Sede 3', id: '3' },
    { name: 'Sede 4', id: '4' },
    { name: 'Sede 5', id: '5' }
];

function Inventory() {
  // Estados
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSede, setSelectedSede] = useState(null);

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

  // Handlers
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSedeChange = (e) => {
    setSelectedSede(e.value);
  };

  return (
    <div>
      <Navbar />
      <div className="inventory-container">
        <div className="container-productos2">           
          <div className="search-container-inventory">
            <Dropdown value={selectedSede} 
            onChange={handleSedeChange} 
            options={sedeOptions} 
            optionLabel="name" 
            placeholder="Selecciona una sede" 
            className="select-inventory"  
            highlightOnSelect={false}
            panelClassName="dropdown-panel"
            itemTemplate={(option) => (
                <div className={option.id === selectedSede?.id ? "selected-option" : ""}>
                  {option.name}
                </div>)}
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
          <ProductList productos={productos} searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
}

export default Inventory;