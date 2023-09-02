import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
} from "@mui/material";
import React from "react";

function ViewDialog({ handleView, viewData, codeData }) {
  const handleClose = () => {
    handleView();
  };

  return (
    <Dialog
      open={viewData}
      onClose={() => handleClose()}
      fullWidth={true}
      maxWidth={"xs"}
      fullScreen
    >
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              color: "success.main",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            View Data
          </Typography>
          <Typography variant="h6" sx={{fontWeight:"bold"}}>{codeData?.code}</Typography>

          <Button onClick={() => handleClose()} variant="contained">
            <Typography>Back</Typography>
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <img
            src={`http://localhost:4000/public/images/${codeData?.code}/1.jpg`}
            alt=""
            // srcset=""
            height={"100%"}
            width={"100%"}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ViewDialog;
