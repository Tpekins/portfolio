import { type RouteRecord } from "vite-react-ssg";
import React from "react";

const Layout = React.lazy(() => import("./App"));
const Home = React.lazy(() => import("./pages/Home"));
const Projects = React.lazy(() => import("./pages/Projects"));
const About = React.lazy(() => import("./pages/About"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const Feed = React.lazy(() => import("./pages/Feed"));
const Contact = React.lazy(() => import("./pages/Contact"));

const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    entry: "./src/App.tsx",
    children: [
      {
        index: true,
        element: <Home />,
        entry: "./src/pages/Home.tsx",
      },
      {
        path: "projects",
        element: <Projects />,
        entry: "./src/pages/Projects.tsx",
      },
      {
        path: "about",
        element: <About />,
        entry: "./src/pages/About.tsx",
      },
      {
        path: "blog",
        element: <Blog />,
        entry: "./src/pages/Blog.tsx",
      },
      {
        path: "blog/:slug",
        element: <BlogPost />,
        entry: "./src/pages/BlogPost.tsx",
      },
      {
        path: "feed",
        element: <Feed />,
        entry: "./src/pages/Feed.tsx",
      },
      {
        path: "contact",
        element: <Contact />,
        entry: "./src/pages/Contact.tsx",
      },
    ],
  },
];

export default routes;
