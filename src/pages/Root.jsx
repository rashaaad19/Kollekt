import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const Root = () => {
  return (
    <div clas>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Root