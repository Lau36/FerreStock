import React, { useState, useEffect } from "react";
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
import Swal from 'sweetalert2'; // Importar SweetAlert
import { getOrders, updateStatusOrder } from "../Services/Products";

// Componente que representa una fila de la tabla
function Row({ row }) {
    const [open, setOpen] = useState(false); // Estado para controlar si la fila colapsable está abierta
    const [status, setStatus] = useState(row.status); // Estado para almacenar el estado actual

    // Manejador de cambio para el select de estado
    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        try {
            // Realizar la solicitud de actualización del estado del pedido
            const response = await updateStatusOrder(row.id_order);

            console.log(response.status);

            if (response.status === 200) {
                // Mostrar SweetAlert de éxito si la respuesta es "OK"
                setStatus(newStatus);
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'El estado del pedido se actualizó correctamente.'
                });
            } else {
                // Mostrar SweetAlert de error si la respuesta no es "OK"
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al actualizar el estado del pedido. Por favor, inténtalo de nuevo.'
                });
            }
        } catch (error) {

            console.log("Holaaaaa", error);
            // Mostrar SweetAlert de error si hay un error en la solicitud
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al comunicarse con el servidor. Por favor, inténtalo de nuevo más tarde.'
            });
        }
    };


    return (
        <React.Fragment>
            {/* Fila principal */}
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                {/* Celda con botón para expandir/colapsar */}
                <TableCell className="more-info-option">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)} // Al hacer clic, alternamos el estado `open`
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {/* Celda con el nombre del proveedor */}
                <TableCell component="th" scope="row" align="center">
                    {row.supplier.company_name}
                </TableCell>
                {/* Celda con la fecha */}
                <TableCell align="center">{row.date.split('T')[0]}</TableCell>
                {/* Celda de estado */}
                <TableCell align="center">
                    {status === 'Entregado' ? (
                        <div className="status-delivered">{status}</div>
                    ) : (
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className="select-pending" // Aplicamos la clase para el fondo naranja
                        >
                            <option value="Pendiente">Pendiente</option>
                            <option value="Entregado">Entregado</option>
                        </select>
                    )}
                </TableCell>
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
                                        <TableCell className="headercell">Nombre</TableCell>
                                        <TableCell className="headercell" align="right">Cantidad</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {item.product.name}
                                            </TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
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
        id_order: PropTypes.number.isRequired,
        supplier: PropTypes.shape({
            company_name: PropTypes.string.isRequired,
        }),
        date: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                product: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                }),
                quantity: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

// Componente principal que contiene la tabla completa
function CollapsibleTable() {
    const [orders, setOrders] = useState([]); // Estado para almacenar los pedidos
    const [filter, setFilter] = useState(''); // Estado para almacenar el valor del filtro

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getOrders();
                setOrders(ordersData);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    // Manejador de cambio para el campo de filtro
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Filtramos las filas según el valor del filtro
    const filteredOrders = orders.filter((order) =>
        order.supplier.company_name.toLowerCase().includes(filter.toLowerCase())
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
                        <TableCell className="headercell" align="center">Proveedor</TableCell>
                        <TableCell className="headercell" align="center">Fecha</TableCell>
                        <TableCell className="headercell" align="center">Estado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredOrders.map((order) => (
                        <Row key={order.id} row={order} />
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