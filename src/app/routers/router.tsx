import { createBrowserRouter } from "react-router-dom";

import { Layout } from "@/app/Layout/Layout";
import { routers } from "@/app/routers";
import { Admin } from "@/pages/Admin/Admin";
import { Articles } from "@/pages/Admin/Articles";
import { Comments } from "@/pages/Admin/Comments";
import { Users } from "@/pages/Admin/Users";
import { ArticlePage } from "@/pages/Article/Article";
import { Contacts } from "@/pages/Contacts";
import { CreateArticle } from "@/pages/CreateArticle/CreateArticle";
import { Error } from "@/pages/Error/Error";
import { Login } from "@/pages/Login";
import { Main } from "@/pages/Main/Main";
import { Registration } from "@/pages/Registration";

import { ProtectedAdminRoute, ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: routers.root,
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: routers.login,
        element: <Login />,
      },
      {
        path: routers.signup,
        element: <Registration />,
      },
      {
        path: routers.root,
        element: <Main />,
      },
      {
        path: routers.profile,
        element: (
          <ProtectedRoute>
            <>profile</>
          </ProtectedRoute>
        ),
      },
      {
        path: routers.article,
        element: <ArticlePage />,
      },
      {
        path: routers.createArticle,
        element: <CreateArticle />,
      },
      {
        path: routers.about,
        element: <>about</>,
      },
      {
        path: routers.contacts,
        element: <Contacts />,
      },
      {
        path: routers.admin,
        element: (
          <ProtectedAdminRoute>
            <Admin />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: routers.adminArticles,
        element: (
          <ProtectedAdminRoute>
            <Articles />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: routers.adminComments,
        element: (
          <ProtectedAdminRoute>
            <Comments />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: routers.adminUsers,
        element: (
          <ProtectedAdminRoute>
            <Users />
          </ProtectedAdminRoute>
        ),
      },
    ],
  },
]);
