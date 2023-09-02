import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";

function Qr({ openQr, handleQr, handleStop }) {
  useEffect(() => {
    if (openQr) {
      const html5QrCode = new Html5Qrcode(/* element id */ "reader");
      html5QrCode
        .start(
          { facingMode: "environment" },
          {
            fps: 10, // Optional, frame per seconds for qr code scanning
            qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI

          },
          (decodedText, decodedResult) => {
            console.log("decodedText", decodedText);
            handleQr(decodedText);
            html5QrCode.stop();
          },
          (errorMessage) => {
            // parse error, ignore it.
          }
        )
        .catch((err) => {
          // Start failed, handle it.
        });
    }
  }, [openQr]);

  const handleStopQR = () => {
    const html5QrCode = new Html5Qrcode(/* element id */ "reader");
    html5QrCode.clear();
    handleStop();
  };

  if (!openQr) {
    return <div></div>;
  }
  return (
    <div>
      <div id="reader" style={{margin:"0"}}></div>
      <Box sx={{my:2}}>
        <Button color="error" variant="contained" fullWidth onClick={() => handleStopQR()}>
          Stop
        </Button>
      </Box>
    </div>
  );
}

export default Qr;
