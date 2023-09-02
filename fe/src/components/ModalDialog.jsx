import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import Qr from "./Qr";
import { useSelector } from "react-redux";
import { addReciept } from "../store/httpReciept";
import store from "../store/store";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

function ModalDialog({ openModal, handleModal }) {
  const { loading } = useSelector((state) => state.reciept.post);
  const [capImage, setCapImage] = useState(null);
  const [saveDate, setSaveData] = useState({
    code: "",
    image: "",
  });
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setCapImage(imageSrc);
  }, [webcamRef]);

  const [openQr, setOpenQr] = useState(false);
  const [qrResult, setQrResult] = useState("");

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

  const handleSave = () => {
    if (capImage && qrResult) {
      fetch(capImage)
        .then((res) => res.blob())
        .then(async (blob) => {
          const file = new File([blob], "image", { type: "image/png" });
          const form = new FormData();
          form.append("code", qrResult);
          form.append("image", file);
          const res =await store.dispatch(addReciept(form));
          if(res){
            handleModal(false)
            setCapImage("")
            setQrResult("")
          }
          console.log('file',file);
        });
    }
  };

  return (
    <Dialog open={openModal} fullWidth onClose={() => handleModal(false)}>
      <DialogTitle>Add Data</DialogTitle>
      <DialogContent>
        <Box sx={{ m: 2 }}>
          <Qr openQr={openQr} handleQr={handleQr} handleStop={handleStop} />
          <FormControl
            variant="outlined"
            fullWidth
            focused={qrResult.trim().length ? true : false}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Code Number
            </InputLabel>
            <OutlinedInput
              variant="filled"
              id="outlined-adornment-password"
              type={"text"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    onClick={() => handleOpenQr()}
                    edge="end"
                  >
                    <QrCodeScannerIcon color="primary" fontSize="large" />
                  </IconButton>
                </InputAdornment>
              }
              label="Code Number"
              value={qrResult}
              onChange={(e) => setQrResult(e.target.value)}
            />
          </FormControl>
          <Box sx={{ position: "relative", mt: 2 }}>
            {capImage ? (
              <img
                src={capImage}
                style={{ borderRadius: 10 }}
                height={"100%"}
                width="100%"
              />
            ) : (
              <Webcam
                audio={false}
                height={"100%"}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={"100%"}
                style={{ borderRadius: 10 }}
              />
            )}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                bottom: 20,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {capImage ? (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<FlipCameraIosIcon />}
                  onClick={() => setCapImage(null)}
                  color="success"
                >
                  <Typography sx={{ textTransform: "capitalize" }}>
                    Retake
                  </Typography>
                </Button>
              ) : (
                <Button
                  onClick={() => capture()}
                  fontSize={"large"}
                  variant="contained"
                  startIcon={<PhotoCameraIcon />}
                  color="success"
                >
                  <Typography sx={{ textTransform: "capitalize" }}>
                    Capture
                  </Typography>
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleModal(false)}>
          <Typography sx={{ color: "grey" }}>Cancel</Typography>
        </Button>
        <LoadingButton
          variant="contained"
          onClick={() => handleSave()}
          loading={loading}
        >
          <Typography>Save</Typography>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ModalDialog;
