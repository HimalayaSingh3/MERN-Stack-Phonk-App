import React from 'react'
import Navbar from './Navbar'
import Footer from "./Footer"

const Layout = ({children}) => {
  return (
    <div className='h-screen'>
    <header>
        <Navbar/>
    </header>
    <main className=''>
        {children}
    </main>
    <footer>
        
    </footer>
    </div>
  )
}

export default Layout
