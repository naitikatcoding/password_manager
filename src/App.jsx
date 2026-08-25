import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./assets/Components/Navbar";
import Manager from "./assets/Components/Manager";
import About from "./assets/Components/About";
import Contact from "./assets/Components/Contact";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Manager /> 
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Navbar />
        <About />
      </>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
        <Navbar />
        <Contact />
      </>
    ),
  },
]);

function App() {

  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
