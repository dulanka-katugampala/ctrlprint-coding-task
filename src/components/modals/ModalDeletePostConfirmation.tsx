import { useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { postStore } from "../../store/postStore";

interface ModalDeleteConfirmationProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  title: string;
  id: string;
}

export default function ModalDeleteConfirmation({
  openDialog,
  setOpenDialog,
  title,
  id,
}: ModalDeleteConfirmationProps) {
  const handleClose = useCallback(() => {
    setOpenDialog(false);
  }, [setOpenDialog]);

  const handleDelete = useCallback(async () => {
    await postStore.deletePost(id);
    setOpenDialog(false);
  }, [setOpenDialog, id, postStore]);

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
          Are you sure you want to delete this post?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete post "
            <i>
              <b>{title}</b>
            </i>{" "}
            "? This action cannot be undone and will also remove all associated
            data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleDelete}
            autoFocus
            color="error"
            loading={postStore.loading.loading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
