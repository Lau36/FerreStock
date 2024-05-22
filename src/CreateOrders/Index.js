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
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { getSuppliers } from "../Services/Suppliers";
import { createOrder, getProducts } from "../Services/Products";
import { useNavigate } from "react-router";
import "./CreateOrders.css";

//Products--------------------------------------------------
function createProduct(name, quantity, id) {
  return { name, quantity, id };
}

//////******************************************************* */

function CreateOrders() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const style2 = {
    width: "100%",
  };

  const handleDelete = (name) => {
    const filteredRows = rows.filter((row) => row.name !== name);
    const filteredItems = items.filter(
      (item) => item.product !== rows.find((row) => row.name === name).id
    );
    setRows(filteredRows);
    setItems(filteredItems);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [rows, setRows] = useState([]); //La lista de productos
  const [supplierData, setSupplierData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  //Este me trae los proovedores
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSuppliers();
        const transformedData = response.map((supplier) => ({
          label: supplier.company_name,
          id: supplier.id,
        }));
        setSupplierData(transformedData);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchData();
  }, []);

  //Este me trae los productos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
        const transformedData = response.map((product) => ({
          label: product.name,
          id: product.id,
        }));
        setProductData(transformedData);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchData();
  }, []);

  const suppliers = supplierData;

  const products = productData;

  const handleAddProduct = () => {
    if (selectedProduct && quantity) {
      const newProduct = createProduct(
        selectedProduct.label,
        parseInt(quantity),
        selectedProduct.id
      );
      const newItem = {
        product: selectedProduct.id,
        quantity: parseInt(quantity),
      };
      const updatedRows = [...rows, newProduct];
      const updatedProducts = [...items, newItem];
      setRows(updatedRows);
      setItems(updatedProducts);
      setOpen(false);

      console.log(updatedRows);

      setSelectedProduct(null);
      setQuantity("");
    }
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    const numericSupplierId = parseInt(supplierId);
    const numericId = parseInt(sessionStorage.getItem("id"));
    if (
      isNaN(numericSupplierId) ||
      numericSupplierId === 0 ||
      items.length === 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Algo salió mal",
        text: "Recuerda elegir un proveedor y agregar al menos un producto para realizar el pedido",
        confirmButtonText: "Continuar",
        allowOutsideClick: false,
        showCancelButton: false,
      });
      return;
    }

    const newOrderData = {
      user: numericId,
      status: "Pendiente",
      supplier: numericSupplierId,
      items: items,
    };

    console.log("la data pa hacer la llamada", newOrderData);
    try {
      await createOrder(newOrderData);
      Swal.fire({
        icon: "success",
        title: "Operación exitosa",
        text: "El pedido ha sido registrado de forma exitosa",
        confirmButtonText: "Continuar",
        allowOutsideClick: false,
        showCancelButton: false,
      });
      navigate("/Pedidos");
    } catch (error) {
      onError(error);
    }
  };

  const onError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Algo salió mal",
      text: "Ocurrió un error al registrar el producto, intentalo de nuevo",
      confirmButtonText: "Continuar",
      allowOutsideClick: false,
      showCancelButton: false,
    });
    console.log("Esto está ocurriendo", error);
  };

  return (
    <>
      <Navbar />
      <div className="container-principal">
        <form className="create-order-container">
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
              sx={{ width: "70vw", height: "8vh" }}
              options={suppliers}
              value={suppliers.find((sup) => sup.id === supplierId) || null} // Asegura que el valor inicial sea correcto o null
              onChange={(event, newValue) => {
                setSupplierId(newValue ? newValue.id : ""); // Guarda solo el ID o reinicia a cadena vacía
              }}
              getOptionLabel={(option) => (option ? option.label : "")}
              isOptionEqualToValue={(option, value) => option.id === value.id} // Compara los id para determinar igualdad
              renderInput={(params) => (
                <TextField {...params} label="Seleccione un proveedor" />
              )}
            />
          </div>
          <div className="button-add-product-orders">
            <button
              type="button"
              className="add-product-supplier"
              onClick={handleOpen}
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
                      <TableCell>{row.quantity}</TableCell>
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
            <button type="submit" className="add-order" onClick={handleSumbit}>
              Agregar pedido
            </button>
          </div>
        </form>
      </div>
      <div className="modal-container">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
        >
          <Fade in={open}>
            <Box sx={style}>
              <div className="close-button-container">
                <button className="close-button" onClick={handleClose}>
                  X
                </button>
              </div>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Agregar producto
              </Typography>
              <label className="label-product">Producto</label>
              <Autocomplete
                key={selectedProduct ? selectedProduct.id : "no-product"}
                disablePortal
                id="combo-box-demo"
                options={products}
                sx={style2}
                value={selectedProduct}
                onChange={(event, newValue) => {
                  setSelectedProduct(newValue);
                }}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) =>
                  option && value && option.id === value.id
                }
                renderInput={(params) => (
                  <TextField {...params} label="Seleccione un producto" />
                )}
              />
              <label className="label-product">Cantidad</label>
              <div className="input-amount-container">
                <input
                  type="number"
                  className="input-product-amount"
                  placeholder="Cantidad del producto"
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="button-add-product-modal">
                <button
                  type="submit"
                  className="add-product-supplier"
                  onClick={handleAddProduct}
                >
                  Agregar producto
                </button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}

export default CreateOrders;
