import "./App.css";
import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import UserProtected from "./pages/UserProtected";
import UserLogout from "./pages/UserLogout";
import CaptainProtected from "./pages/CaptainProtected";
import CaptainLogout from "./pages/CaptainLogout";


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
          <Route path="/home" element={<UserProtected> <Home /> </UserProtected>} />
          <Route path="*" element={() => <h1>Not Found</h1>} /> 
          <Route path="/userLogout" element={ <UserProtected> <UserLogout /> </UserProtected>} />
          <Route path="/captainLogout" element={ <CaptainProtected> <CaptainLogout /> </CaptainProtected>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
