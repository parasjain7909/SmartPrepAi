import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import { getProfile } from '../services/auth.api.js'
import { useNavigate } from 'react-router'

const dotGrid = {
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
    backgroundSize: '22px 22px'
}

const Profile = () => {
    const { user, handleLogout, handleChangePassword } = useAuth()
    const navigate = useNavigate()

    const [ profile, setProfile ] = useState(null)
    const [ profileLoading, setProfileLoading ] = useState(true)

    const [ currentPassword, setCurrentPassword ] = useState("")
    const [ newPassword, setNewPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ passwordMessage, setPasswordMessage ] = useState(null)
    const [ savingPassword, setSavingPassword ] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await getProfile()
            if (data) setProfile(data.profile)
            setProfileLoading(false)
        }
        fetchProfile()
    }, [])

    const handleSubmitPassword = async (e) => {
        e.preventDefault()
        setPasswordMessage(null)

        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: "New password and confirmation don't match." })
            return
        }

        setSavingPassword(true)
        const result = await handleChangePassword({ currentPassword, newPassword })
        setSavingPassword(false)

        setPasswordMessage({ type: result.success ? 'success' : 'error', text: result.message })

        if (result.success) {
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        }
    }

    if (profileLoading || !profile) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center bg-[#0A0E17]">
                <p className="text-sm font-mono text-slate-500 animate-pulse">// loading your profile...</p>
            </main>
        )
    }

    const initial = profile.username?.charAt(0).toUpperCase() || "?"

    return (
        <div className="min-h-screen w-full bg-[#0A0E17] text-slate-100 px-6 sm:px-10 lg:px-16 py-20" style={dotGrid}>
            <div className="max-w-4xl mx-auto flex flex-col gap-12">

                {/* Header */}
                <header className="flex items-center gap-5">
                    <span className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-[#0A0E17] text-2xl font-bold shrink-0">
                        {initial}
                    </span>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{profile.username}</h1>
                        <p className="text-sm text-slate-400 mt-1">{profile.email}</p>
                    </div>
                    <button
                        onClick={() => { handleLogout(); navigate('/login') }}
                        className="ml-auto inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium px-4 py-2 hover:bg-white/10 transition-colors"
                    >
                        Sign out
                    </button>
                </header>

                {/* Stats */}
                <section className="grid sm:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-[#10151F] p-6 flex flex-col gap-1">
                        <span className="text-xs font-mono text-slate-500">reports_generated</span>
                        <span className="text-3xl font-bold text-white">{profile.stats.reportsGenerated}</span>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#10151F] p-6 flex flex-col gap-1">
                        <span className="text-xs font-mono text-slate-500">study_plans_created</span>
                        <span className="text-3xl font-bold text-white">{profile.stats.studyPlansCreated}</span>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#10151F] p-6 flex flex-col gap-1">
                        <span className="text-xs font-mono text-slate-500">overall_completion</span>
                        <span className="text-3xl font-bold text-cyan-300">{profile.stats.overallCompletion}%</span>
                    </div>
                </section>

                {/* Change Password */}
                <section className="rounded-2xl border border-white/10 bg-[#10151F] overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-black/20">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                        <span className="ml-3 text-xs font-mono text-slate-500">settings.json</span>
                    </div>

                    <form onSubmit={handleSubmitPassword} className="flex flex-col gap-5 p-8">
                        <h2 className="text-lg font-semibold text-white">Change Password</h2>

                        <div className="flex flex-col gap-2.5">
                            <label className="text-sm font-medium text-slate-200">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all"
                                required
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2.5">
                                <label className="text-sm font-medium text-slate-200">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all"
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-sm font-medium text-slate-200">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {passwordMessage && (
                            <p className={`text-sm ${passwordMessage.type === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>
                                {passwordMessage.text}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={savingPassword}
                            className="self-start inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-[#0A0E17] text-sm font-semibold px-6 py-3 shadow-[0_15px_35px_-10px_rgba(34,211,238,0.5)] hover:shadow-[0_20px_45px_-10px_rgba(34,211,238,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-40 disabled:pointer-events-none"
                        >
                            {savingPassword ? "Saving..." : "Update Password"}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default Profile