import { useEffect, useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { observer } from "mobx-react";
import { Box, Button } from "@mui/material";
import { PostAddOutlined } from "@mui/icons-material";
import { postStore } from "../store/postStore";
import PostCard from "../components/postCard";
import SkeletonPost from "../components/skeletons/SkeletonPost";
import DrawerPost from "../components/drawers/DrawerPost";

const BlogPage = observer(() => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleViewComments = useCallback(
    (id: string | undefined) => {
      navigate(`/posts/${id}`);
    },
    [navigate]
  );

  const postListSkeleton = useMemo(() => {
    return (
      <Box display="flex" flexDirection="column" gap={2}>
        {[1, 2, 3, 4].map((post) => (
          <SkeletonPost key={post} />
        ))}
      </Box>
    );
  }, [postStore.loading, handleViewComments]);

  const postList = useMemo(() => {
    return postStore.loading
      ? postListSkeleton
      : postStore.posts.map((post) => (
          <PostCard
            key={post.id}
            data={post}
            onViewComments={handleViewComments}
          />
        ));
  }, [
    postStore.posts,
    postStore.loading,
    postListSkeleton,
    handleViewComments,
  ]);

  const onAddPost = useCallback(() => {
    setDrawerOpen(true);
  }, [setDrawerOpen]);

  useEffect(() => {
    postStore.getPosts();
  }, []);

  return (
    <Box pt={2}>
      <Box display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
        <Button color="primary" onClick={onAddPost}>
          <PostAddOutlined sx={{ mr: 1 }} />
          Add Post
        </Button>
      </Box>
      {postList}
      <DrawerPost drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </Box>
  );
});

export default BlogPage;
