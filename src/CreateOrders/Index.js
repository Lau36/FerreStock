import Navbar from "../Components/Navbar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog } from "primereact/dialog";
import "./CreateOrders.css";
import { useState } from "react";

function createData(name, cuality) {
  return { name, cuality };
}

const initialRows = [
  createData("Bolsa de cemento", 159),
  createData("Cinta", 237),
  createData("Tornillos", 262),
  createData("Martillos", 305),
  createData("Puntillas", 356),
];

function CreateOrders() {
  const suppliers = [
    { label: "Proovedor 1" },
    { label: "Proovedor 2" },
    { label: "Proovedor 3" },
    { label: "Proovedor 4" },
  ];
  const [rows, setRows] = useState(initialRows);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDelete = (name) => {
    const filteredRows = rows.filter((row) => row.name !== name);
    setRows(filteredRows);
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
      <div className="container-principal">
        <div className="create-order-container">
          <div className="title-container-orders">
            <label className="create-order-title">
              Agregar pedido a poovedores
            </label>
          </div>

          <div className="line-orders"></div>
          <div className="form-suppliers">
            <label className="label-supplier">Proovedor</label>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={suppliers}
              sx={{ width: "70vw", height: "8vh" }}
              renderInput={(params) => (
                <TextField {...params} label="Seleccione un proovedor" />
              )}
            />
          </div>
          <div className="button-add-product-orders">
            <button
              type="submit"
              className="add-product-supplier"
              onClick={openModal}
            >
              Agregar producto
            </button>
          </div>
          <div className="products-container">
            <TableContainer component={Paper}>
              <Table
                sx={{ width: "40vw", height: "10vh" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre del producto</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell align="right">Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.cuality}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleDelete(row.name)}
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="footer-line">
            <div className="line-orders" />
          </div>
          <div className="button-add-orders-container">
            <button type="submit" className="add-order">
              Agregar pedido
            </button>
          </div>
        </div>
      </div>
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
        </Dialog>
      </div>
    </>
  );
}

export default CreateOrders;
