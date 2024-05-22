import "./ProdcutStatus.css";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { getProductsFiltred, updateProductStock } from "../Services/Products";

/**
 * Funcion principal de la tabla con productos que estan en estado pendiente
 * @returns Products
 */
function ProductStatus() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [nuevaCantidad, setnuevaCantidad] = useState(0);
    const [isPending, setIsPending] = useState(false);

    //Effect
    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await getProductsFiltred();
            setProducts(productsData);
        };
        fetchProducts();
    }, []);

    // Modal
    const abrirModal = (product) => {
        setSelectedProduct(product);
        setnuevaCantidad(0);
        setIsPending(product.pending_stock > 0);
        setOpen(true);
    };

    const cerrarModal = () => {
        setOpen(false);
    };

    // Pagination de la tabla
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const columnasPagina = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Nueva cantidad a quitar
    const cambiarCantidad = (event) => {
        setnuevaCantidad(Number(event.target.value));
    };

    // Funcion que llama servicio para guardar los cambios en la bd
    const guardarCambios = async () => {
        if (selectedProduct) {
            try {
                await updateProductStock(selectedProduct.id, false, nuevaCantidad);
                const updatedProducts = products.map(product =>
                    product.id === selectedProduct.id
                        ? { ...product, pending_stock: nuevaCantidad }
                        : product
                );
                cerrarModal();
            } catch (error) {
                console.error("Error updating product stock:", error);
            }
        }
    };

    return (
        <div>
            <Navbar />

            <div className="conteiner-product-status">
                <div className="conteiner-table-status">
                {/* font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; */}
                    <h2 style={{ textAlign: "center", marginBottom: "30px", fontFamily: "sans-serif" }}>Productos en estado pendiente</h2>
                    <Box className="table-wrapper">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Nombre del producto</TableCell>
                                        <TableCell align="center">Stock</TableCell>
                                        <TableCell align="center">Cantidad pendiente</TableCell>
                                        <TableCell align="center">Disponible</TableCell>
                                        <TableCell align="center">Estado</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const available = row.stock - row.pending_stock;
                                        return (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align="center">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">{row.stock}</TableCell>
                                                <TableCell align="center">{row.pending_stock}</TableCell>
                                                <TableCell align="center">{available}</TableCell>
                                                <TableCell align="center">
                                                    <button className="change-status" onClick={() => abrirModal(row)}>
                                                        Cambiar estado
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={products.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={columnasPagina}
                            />
                        </TableContainer>
                    </Box>
                </div>
            </div>
            <Modal
                open={open}
                onClose={cerrarModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal"
            >
                <Box
                    className="modal-box"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 1,
                    }}
                >
                    <IconButton
                        aria-label="close"
                        onClick={cerrarModal}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }} align="center">
                        Cambiar estado del producto
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {selectedProduct && `Producto: ${selectedProduct.name}`}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Cantidad pendiente actual: {selectedProduct && selectedProduct.pending_stock}
                    </Typography>
                    <br />
                    <TextField
                        label="Cantidad entregada"
                        type="number"
                        value={nuevaCantidad}
                        onChange={cambiarCantidad}
                        fullWidth
                        margin="normal"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button variant="contained" sx={{ bgcolor: 'green' }} onClick={guardarCambios}>
                            Guardar
                        </Button>
                    </Box>
                </Box>
            </Modal>

        </div>
    );
}

export default ProductStatus;