import { Routes, Route, Navigate } from "react-router";
import { Loader } from 'lucide-react';
import { useEffect } from 'react';

import { useAuthStore } from "./store/useAuthStore";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import SettingsPage from "./Pages/SettingsPage";

export default function App() {
    const { authUser, checkAuth, isCheckingAuth} = useAuthStore();

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    console.log( { authUser });

    if (isCheckingAuth && !authUser) return (
        <div className="flex items-center ustify-center h-screen">
            <Loader className="size-10 animate-spin" />
        </div>
    )
    
  return (
    <div>
        <Navbar />
        <Routes>
            <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/login'/> } />
            <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={'/'} /> }/>
            <Route path="/login" element={ !authUser ?<LoginPage /> : <Navigate to={'/'} /> }/>
            <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to='/login'/>} />
            <Route path="/settings" element={<SettingsPage />}/>
        </Routes>
    </div>
  )
}


