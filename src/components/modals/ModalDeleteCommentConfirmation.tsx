import { useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { commentStore } from "../../store/commentStore";

interface ModalDeleteCommentConfirmationProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  name: string;
  id: string;
}

export default function ModalDeleteCommentConfirmation({
  openDialog,
  setOpenDialog,
  name,
  id,
}: ModalDeleteCommentConfirmationProps) {
  const handleClose = useCallback(() => {
    setOpenDialog(false);
  }, [setOpenDialog]);

  const handleDelete = useCallback(async () => {
    await commentStore.delete(id);
    setOpenDialog(false);
  }, [setOpenDialog, id, commentStore.delete]);

  return (
    <>
      <Dialog
        open={openDialog}
        closeAfterTransition
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this comment?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete{" "}
            {!name ? (
              "this comment ?"
            ) : (
              <>
                comment from "
                <i>
                  <b>{name}</b>
                </i>
                " ?
              </>
            )}{" "}
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleDelete}
            autoFocus
            color="error"
            loading={commentStore.loadingDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
