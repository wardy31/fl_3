import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import React from "react";
import { useSelector } from "react-redux";
import store from "../store/store";
import { deleteReciept } from "../store/httpReciept";

function DeletDialog({ handleDeleteModal, deleteData, codeData }) {
  const { loading } = useSelector((state) => state.reciept.delete);

  const handleClose = () => {
    handleDeleteModal();
  };

  const handleDelete = async() => {
    const res = await store.dispatch(deleteReciept(codeData?.id));
    if(res){
      handleClose()
    }
  };

  return (
    <Dialog
      open={deleteData}
      onClose={() => handleClose()}
      fullWidth={true}
      maxWidth={"xs"}
    >
      <DialogTitle color={"error"}>Delete</DialogTitle>
      <DialogContent>
        <Typography>Delete This {codeData?.code} ?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>
          <Typography sx={{ color: "grey" }}>Cancel</Typography>
        </Button>
        <LoadingButton
          variant="contained"
          color={"error"}
          loading={Boolean(loading)}
          onClick={() => handleDelete()}
        >
          <Typography>Delete</Typography>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default DeletDialog;
