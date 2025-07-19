import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { Comment } from "../models/comment";
import {
  DeleteOutlined,
  EditOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import { useCallback, useState } from "react";
import ModalDeleteCommentConfirmation from "./modals/ModalDeleteCommentConfirmation";
import DrawerComment from "./drawers/DrawerComment";

interface CommentCardProps {
  data: Comment;
}

export default function CommentCard({ data }: CommentCardProps) {
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
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={data?.name} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Box display="flex" flexDirection="column">
                  <Typography variant="body1">{data?.name}</Typography>
                  <Typography variant="body2">{data?.email}</Typography>
                </Box>
                <IconButton
                  aria-label="more"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                >
                  <MoreVertOutlined />
                </IconButton>
              </Box>
            </>
          }
          secondary={<>{data?.body}</>}
        />
      </ListItem>
      <Divider variant="inset" component="li" />

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

      <ModalDeleteCommentConfirmation
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        name={data?.name}
        id={data?.id}
      />

      <DrawerComment
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        data={data}
        postId={data.postId}
      />
    </>
  );
}
