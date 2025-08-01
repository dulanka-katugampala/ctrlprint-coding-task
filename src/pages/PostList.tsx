import { useEffect, useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { observer } from "mobx-react";
import { Box, Button } from "@mui/material";
import { PostAddOutlined } from "@mui/icons-material";
import { postStore } from "../store/postStore";
import PostCard from "../components/postCard";
import SkeletonPost from "../components/skeletons/SkeletonPost";
import DrawerPost from "../components/drawers/DrawerPost";
import { ROUTE_LIST } from "../router/routeList";

const BlogPage = observer(() => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleViewComments = useCallback(
    (id: string | undefined) => {
      navigate(`${ROUTE_LIST.POSTS}/${id}`);
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
  }, [postStore.loading.loading, handleViewComments]);

  const postList = useMemo(() => {
    return postStore.loading.loading ? (
      postListSkeleton
    ) : (
      <Box display="flex" flexDirection="column" gap={3}>
        {postStore.posts.map((post) => (
          <PostCard
            key={post.id}
            data={post}
            onViewComments={handleViewComments}
          />
        ))}
      </Box>
    );
  }, [
    postStore.posts,
    postStore.loading.loading,
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
      <Box display="flex" justifyContent="flex-start" sx={{ my: 2 }}>
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
