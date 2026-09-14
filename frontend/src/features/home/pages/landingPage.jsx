import React from 'react'
import { Link } from 'react-router'
import Navbar from '../../../components/Navbar.jsx'

const FEATURES = [
    {
        id: 'resume',
        tag: 'ats_score.ts',
        title: 'ATS Resume Scoring',
        description: 'Upload your resume and instantly see how it scores against real ATS filters used by recruiters — with the exact keywords and formatting fixes you\'re missing.',
        cta: 'Score my resume',
        to: '/home',
        accent: 'cyan',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>)
    },
    {
        id: 'planner',
        tag: 'study_planner.ts',
        title: 'Personalized Study Plan',
        description: 'A day-by-day roadmap built from your specific gaps, not a generic syllabus — with checkable tasks and daily progress you can actually track.',
        cta: 'Build my roadmap',
        to: '/study-plan',
        accent: 'violet',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>)
    },
    {
        id: 'resources',
        tag: 'resources.ts',
        title: 'Learning Resources',
        description: 'Curated video playlists and notes for every skill that shows up in interviews — organized and searchable, no more hunting through random tutorials.',
        cta: 'Browse resources',
        to: '/resources',
        accent: 'emerald',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>)
    },
]

const ACCENT_STYLES = {
    cyan: {
        icon: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/20',
        tag: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/20',
        glow: 'hover:shadow-[0_0_40px_-12px_rgba(34,211,238,0.35)] hover:border-cyan-400/30',
        link: 'text-cyan-300',
        ring: '#22d3ee',
    },
    violet: {
        icon: 'text-violet-300 bg-violet-400/10 border-violet-400/20',
        tag: 'text-violet-300 bg-violet-400/10 border-violet-400/20',
        glow: 'hover:shadow-[0_0_40px_-12px_rgba(167,139,250,0.35)] hover:border-violet-400/30',
        link: 'text-violet-300',
        ring: '#a78bfa',
    },
    emerald: {
        icon: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
        tag: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
        glow: 'hover:shadow-[0_0_40px_-12px_rgba(52,211,153,0.35)] hover:border-emerald-400/30',
        link: 'text-emerald-300',
        ring: '#34d399',
    },
}

const STEPS = [
    { step: '01', title: 'Upload your resume', description: 'Drop in your resume and paste the job description you\'re targeting.' },
    { step: '02', title: 'AI scores it like an ATS', description: 'We run an ATS-style scan and check your resume against the role\'s requirements.' },
    { step: '03', title: 'Get your study plan', description: 'Receive a match score and a day-by-day roadmap built around what you\'re missing.' },
    { step: '04', title: 'Learn & track progress', description: 'Follow curated resources for each skill and check off daily tasks as you go.' },
]

const ROLES = [
    { name: 'Frontend Developer', meta: '1.2k+ analyzed' },
    { name: 'Backend Developer', meta: '980+ analyzed' },
    { name: 'Full Stack Developer', meta: '2.1k+ analyzed' },
    { name: 'Data Analyst', meta: '640+ analyzed' },
    { name: 'DevOps Engineer', meta: '410+ analyzed' },
    { name: 'Product Manager', meta: '350+ analyzed' },
]

const dotGrid = {
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
    backgroundSize: '22px 22px'
}

