import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ROUTE_LIST } from "./routeList";
import PostList from "../pages/PostList";
import PostById from "../pages/PostById";
import MainLayout from "../components/mainLayout";

export default function RouterList() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTE_LIST.ROOT} element={<PostList />} />
          <Route path={ROUTE_LIST.POST_BY_ID} element={<PostById />} />
        </Route>
      </Routes>
    </Router>
  );
}
