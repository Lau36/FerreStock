import "./ProdcutStatus.css";
import React, { useState } from "react";
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
import Switch from '@mui/material/Switch';

function createData(name, stock, pending_stock, is_pending) {
    const available = stock - pending_stock;
    return { name, stock, pending_stock, is_pending, available };
}

const rows = [
    createData('Destornillador', 159, 6, true),
    createData('Cinta', 237, 9, true),
    createData('Eclair', 262, 16, true),
    // Añade más datos si es necesario para probar la paginación
];
function ProductStatus() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.stock}</TableCell>
                                            <TableCell align="right">{row.pending_stock}</TableCell>
                                            <TableCell align="right">{row.available}</TableCell>
                                            <TableCell align="right"><Switch
                                                    checked={row.is_pending}
                                                    className={row.is_pending ? "switch-pending" : "switch-available"}
                                                    disabled
                                                /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
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
                                Información del Producto
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Detalles adicionales
                            </Typography>
                            <Typography variant="body2">
                                Aquí puedes mostrar información detallada del producto seleccionado.
                                <br />
                                {'"Aún no hay datos disponibles"'}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ProductStatus;