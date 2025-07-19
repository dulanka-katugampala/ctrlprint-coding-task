import { useCallback, useMemo } from "react";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { CommentForm, CommentFormData } from "../../forms/commentForm";
import { commentStore } from "../../store/commentStore";
import { Comment } from "../../models/comment";

interface DrawerCommentProps {
  drawerOpen: boolean;
  data: Comment | null;
  postId: string;
  setDrawerOpen: (open: boolean) => void;
}

export default function DrawerComment({
  data = null,
  postId,
  drawerOpen,
  setDrawerOpen,
}: DrawerCommentProps) {
  const handleSubmit = useCallback(
    async (formData: CommentFormData) => {
      const comment = { ...formData, postId: postId };
      if (data === null) {
        await commentStore.add(comment);
      } else {
        await commentStore.edit(data.id, comment);
      }
      setDrawerOpen(false);
    },
    [setDrawerOpen, commentStore, postId, data]
  );

  const handleCancel = useCallback(() => {
    setDrawerOpen(false);
  }, [setDrawerOpen]);

  const headerTitle = useMemo(
    () => (data ? "Edit Comment" : "Add Comment"),
    [data]
  );

  return (
    <>
      <Drawer anchor="right" open={drawerOpen} onClose={handleCancel}>
        <Box
          p={2}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">{headerTitle}</Typography>
            <IconButton onClick={handleCancel}>
              <CloseOutlined />
            </IconButton>
          </Box>
          <Box flexGrow={1}>
            <CommentForm onSubmit={handleSubmit} onCancel={handleCancel} defaultValues={data} />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
