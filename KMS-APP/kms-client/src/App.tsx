import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Data from "./components/dataverse/Data";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dataverse" element={<Data />} />
      </Routes>
    </div>
  );
}

export default App;
