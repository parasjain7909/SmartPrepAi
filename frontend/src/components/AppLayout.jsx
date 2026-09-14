import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar.jsx'

const AppLayout = () => {
    return (
        <div className="min-h-screen w-full bg-[#0A0E17]">
            <Navbar />
            <Outlet />
        </div>
    )
}

export default AppLayout