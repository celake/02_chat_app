import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import SettingsPage from "./Pages/SettingsPage";

export default function App() {
  return (
    <div>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/signup" element={<SignUpPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="/settings" element={<SettingsPage />}/>
        </Routes>
    </div>
  )
}


