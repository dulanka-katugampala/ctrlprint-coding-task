import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <Container maxWidth="sm">
        <AppBar position="fixed" color="default">
          <Container maxWidth="sm">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Mini Blog
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <Box sx={{ mt: 8 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
