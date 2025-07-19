import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Button, List, Typography } from "@mui/material";
import { ArrowBackOutlined } from "@mui/icons-material";
import PostCard from "../components/postCard";
import { ROUTE_LIST } from "../router/routeList";
import { postStore } from "../store/postStore";
import { commentStore } from "../store/commentStore";
import CommentCard from "../components/commentCard";
import DrawerComment from "../components/drawers/DrawerComment";
import { observer } from "mobx-react";
import SkeletonComment from "../components/skeletons/SkeletonComment";
import SkeletonPost from "../components/skeletons/SkeletonPost";

const PostById = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const onBackToPosts = useCallback(() => {
    navigate(ROUTE_LIST.ROOT);
  }, [navigate]);

  const post = useMemo(() => {
    if (id) {
      return <PostCard data={postStore.getPostById(id) || null} hideActions />;
    }
    return null;
  }, [postStore.posts, postStore.loading.loading, postStore.getPostById, id]);

  const commentsList = useMemo(() => {
    if (id) {
      return (
        <List sx={{ width: "100%" }}>
          {commentStore.getCommentsByPostId(id).map((comment) => (
            <CommentCard key={comment.id} data={comment} />
          ))}
        </List>
      );
    }
  }, [
    commentStore.comments,
    commentStore.loading,
    commentStore.getCommentsByPostId,
    id,
  ]);

  const Loading = useMemo(() => {
    return commentStore.loading.loading || postStore.loading.loading;
  }, [commentStore.loading.loading, postStore.loading.loading]);

  const skeleton = useMemo(() => {
    return (
      <>
        <SkeletonPost />
        <Box display="flex" flexDirection="column" mt={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Comments</Typography>
            <Button color="primary" onClick={() => setDrawerOpen(true)}>
              Add Comment
            </Button>
          </Box>
          <SkeletonComment />
          <SkeletonComment />
          <SkeletonComment />
        </Box>
      </>
    );
  }, [commentStore.loading.loading, postStore.loading.loading]);

  useEffect(() => {
    postStore.getPosts();
    commentStore.getComments();
  }, []);

  return (
    <Box pt={2}>
      <Box display="flex" justifyContent="flex-start" sx={{ my: 2 }}>
        <Button color="primary" onClick={onBackToPosts}>
          <ArrowBackOutlined sx={{ mr: 1 }} />
          Back to Posts
        </Button>
      </Box>

      {Loading ? (
        skeleton
      ) : (
        <>
          {post}
          <Box display="flex" flexDirection="column" mt={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Comments</Typography>
              <Button color="primary" onClick={() => setDrawerOpen(true)}>
                Add Comment
              </Button>
            </Box>
            {commentsList}
          </Box>
        </>
      )}

      <DrawerComment
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        data={null}
        postId={id || ""}
      />
    </Box>
  );
});

export default PostById;
