import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import PostDetailPage from "../pages/PostDetailPage";
import PostEditorPage from "../pages/PostEditorPage";
import SearchResultsPage from "../pages/SearchResultsPage";
import PostsPage from "../pages/PostsPage";
import { createBrowserRouter } from "react-router";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "posts",
        element: <PostsPage />
      },
      {
        path: "posts/:slug",
        element: <PostDetailPage />
      },
      {
        path: "create",
        element: <PostEditorPage />
      },
      {
        path: "edit/:slug",
        element: <PostEditorPage />
      },
      {
        path: "/search",
        element: <SearchResultsPage />
      }
    ]
  }
])