import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from "lucide-react"
import {Toaster} from "react-hot-toast"

function App() {
  const { authUser, checkAuth, ischeckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({ authUser })

  if (ischeckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }


  return (
    <div>
      <Navbar />
      <Routes >
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage />: <Navigate to={"/"}/>}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"}/>}/>
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/profile" element={authUser ?  <ProfilePage /> : <Navigate to={"/login"}/>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
