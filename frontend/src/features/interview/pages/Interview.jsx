import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'



const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className="rounded-xl border border-white/10 bg-[#10151F] overflow-hidden">
            <div
                className="flex items-center gap-3 px-4 py-3.5 cursor-pointer select-none"
                onClick={() => setOpen(o => !o)}
            >
                <span className="text-xs font-mono text-cyan-300/70 w-7 shrink-0">Q{index + 1}</span>
                <p className="text-sm font-medium flex-1 text-slate-100">{item.question}</p>
                <span className={`text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className="border-t border-white/5 bg-black/20 px-4 py-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <span className="inline-block w-fit text-[11px] font-mono text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-0.5 rounded">intention</span>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.intention}</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="inline-block w-fit text-[11px] font-mono text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded">model_answer</span>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className="rounded-xl border border-white/10 bg-[#10151F] p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#0A0E17] bg-cyan-300 px-2.5 py-1 rounded-full shrink-0">day_{day.day}</span>
            <h3 className="text-sm font-semibold text-white">{day.focus}</h3>
        </div>
        <ul className="flex flex-col gap-2">
            {day.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-1.5 shrink-0" />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])



    if (loading || !report) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center bg-[#0A0E17]">
                <p className="text-sm font-mono text-slate-500 animate-pulse">// loading your interview plan...</p>
            </main>
        )
    }

    const ringColor =
        report.matchScore >= 80 ? '#34d399' :
            report.matchScore >= 60 ? '#fbbf24' : '#fb7185'

    const glowColor =
        report.matchScore >= 80 ? 'rgba(52,211,153,0.35)' :
            report.matchScore >= 60 ? 'rgba(251,191,36,0.35)' : 'rgba(251,113,133,0.35)'

    const scoreSubtext =
        report.matchScore >= 80 ? 'Strong match for this role' :
            report.matchScore >= 60 ? 'Decent match, some gaps to close' : 'Significant gaps for this role'

    const severityStyles = {
        high: 'text-rose-300 bg-rose-400/10 border border-rose-400/20',
        medium: 'text-amber-300 bg-amber-400/10 border border-amber-400/20',
        low: 'text-slate-300 bg-white/5 border border-white/10',
    }

    const dotGrid = {
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '22px 22px'
    }

    return (
        <div className="min-h-screen w-full bg-[#0A0E17] text-slate-100" style={dotGrid}>
            <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-[220px_minmax(0,1fr)_280px] lg:divide-x lg:divide-white/5 flex flex-col">

                {/* ── Left Nav ── */}
                <nav className="flex flex-col justify-between gap-8 p-6 border-b lg:border-b-0 border-white/5">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-mono text-slate-500 mb-2">sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveNav(item.id)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                                    activeNav === item.id
                                        ? 'bg-cyan-400/10 text-cyan-300 border border-cyan-400/20'
                                        : 'text-slate-400 hover:bg-white/5 border border-transparent'
                                }`}
                            >
                                <span className="shrink-0">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => { getResumePdf(interviewId) }}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 text-[#0A0E17] text-sm font-semibold px-4 py-2.5 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_10px_25px_-8px_rgba(34,211,238,0.5)] transition-all"
                    >
                        <svg height={"0.8rem"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                        Download Resume
                    </button>
                </nav>

                {/* ── Center Content ── */}
                <main className="p-8 md:p-10 flex flex-col gap-6 border-b lg:border-b-0 border-white/5">
                    {activeNav === 'technical' && (
                        <section className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-white">Technical Questions</h2>
                                <span className="text-xs font-mono text-slate-500">{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-white">Behavioral Questions</h2>
                                <span className="text-xs font-mono text-slate-500">{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-white">Preparation Road Map</h2>
                                <span className="text-xs font-mono text-slate-500">{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* ── Right Sidebar ── */}
                <aside className="p-8 flex flex-col gap-8">

                    {/* Match Score */}
                    <div className="flex flex-col items-center gap-3 text-center">
                        <p className="text-xs font-mono text-slate-500">match_score</p>
                        <div
                            className="w-28 h-28 rounded-full flex items-center justify-center"
                            style={{
                                background: `conic-gradient(${ringColor} ${report.matchScore * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
                                boxShadow: `0 0 30px -5px ${glowColor}`
                            }}
                        >
                            <div className="w-[84%] h-[84%] rounded-full bg-[#0A0E17] flex items-baseline justify-center">
                                <span className="text-2xl font-bold text-white">{report.matchScore}</span>
                                <span className="text-xs text-slate-500 ml-0.5">%</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 max-w-[16rem]">{scoreSubtext}</p>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Skill Gaps */}
                    <div className="flex flex-col gap-3">
                        <p className="text-xs font-mono text-slate-500">skill_gaps</p>
                        <div className="flex flex-wrap gap-2">
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className={`text-xs font-medium px-2.5 py-1 rounded-full ${severityStyles[ gap.severity ]}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview