import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Skeleton,
} from "@mui/material";

const SkeletonPost = React.memo(function SkeletonPost() {
  return (
    <>
      <Card>
        <CardHeader
          title={<Skeleton variant="text" sx={{ fontSize: "2rem", width: "35%" }} />}
        />
        <CardContent sx={{ pt: 0 }}>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="rounded" sx={{ width: "35%", mt: 2 }} />
        </CardContent>
      </Card>
    </>
  );
});

export default SkeletonPost;
