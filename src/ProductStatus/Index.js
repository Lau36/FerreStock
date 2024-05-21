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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { getProductsFiltred } from "../Services/Products";

function ProductStatus() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [pendingQuantity, setPendingQuantity] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await getProductsFiltred();
            setProducts(productsData);
        };
        fetchProducts();
    }, []);

    const handleOpen = (product) => {
        setSelectedProduct(product);
        setPendingQuantity(product.pending_stock);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handlePendingQuantityChange = (event) => {
        setPendingQuantity(event.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className="conteiner-product-status">
                <div className="conteiner-table-status">
                    <Box className="table-wrapper">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre del producto</TableCell>
                                        <TableCell align="right">Stock</TableCell>
                                        <TableCell align="right">Cantidad pendiente</TableCell>
                                        <TableCell align="right">Disponible</TableCell>
                                        <TableCell align="right">Estado</TableCell>
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
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.stock}</TableCell>
                                                <TableCell align="right">{row.pending_stock}</TableCell>
                                                <TableCell align="right">{available}</TableCell>
                                                <TableCell align="right">
                                                    <Button variant="contained" color="primary" onClick={() => handleOpen(row)}>
                                                        Cambiar estado
                                                    </Button>
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
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </Box>
                </div>
                <div className="conteiner-information-product">
                    <Card className="card-information">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Información de productos
                            </Typography>
                            <Typography variant="body2">
                                Cantidad de productos en estado pendiente: {products.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal"
            >
                <Box className="modal-box">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Cambiar estado del producto
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {selectedProduct && `Producto: ${selectedProduct.name}`}
                    </Typography>
                    <TextField
                        label="Cantidad pendiente"
                        type="number"
                        value={pendingQuantity}
                        onChange={handlePendingQuantityChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleClose}>
                        Guardar
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ProductStatus;