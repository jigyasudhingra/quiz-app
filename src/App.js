import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Screens/Home";
import QuizPlay from "./Screens/QuizPlay";
import QuizDemo from "./Screens/QuizDemo";
import Navbar from "./Navbar";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/play/:id",
    element: <QuizPlay />,
  },
  {
    path: "/edit/:id",
    element: <QuizDemo />,
  },
  {
    path: "/create",
    element: <QuizDemo />,
  },
]);

const App = () => {
  return (
    <div>
      <Navbar />
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
