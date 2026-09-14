import React, { useState } from 'react'
import { useStudyPlan } from '../hooks/useStudyPlan.js'
import { useInterview } from '../../interview/hooks/useInterview.js'
import { useNavigate } from 'react-router'

const SKILL_LEVELS = [ 'beginner', 'intermediate', 'advanced' ]

const dotGrid = {
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
    backgroundSize: '22px 22px'
}

const StudyPlan = () => {
    const { loading, createStudyPlan } = useStudyPlan()
    const { reports } = useInterview()
    const navigate = useNavigate()

    const [ interviewReportId, setInterviewReportId ] = useState("")
    const [ targetRole, setTargetRole ] = useState("")
    const [ skillLevel, setSkillLevel ] = useState("intermediate")
    const [ hoursPerDay, setHoursPerDay ] = useState(2)
    const [ deadlineDays, setDeadlineDays ] = useState(30)

    const selectedReport = reports?.find(r => r._id === interviewReportId)

    const handleGenerate = async () => {
        const plan = await createStudyPlan({ interviewReportId: interviewReportId || undefined, targetRole, skillLevel, hoursPerDay, deadlineDays })
        if (plan) navigate(`/study-plan/${plan._id}`)
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center bg-[#0A0E17]">
                <p className="text-sm font-mono text-slate-500 animate-pulse">// generating your study plan...</p>
            </main>
        )
    }

    return (
        <div className="min-h-screen w-full bg-[#0A0E17] text-slate-100 px-6 sm:px-10 lg:px-16 py-20" style={dotGrid}>
            <div className="max-w-3xl mx-auto flex flex-col gap-16">

                <header className="max-w-2xl">
                    <span className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-1 rounded-full mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                        smartprep-ai
                    </span>
                    <h1 className="text-[2.75rem] sm:text-5xl leading-[1.05] font-bold tracking-tight text-white">
                        Build your study plan
                    </h1>
                    <p className="mt-5 text-base text-slate-400 leading-relaxed">
                        Tell us your target role, current level, and available time — we'll build a realistic day-by-day roadmap.
                    </p>
                </header>

                <div className="rounded-2xl border border-white/10 bg-[#10151F] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] overflow-hidden">

                    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-black/20">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                        <span className="ml-3 text-xs font-mono text-slate-500">study_plan_config.json</span>
                    </div>

                    <div className="flex flex-col gap-6 p-9 md:p-12">

                        {reports?.length > 0 && (
                            <div className="flex flex-col gap-2.5">
                                <label className="text-sm font-medium text-slate-200">Link an existing report</label>
                                <select
                                    value={interviewReportId}
                                    onChange={(e) => setInterviewReportId(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all"
                                >
                                    <option value="">None — start fresh</option>
                                    {reports.map(r => (
                                        <option key={r._id} value={r._id}>{r.title || 'Untitled Position'}</option>
                                    ))}
                                </select>
                                {selectedReport && (
                                    <p className="text-xs font-mono text-slate-500">
                                        skill_gaps: {selectedReport.skillGaps.map(g => g.skill).join(", ")}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="flex flex-col gap-2.5">
                            <label className="text-sm font-medium text-slate-200">Target Role</label>
                            <input
                                value={targetRole}
                                onChange={(e) => setTargetRole(e.target.value)}
                                placeholder="e.g. Full Stack Developer"
                                className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all"
                            />
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2.5">
                                <label className="text-sm font-medium text-slate-200">Skill Level</label>
                                <select
                                    value={skillLevel}
                                    onChange={(e) => setSkillLevel(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all"
                                >
                                    {SKILL_LEVELS.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-sm font-medium text-slate-200">Hours/day</label>
                                <input
                                    type="number" min={1} max={16}
                                    value={hoursPerDay}
                                    onChange={(e) => setHoursPerDay(Number(e.target.value))}
                                    className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-sm font-medium text-slate-200">Deadline (days)</label>
                                <input
                                    type="number" min={1} max={90}
                                    value={deadlineDays}
                                    onChange={(e) => setDeadlineDays(Number(e.target.value))}
                                    className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-white/5 bg-black/20 px-9 md:px-12 py-6">
                        <span className="text-xs font-mono text-slate-500">ai ready · ~20s to generate</span>
                        <button
                            onClick={handleGenerate}
                            disabled={!targetRole}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-[#0A0E17] text-sm font-semibold px-7 py-3.5 shadow-[0_15px_35px_-10px_rgba(34,211,238,0.5)] hover:shadow-[0_20px_45px_-10px_rgba(34,211,238,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-40 disabled:pointer-events-none"
                        >
                            Generate Study Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudyPlan