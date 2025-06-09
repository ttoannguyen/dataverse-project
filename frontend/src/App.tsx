import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";
import "./styles/globals.css";
import "./styles/swiper.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((child) => (
              <Route
                key={child.path || "index"}
                index={child.index}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
