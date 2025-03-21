import React from 'react'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '@/components/Footer'

const Layout = () => {
  return (
    <div>
        <nav>
            <Navbar/>
        </nav>
        <main>
            <Outlet/>
        </main>
        <footer>
          <Footer/>
        </footer>
    </div>
  )
}

export default Layout