const Landing = () => {
    return (
        <div className="min-h-screen w-full bg-[#0A0E17] text-slate-100" style={dotGrid}>

            <Navbar />

            {/* Hero */}
            <section className="px-6 sm:px-10 lg:px-16 pt-20 pb-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div className="flex flex-col gap-6">
                    <span className="inline-flex items-center gap-2 w-fit text-xs font-mono text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                        ATS scoring · study plans · resources
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-white">
                        Know exactly why your resume isn't landing interviews.
                    </h1>
                    <p className="text-base text-slate-400 leading-relaxed max-w-lg">
                        SmartPrep AI scores your resume the way an ATS does, builds a personalized study plan around what you're missing, and points you to the exact resources to close the gap — in under 30 seconds.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <Link
                            to="/home"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-[#0A0E17] text-sm font-semibold px-6 py-3.5 shadow-[0_15px_35px_-10px_rgba(34,211,238,0.5)] hover:shadow-[0_20px_45px_-10px_rgba(34,211,238,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
                        >
                            Get started free
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </Link>
                        <a href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            See how it works →
                        </a>
                    </div>
                </div>

                {/* Realistic dashboard preview */}
                <div className="rounded-2xl border border-white/10 bg-[#10151F] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-black/20">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                        <span className="ml-3 text-xs font-mono text-slate-500">dashboard.tsx</span>
                    </div>
                    <div className="p-6 flex flex-col gap-6">

                        {/* ATS score + focus areas row */}
                        <div className="flex items-center gap-6">
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center shrink-0"
                                style={{
                                    background: `conic-gradient(#22d3ee ${87 * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
                                    boxShadow: '0 0 25px -6px rgba(34,211,238,0.4)'
                                }}
                            >
                                <div className="w-[80%] h-[80%] rounded-full bg-[#10151F] flex items-baseline justify-center">
                                    <span className="text-lg font-bold text-white">87</span>
                                    <span className="text-[10px] text-slate-500 ml-0.5">%</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-mono text-slate-500 mb-2">focus_areas</p>
                                <div className="flex flex-wrap gap-1.5">
                                    <span className="text-[11px] font-medium text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">TypeScript</span>
                                    <span className="text-[11px] font-medium text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">Docker</span>
                                    <span className="text-[11px] font-medium text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">AWS</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-white/5" />

                        {/* Today's tasks */}
                        <div className="flex flex-col gap-2.5">
                            <p className="text-xs font-mono text-slate-500">today's_tasks</p>
                            <div className="flex items-center gap-2.5">
                                <span className="w-4 h-4 rounded border border-emerald-400/40 bg-emerald-400/20 flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                </span>
                                <span className="text-sm text-slate-400 line-through decoration-slate-600">Review TypeScript interfaces & generics</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span className="w-4 h-4 rounded border border-emerald-400/40 bg-emerald-400/20 flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                </span>
                                <span className="text-sm text-slate-400 line-through decoration-slate-600">Practice 5 system design questions</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span className="w-4 h-4 rounded border border-white/15 shrink-0" />
                                <span className="text-sm text-slate-200">Containerize a project with Docker</span>
                            </div>
                        </div>

                        <div className="h-px bg-white/5" />

                        {/* Progress */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-mono text-slate-500">week_1_progress</p>
                                <span className="text-xs font-mono text-cyan-300">65%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: '65%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="px-6 sm:px-10 lg:px-16 pb-28 max-w-7xl mx-auto">
                <div className="max-w-2xl mb-12">
                    <span className="text-xs font-mono text-slate-500">// what you get</span>
                    <h2 className="text-3xl font-bold tracking-tight text-white mt-3">
                        Everything you need to walk in ready
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {FEATURES.map(feature => {
                        const styles = ACCENT_STYLES[ feature.accent ]
                        return (
                            <div
                                key={feature.id}
                                className={`flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#10151F] p-7 transition-all ${styles.glow}`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`flex items-center justify-center w-11 h-11 rounded-xl border ${styles.icon}`}>
                                        {feature.icon}
                                    </span>
                                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded border ${styles.tag}`}>
                                        {feature.tag}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                                </div>
                                <Link
                                    to={feature.to}
                                    className={`inline-flex items-center gap-1.5 text-sm font-medium mt-auto ${styles.link} hover:gap-2.5 transition-all`}
                                >
                                    {feature.cta}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="px-6 sm:px-10 lg:px-16 pb-28 max-w-7xl mx-auto">
                <div className="max-w-2xl mb-14">
                    <span className="text-xs font-mono text-slate-500">// the process</span>
                    <h2 className="text-3xl font-bold tracking-tight text-white mt-3">
                        How SmartPrep AI works
                    </h2>
                </div>

                <div className="grid md:grid-cols-4 gap-6 relative">
                    <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-white/10" />
                    {STEPS.map(item => (
                        <div key={item.step} className="flex flex-col gap-4 relative">
                            <span className="w-12 h-12 rounded-full bg-[#10151F] border border-white/10 flex items-center justify-center text-sm font-mono text-cyan-300 relative z-10">
                                {item.step}
                            </span>
                            <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Target Job Roles */}
            <section id="roles" className="px-6 sm:px-10 lg:px-16 pb-28 max-w-7xl mx-auto">
                <div className="max-w-2xl mb-12">
                    <span className="text-xs font-mono text-slate-500">// built for your role</span>
                    <h2 className="text-3xl font-bold tracking-tight text-white mt-3">
                        Tuned for the roles people actually apply to
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {ROLES.map(role => (
                        <div
                            key={role.name}
                            className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#10151F] px-5 py-4 hover:border-cyan-400/30 hover:bg-white/[0.02] transition-all"
                        >
                            <div>
                                <h3 className="text-sm font-semibold text-white">{role.name}</h3>
                                <p className="text-xs font-mono text-slate-500 mt-1">{role.meta}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 shrink-0"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="px-6 sm:px-10 lg:px-16 pb-28 max-w-7xl mx-auto">
                <div className="relative rounded-3xl border border-white/10 bg-[#10151F] px-8 sm:px-16 py-16 text-center overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{ background: 'radial-gradient(600px circle at 50% 0%, rgba(34,211,238,0.15), transparent 70%)' }}
                    />
                    <div className="relative flex flex-col items-center gap-6">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white max-w-2xl">
                            Your next interview starts with a better resume.
                        </h2>
                        <p className="text-base text-slate-400 max-w-lg">
                            Get your ATS score and a personalized study plan with the right resources — free, in under 30 seconds.
                        </p>
                        <Link
                            to="/home"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-[#0A0E17] text-sm font-semibold px-7 py-3.5 shadow-[0_15px_35px_-10px_rgba(34,211,238,0.5)] hover:shadow-[0_20px_45px_-10px_rgba(34,211,238,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
                        >
                            Get started free
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 sm:px-10 lg:px-16 py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs font-mono text-slate-600">© {new Date().getFullYear()} smartprep-ai</span>
                    <div className="flex flex-wrap gap-6 text-xs font-mono text-slate-600">
                        <a className="hover:text-slate-300 transition-colors" href="#">privacy_policy</a>
                        <a className="hover:text-slate-300 transition-colors" href="#">terms_of_service</a>
                        <a className="hover:text-slate-300 transition-colors" href="#">help_center</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Landing