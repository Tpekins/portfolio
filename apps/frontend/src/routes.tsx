import type { RouteRecord } from "vite-react-ssg";
import App from "./App";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Feed from "./pages/Feed";
import Contact from "./pages/Contact";

const routes: RouteRecord[] = [
  {
    path: "/",
    Component: App,
    children: [
      { path: "", element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "about", element: <About /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <BlogPost /> },
      { path: "feed", element: <Feed /> },
      { path: "contact", element: <Contact /> },
    ],
  },
];

export default routes;
