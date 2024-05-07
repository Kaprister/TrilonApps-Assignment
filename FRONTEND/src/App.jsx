import { useState } from 'react'
// import './App.css'
// import Login from './pages/Login.jsx'
// import Signup from "./pages/Signup"
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <div>
        <Header/>
        <ToastContainer />
        <main>
          <Outlet/>
        </main>
      </div>
    </>
  )
}

export default App
