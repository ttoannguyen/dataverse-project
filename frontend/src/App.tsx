import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import "./styles/globals.css";
import "./styles/swiper.css";

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
