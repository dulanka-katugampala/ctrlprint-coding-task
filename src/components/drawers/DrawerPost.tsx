import { useCallback, useMemo } from "react";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { PostForm, PostFormData } from "../../forms/postForm";
import { postStore } from "../../store/postStore";
import { Post } from "../../models/post";

interface DrawerCreatePostProps {
  drawerOpen: boolean;
  data?: Post | null;
  setDrawerOpen: (open: boolean) => void;
}

export default function DrawerPost({
  data = null,
  drawerOpen,
  setDrawerOpen,
}: DrawerCreatePostProps) {
  const handleSubmit = useCallback(
    async (formData: PostFormData) => {
      if (data === null) {
        const post = {
          ...formData,
          userId: 1,
        };
        await postStore.add(post);
      } else {
        const post = { ...formData, userId: data.userId };
        await postStore.edit(data.id, post);
      }
      setDrawerOpen(false);
    },
    [setDrawerOpen, postStore]
  );

  const handleCancel = useCallback(() => {
    setDrawerOpen(false);
  }, [setDrawerOpen]);

  const headerTitle = useMemo(
    () => (data ? "Update Post" : "Create Post"),
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
            <PostForm
              loading={postStore.loading.loading}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              defaultValues={data}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
