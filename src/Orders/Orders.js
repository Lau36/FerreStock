import React, { useState } from "react";
import "./Orders.css";
import Navbar from "../Components/Navbar";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';

// Función para crear datos de la tabla
function createData(proveedor, fecha, estado, productos) {
    return {
        proveedor,
        fecha,
        estado,
        productos,
    };
}

// Componente que representa una fila de la tabla
function Row(props) {
    const { row } = props; // Desestructuramos las props para obtener la fila
    const [open, setOpen] = useState(false); // Estado para controlar si la fila colapsable está abierta

    return (
        <React.Fragment>
            {/* Fila principal */}
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                {/* Celda con botón para expandir/colapsar */}
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)} // Al hacer clic, alternamos el estado `open`
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {/* Celdas con los datos de la fila */}
                <TableCell component="th" scope="row">
                    {row.proveedor}
                </TableCell>
                <TableCell align="center">{row.fecha}</TableCell>
                <TableCell align="center">{row.estado}</TableCell>
            </TableRow>
            {/* Fila colapsable con los productos */}
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Productos
                            </Typography>
                            <Table size="small" aria-label="productos">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell align="right">Cantidad</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.productos.map((producto) => (
                                        <TableRow key={producto.nombre}>
                                            <TableCell component="th" scope="row">
                                                {producto.nombre}
                                            </TableCell>
                                            <TableCell align="right">{producto.cantidad}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

// Definimos los tipos de las props para el componente Row
Row.propTypes = {
    row: PropTypes.shape({
        proveedor: PropTypes.string.isRequired,
        fecha: PropTypes.string.isRequired,
        estado: PropTypes.string.isRequired,
        productos: PropTypes.arrayOf(
            PropTypes.shape({
                nombre: PropTypes.string.isRequired,
                cantidad: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

// Datos iniciales para las filas de la tabla
const initialRows = [
    createData('Proveedor A', '2024-05-01', 'Pendiente', [
        { nombre: 'Producto 1', cantidad: 10 },
        { nombre: 'Producto 2', cantidad: 20 },
    ]),
    createData('Proveedor B', '2024-05-02', 'Completado', [
        { nombre: 'Producto 3', cantidad: 15 },
        { nombre: 'Producto 4', cantidad: 30 },
    ]),
    createData('Proveedor C', '2024-05-03', 'En Progreso', [
        { nombre: 'Producto 5', cantidad: 8 },
        { nombre: 'Producto 6', cantidad: 12 },
    ]),
    // Agrega más datos para probar el scroll
    createData('Proveedor D', '2024-05-04', 'Pendiente', [
        { nombre: 'Producto 7', cantidad: 20 },
        { nombre: 'Producto 8', cantidad: 25 },
    ]),
    createData('Proveedor E', '2024-05-05', 'Completado', [
        { nombre: 'Producto 9', cantidad: 30 },
        { nombre: 'Producto 10', cantidad: 35 },
    ]),
    createData('Proveedor A', '2024-05-01', 'Pendiente', [
        { nombre: 'Producto 1', cantidad: 10 },
        { nombre: 'Producto 2', cantidad: 20 },
    ]),
    createData('Proveedor B', '2024-05-02', 'Completado', [
        { nombre: 'Producto 3', cantidad: 15 },
        { nombre: 'Producto 4', cantidad: 30 },
    ]),
    createData('Proveedor C', '2024-05-03', 'En Progreso', [
        { nombre: 'Producto 5', cantidad: 8 },
        { nombre: 'Producto 6', cantidad: 12 },
    ]),
    // Agrega más datos para probar el scroll
    createData('Proveedor D', '2024-05-04', 'Pendiente', [
        { nombre: 'Producto 7', cantidad: 20 },
        { nombre: 'Producto 8', cantidad: 25 },
    ]),
    createData('Proveedor E', '2024-05-05', 'Completado', [
        { nombre: 'Producto 9', cantidad: 30 },
        { nombre: 'Producto 10', cantidad: 35 },
    ]),
];

// Componente principal que contiene la tabla completa
function CollapsibleTable() {
    const [filter, setFilter] = useState(''); // Estado para almacenar el valor del filtro

    // Manejador de cambio para el campo de filtro
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Filtramos las filas según el valor del filtro
    const filteredRows = initialRows.filter((row) =>
        row.proveedor.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <TableContainer component={Paper} style={{ maxHeight: '100%', overflowY: 'auto' }}>
            <div className="filter-container">
                <TextField
                    label="Filtrar Por Proveedor"
                    value={filter}
                    onChange={handleFilterChange}
                    variant="outlined"
                    margin="normal"
                    className="filter-input"
                />
            </div>
            {/* Tabla principal */}
            <Table stickyHeader aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell className="headercell" />
                        <TableCell className="headercell">Proveedor</TableCell>
                        <TableCell className="headercell" align="center">Fecha</TableCell>
                        <TableCell className="headercell" align="center">Estado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredRows.map((row) => (
                        <Row key={row.proveedor} row={row} />
                    ))}
                </TableBody>
            </Table>
            {/* SpeedDial para el botón circular */}
            <SpeedDial
                ariaLabel="SpeedDial example"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {/* Acción del botón circular */}
                <SpeedDialAction
                    key="Agregar"
                    icon={<AddIcon />}
                    tooltipTitle="Agregar"
                    tooltipOpen
                    onClick={() => {
                        // Lógica para manejar la acción de agregar
                        console.log("Agregar acción ejecutada");
                    }}
                />
            </SpeedDial>
        </TableContainer>
    );
}

// Componente Orders que incluye el Navbar y la tabla
function Orders() {
    return (
        <>
            <Navbar />
            <div className="orders-container">
                <CollapsibleTable />
            </div>
        </>
    );
}

export default Orders;

