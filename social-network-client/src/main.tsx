import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import {HeroUIProvider} from "@heroui/react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ThemeProvider} from "./components/theme-provider";
import {AuthGuard} from "./features/user/authGuard";
import {Auth} from "./pages/auth";
import {Layout} from "./components/layout";
import {Posts} from "./pages/posts";
import {CurrentPost} from "./pages/current-post";
import {UserProfile} from "./pages/user-profile";

const container = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Posts />,

      },
      {
        path: "posts/:id",
        element: <CurrentPost />,
      },
      {
        path: "users/:id",
        element: <UserProfile />,
      },
    ],
  }
])

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <HeroUIProvider>
          <ThemeProvider>
            <AuthGuard>
              <RouterProvider router={router} />
            </AuthGuard>
          </ThemeProvider>
        </HeroUIProvider>
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
