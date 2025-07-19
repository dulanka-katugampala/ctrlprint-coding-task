import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";
import React from "react";

const SkeletonComment = React.memo(function SkeletonComment() {
  return (
    <>
      <ListItem alignItems="flex-start" sx={{ width: "100%" }}>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          sx={{ width: "100%" }}
          primary={
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                mb={1}
              >
                <Box display="flex" flexDirection="column" width="100%">
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", width: "35%", minWidth: "130px" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", width: "35%", minWidth: "130px" }}
                  />
                </Box>
              </Box>
            </>
          }
          secondary={<Skeleton variant="text" sx={{ fontSize: "1rem" }} />}
        />
      </ListItem>
    </>
  );
});

export default SkeletonComment;
