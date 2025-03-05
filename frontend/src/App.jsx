import "./App.css";
import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import UserProtected from "./pages/UserProtected";


function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup"  element={<UserSignup />} />
          <Route path="/captainLogin"  element={<CaptainLogin />} />
          <Route path="/captainSignup"  element={<CaptainSignup />} />
          <Route path="/home" element={
            <UserProtected>
              <Home />
            </UserProtected>
            } />
        </Routes>
      </div>
    </>
  );
}

export default App;
