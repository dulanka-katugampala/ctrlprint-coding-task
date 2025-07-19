import React, { useState, useCallback } from "react";
import {
  Card,
  CardActions,
  IconButton,
  Typography,
  CardContent,
  CardHeader,
  Menu,
  MenuItem,
  ListItemIcon,
  MenuList,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Drawer,
  Box,
} from "@mui/material";
import {
  CommentOutlined,
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import DrawerPost from "./drawers/DrawerPost";
import ModalDeleteConfirmation from "./modals/ModalDeleteConfirmation";
import { Post } from "../models/post";

interface PostCardProps {
  data: Post | null;
  hideActions?: boolean;
  onViewComments: (id: string | undefined) => void;
}

function PostCard({
  data = null,
  hideActions = false,
  onViewComments = () => {},
}: PostCardProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open: boolean = Boolean(anchorEl);

  const handleMenuClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClickOpen = useCallback(() => {
    handleMenuClose();
    setOpenDialog(true);
  }, [handleMenuClose, setOpenDialog]);

  const toggleDrawer = useCallback(
    (newOpen: boolean) => () => {
      handleMenuClose();
      setDrawerOpen(newOpen);
    },
    [handleMenuClose, setDrawerOpen]
  );

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardHeader
          action={
            <IconButton
              aria-label="more"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MoreVertOutlined />
            </IconButton>
          }
          title={data?.title}
        />
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body2">{data?.body}</Typography>
        </CardContent>
        {!hideActions && (
          <CardActions>
            <Button onClick={() => onViewComments(data?.id)}>
              <CommentOutlined sx={{ mr: 1 }} />
              View Comments
            </Button>
          </CardActions>
        )}
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            style: {
              width: "200px",
            },
          },
        }}
      >
        <MenuList>
          <MenuItem onClick={toggleDrawer(true)}>
            <ListItemIcon>
              <EditOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClickOpen}>
            <ListItemIcon>
              <DeleteOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>

      <DrawerPost
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        data={data}
      />

      <ModalDeleteConfirmation
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title={data?.title || ""}
        id={data?.id || ""}
      />
    </>
  );
}

export default React.memo(PostCard);
