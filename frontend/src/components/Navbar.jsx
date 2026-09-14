import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth.jsx'

const NAV_ITEMS = [
    {
        to: '/profile', label: 'Dashboard',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg>)
    },
    {
        to: '/home', label: 'Resume Analyzer',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>)
    },
    {
        to: '/study-plan', label: 'Study Planner',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>)
    },
    {
        to: '/resources', label: 'Resources',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>)
    },
]

const PUBLIC_LINKS = [
    { to: '#features', label: 'Features' },
    { to: '#how-it-works', label: 'How it works' },
    { to: '#roles', label: 'Roles' },
]

const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const [ menuOpen, setMenuOpen ] = useState(false)
    const [ mobileOpen, setMobileOpen ] = useState(false)
    const [ scrolled, setScrolled ] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
        setMenuOpen(false)
    }, [ location.pathname ])

    const initial = user?.username?.charAt(0).toUpperCase() || "?"

    const onLogout = async () => {
        setMenuOpen(false)
        await handleLogout()
        navigate('/')
    }

    return (
        <nav
            className={`sticky top-0 z-50 border-b transition-all duration-300 ${
                scrolled
                    ? 'border-white/[0.09] bg-[#0A0F18]/95 backdrop-blur-xl shadow-[0_8px_30px_-15px_rgba(0,0,0,0.6)]'
                    : 'border-white/[0.05] bg-[#0A0F18]/70 backdrop-blur-md'
            }`}
        >
            <style>{`
                @keyframes smartprep-drift-1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -12px); } }
                @keyframes smartprep-drift-2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-30px, 14px); } }
                @keyframes smartprep-shimmer { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
            `}</style>

            {/* Ambient background layer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute -top-24 left-[10%] w-[320px] h-[320px] rounded-full bg-cyan-500/[0.07] blur-[90px]"
                    style={{ animation: 'smartprep-drift-1 13s ease-in-out infinite' }}
                />
                <div
                    className="absolute -top-28 right-[15%] w-[300px] h-[300px] rounded-full bg-violet-500/[0.06] blur-[90px]"
                    style={{ animation: 'smartprep-drift-2 16s ease-in-out infinite' }}
                />
            </div>

            <div className="relative flex items-center h-16 sm:h-[76px] lg:h-[88px] px-6 sm:px-10 lg:px-16">

                {/* Logo — left */}
                <Link to={user ? "/home" : "/"} className="flex items-center gap-3 shrink-0 group">
                    <span className="relative w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 flex items-center justify-center text-[#0A0F18] text-base font-bold transition-all duration-200 group-hover:scale-[1.04] group-hover:brightness-110 shadow-[0_0_18px_-6px_rgba(56,189,248,0.5)] group-hover:shadow-[0_0_24px_-4px_rgba(56,189,248,0.7)]">
                        S
                    </span>
                    <span className="text-[15px] font-semibold text-white/95 tracking-tight hidden sm:inline">SmartPrep AI</span>
                </Link>

                {/* Center — floating glass nav group */}
                {user ? (
                    <div className="hidden lg:flex items-center gap-1 mx-auto rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm p-1.5">
                        {NAV_ITEMS.map(item => {
                            const active = location.pathname.startsWith(item.to)
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                                        active
                                            ? 'text-white bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-violet-400/10 border border-cyan-400/20 shadow-[0_0_20px_-10px_rgba(34,211,238,0.6)]'
                                            : 'text-slate-400 border border-transparent hover:text-slate-100 hover:bg-white/[0.04] hover:-translate-y-px hover:shadow-[0_4px_16px_-10px_rgba(56,189,248,0.35)]'
                                    }`}
                                >
                                    <span className={active ? 'text-cyan-300' : 'text-slate-500'}>{item.icon}</span>
                                    {item.label}
                                    {active && (
                                        <span
                                            className="absolute left-3 right-3 -bottom-[7px] h-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400"
                                            style={{ backgroundSize: '200% 100%', animation: 'smartprep-shimmer 3s linear infinite' }}
                                        />
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                ) : (
                    <div className="hidden lg:flex items-center gap-8 mx-auto text-sm text-slate-400">
                        {PUBLIC_LINKS.map(link => (
                            <a key={link.to} href={link.to} className="hover:text-white transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}

                {/* Right side */}
                <div className="flex items-center gap-2 ml-auto lg:ml-0">

                    {user ? (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setMenuOpen(o => !o)}
                                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pl-1.5 pr-2.5 py-1.5 hover:border-cyan-400/25 hover:shadow-[0_0_18px_-8px_rgba(56,189,248,0.5)] transition-all duration-200"
                            >
                                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 flex items-center justify-center text-[#0A0F18] text-xs font-bold">
                                    {initial}
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`hidden sm:block text-slate-500 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9" /></svg>
                            </button>

                            <div
                                className={`absolute right-0 mt-3 w-60 rounded-2xl border border-white/10 bg-[#0C111C]/95 backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.75)] overflow-hidden origin-top-right transition-all duration-200 ${
                                    menuOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-1.5 scale-95 pointer-events-none'
                                }`}
                            >
                                <div className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.06]">
                                    <span className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 flex items-center justify-center text-[#0A0F18] text-sm font-bold shrink-0">
                                        {initial}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-white truncate">{user.username}</p>
                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <div className="p-1.5">
                                    <Link
                                        to="/profile"
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/[0.05] hover:text-white transition-colors"
                                    >
                                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 text-cyan-300 shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                        </span>
                                        Profile & settings
                                    </Link>
                                </div>
                                <div className="p-1.5 border-t border-white/[0.06]">
                                    <button
                                        onClick={onLogout}
                                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-rose-400/[0.06] hover:text-rose-300 transition-colors"
                                    >
                                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 text-rose-300 shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                        </span>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="hidden lg:inline-flex items-center gap-2 rounded-xl border border-white/10 text-sm font-medium text-slate-200 px-4 py-2.5 hover:bg-white/[0.05] hover:border-cyan-400/25 transition-all duration-200"
                        >
                            Sign in
                        </Link>
                    )}

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(o => !o)}
                        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-slate-300"
                    >
                        {mobileOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 border-t border-white/[0.06] bg-[#0A0F18]/95 backdrop-blur-xl ${
                    mobileOpen ? 'max-h-[26rem] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="flex flex-col gap-1.5 px-4 py-4">
                    {user ? (
                        NAV_ITEMS.map(item => {
                            const active = location.pathname.startsWith(item.to)
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] transition-colors ${
                                        active
                                            ? 'text-white bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-violet-400/10 border border-cyan-400/20'
                                            : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-100'
                                    }`}
                                >
                                    <span className={active ? 'text-cyan-300' : 'text-slate-500'}>{item.icon}</span>
                                    {item.label}
                                </Link>
                            )
                        })
                    ) : (
                        <>
                            {PUBLIC_LINKS.map(link => (
                                <a key={link.to} href={link.to} className="px-4 py-3.5 rounded-xl text-[15px] text-slate-400 hover:bg-white/[0.04] hover:text-slate-100 transition-colors">
                                    {link.label}
                                </a>
                            ))}
                            <Link
                                to="/login"
                                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 text-[15px] font-medium text-slate-200 px-4 py-3 hover:bg-white/[0.05] transition-colors"
                            >
                                Sign in
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar