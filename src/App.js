import React from "react";
import ReactDOM from "react-dom/client";
// this is called as default import
import Header from "./components/Header";
import Body from "./components/Body"
import Footer from "./components/Footer"
import About from "./components/About";
import Error from "./components/Error";
import Services from "./components/Service";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import SignIn from "./components/SignIn";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Cart from "./components/Cart";

const Applayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Body />
      },
      {
        path: 'about',
        element: <About />,
        //route url ecome /about/profile
        // children: [{ // nested routing
        //   path: "profile",
        //   element: <Profile />,
        // }]
      },
      {
        path: '/service',
        element: <Services />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/restaurant/:menuId',
        element: <RestaurantMenu />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
    ]
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />); 