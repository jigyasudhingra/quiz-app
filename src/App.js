import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Screens/Home";
import QuizCreation from "./Screens/QuizCreation";
import QuizPlay from "./Screens/QuizPlay";
import QuizDemo from "./Screens/QuizDemo";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/play",
    element: <QuizPlay />,
  },
  {
    path: "/create",
    element: <QuizDemo />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
