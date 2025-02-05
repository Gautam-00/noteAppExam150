import { useState } from 'react'
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Privateroute from './components/auth/privateroute'
import AddForm from './pages/AddForm'

function App() {

  return (
    <>
    <Router>
      <Routes>

            <Route path='/' element={<Home/>} />
            <Route path='/auth' element={<Auth/>} />
            <Route path='/add' element={<AddForm/>} />
      </Routes>
      </Router>
    </>
  )
}

export default App
