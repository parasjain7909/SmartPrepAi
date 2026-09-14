import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/")
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex justify-center items-center">
                <h1 className="text-xl font-semibold">Loading.......</h1>
            </main>
        )
    }

    return (
        <main className="min-h-screen w-full flex justify-center items-center">
            <div className="min-w-[350px] flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-center">Register</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-sm font-medium">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Enter username'
                            className="border-none outline-none px-4 py-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address'
                            className="border-none outline-none px-4 py-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password'
                            className="border-none outline-none px-4 py-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    <button className='button primary-button'>Register</button>

                </form>

                <p className="text-sm text-center">
                    Already have an account? <Link to={"/login"} className="text-pink-600 font-medium hover:underline">Login</Link>
                </p>
            </div>
        </main>
    )
}

export default Register