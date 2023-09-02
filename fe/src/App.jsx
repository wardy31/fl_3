import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import {
  Box,
  Card,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Qr from "./components/Qr";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import store from "./store/store";
import { getReciept } from "./store/httpReciept";
import ModalDialog from "./components/ModalDialog";
import { useSelector } from "react-redux";
import DeletDialog from "./components/DeletDialog";
import ViewDialog from "./components/ViewDialog";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("No result");
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [codeData, setCodeData] = useState(null);

  const { data: reciepts } = useSelector((state) => state.reciept.get);
  const handleModal = (data) => {
    setOpenModal(data);
    console.log(data);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [openQr, setOpenQr] = useState(false);
  const [qrResult, setQrResult] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleQr = (data) => {
    setQrResult(data);
    setOpenQr(false);
  };

  const handleOpenQr = () => {
    setOpenQr(true);
  };

  const handleStop = () => {
    setOpenQr(false);
  };

  const handleDeleteModal = () => {
    setDeleteData(false);
    setCodeData(null);
  };

  const handleView = () => {
    setViewData(false);
    setCodeData(null);
  };

  useEffect(() => {
    if (qrResult.trim().length) {
      const data = [...reciepts];
      const res = data.filter((f) => f.code == qrResult);
      console.log("res", res);
      setFilteredData(res);
      return;
    }
    setFilteredData([]);
  }, [qrResult]);

  useEffect(() => {
    store.dispatch(getReciept());
  }, []);
  console.log(qrResult.length);

  if (!reciepts?.length) {
    return (
      <>
        <Container>
          <ViewDialog
            handleView={handleView}
            viewData={viewData}
            codeData={codeData}
          ></ViewDialog>
          <DeletDialog
            handleDeleteModal={handleDeleteModal}
            deleteData={deleteData}
            codeData={codeData}
          ></DeletDialog>
          <ModalDialog openModal={openModal} handleModal={handleModal} />
          <Grid container sx={{ width: "50%", mx: "auto" }}>
            <Grid item xs={12} justifyContent="center">
              <Qr openQr={openQr} handleQr={handleQr} handleStop={handleStop} />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", my: 2 }}>
            <FormControl
              variant="outlined"
              fullWidth
              focused={qrResult.trim().length ? true : false}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Search Code Number
              </InputLabel>
              <OutlinedInput
                onChange={(e) => setQrResult(e.target.value)}
                value={qrResult}
                variant="filled"
                id="outlined-adornment-password"
                type={"text"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleOpenQr()}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <QrCodeScannerIcon color="primary" fontSize="large" />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search Code Number"
              />
            </FormControl>

            <Button
              startIcon={<AddIcon />}
              variant="contained"
              sx={{ ml: 2, px: 4 }}
              onClick={() => handleModal(true)}
            >
              Add
            </Button>
          </Box>
          <Card>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontFamily: "Poppins", fontWeight: "bold" }}>
                    Code #
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              </TableBody>
            </Table>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <ViewDialog
          handleView={handleView}
          viewData={viewData}
          codeData={codeData}
        ></ViewDialog>
        <DeletDialog
          handleDeleteModal={handleDeleteModal}
          deleteData={deleteData}
          codeData={codeData}
        ></DeletDialog>
        <ModalDialog openModal={openModal} handleModal={handleModal} />
        <Grid container sx={{ width: "50%", mx: "auto" }}>
          <Grid item xs={12} justifyContent="center">
            <Qr openQr={openQr} handleQr={handleQr} handleStop={handleStop} />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", my: 2 }}>
          <FormControl
            variant="outlined"
            fullWidth
            focused={qrResult.trim().length ? true : false}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Search Code Number
            </InputLabel>
            <OutlinedInput
              onChange={(e) => setQrResult(e.target.value)}
              value={qrResult}
              variant="filled"
              id="outlined-adornment-password"
              type={"text"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleOpenQr()}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <QrCodeScannerIcon color="primary" fontSize="large" />
                  </IconButton>
                </InputAdornment>
              }
              label="Search Code Number"
            />
          </FormControl>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            sx={{ ml: 2, px: 4 }}
            onClick={() => handleModal(true)}
          >
            Add
          </Button>
        </Box>
        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: "Poppins", fontWeight: "bold" }}>
                  Code #
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length
                ? filteredData.map((m) => {
                    return (
                      <TableRow key={m.id}>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          {m?.code}
                        </TableCell>
                        <TableCell align="center" padding="normal">
                          <Button
                            startIcon={<RemoveRedEyeIcon />}
                            sx={{ textTransform: "capitalize", mr: 2 }}
                            onClick={() => {
                              setViewData(true);
                              setCodeData(m);
                            }}
                          >
                            View
                          </Button>
                          <Button
                            color="error"
                            startIcon={<DeleteForeverIcon />}
                            sx={{ textTransform: "capitalize" }}
                            onClick={() => {
                              setCodeData(m);
                              setDeleteData(true);
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : reciepts.map((m) => {
                    return (
                      <TableRow key={m.id}>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          {m?.code}
                        </TableCell>
                        <TableCell align="center" padding="normal">
                          <Button
                            startIcon={<RemoveRedEyeIcon />}
                            sx={{ textTransform: "capitalize", mr: 2 }}
                            onClick={() => {
                              setViewData(true);
                              setCodeData(m);
                            }}
                          >
                            View
                          </Button>
                          <Button
                            color="error"
                            startIcon={<DeleteForeverIcon />}
                            sx={{ textTransform: "capitalize" }}
                            onClick={() => {
                              setCodeData(m);
                              setDeleteData(true);
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </Card>
      </Container>
    </>
  );
}

export default App;
