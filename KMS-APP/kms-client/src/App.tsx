import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Data from "./components/dataverse/Data";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Data />} />
      </Routes>
    </div>
  );
}

export default App;
