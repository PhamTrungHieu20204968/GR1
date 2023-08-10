import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin";
import HomeAdmin from "./pages/HomeAdmin/HomeAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/LoginAdmin" element={<LoginAdmin />} />
      <Route path="/HomeAdmin" element={<HomeAdmin />} />
    </Routes>
  );
}

export default App;
