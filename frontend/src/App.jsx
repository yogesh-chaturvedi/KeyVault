import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Passwords from './pages/Passwords'
import Profile from './pages/Profile'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './utils/ProtectedRoutes'
import AddPassword from './pages/AddPassword'
import ViewPassword from './pages/ViewPassword'
import VaultLocked from './pages/VaultLocked'
import VaultProtectedRoute from './utils/VaultProtectedRoute'

function App() {

  return (
    <>
      <Routes>

        {/* global routes  */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />} >

          <Route path='/vaultLocked' element={<VaultLocked />} />

          <Route element={<VaultProtectedRoute />}>
            <Route path='/' element={<Landing />} />
            <Route path='/passwords' element={<Passwords />} />
            <Route path='/passwords-add' element={<AddPassword />} />
            <Route path='/passwords-add/:id' element={<AddPassword />} />
            <Route path='/viewPassword/:id' element={<ViewPassword />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

        </Route>

      </Routes>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable theme="colored" />

    </>
  )
}

export default App
