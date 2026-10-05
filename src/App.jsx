import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/consultation" />} />
      <Route path="/consultation" element={<Home />} />
      <Route path="*" element={<Navigate replace to="/consultation" />} />
    </Routes>
  );
}

export default App;