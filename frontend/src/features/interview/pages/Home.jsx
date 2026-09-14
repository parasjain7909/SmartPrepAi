import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ resumeFileName, setResumeFileName ] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    const dotGrid = {
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '22px 22px'
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center bg-[#0A0E17]">
                <p className="text-sm font-mono text-slate-500 animate-pulse">// loading your interview plan...</p>
            </main>
        )
    }

    return (
        <div className="min-h-screen w-full bg-[#0A0E17] text-slate-100 px-6 sm:px-10 lg:px-16 py-20" style={dotGrid}>
            <div className="max-w-5xl mx-auto flex flex-col gap-16">

                {/* Page Header */}
                <header className="max-w-2xl">
                    <span className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-1 rounded-full mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                        smartprep-ai
                    </span>
                    <h1 className="text-[2.75rem] sm:text-5xl leading-[1.05] font-bold tracking-tight text-white">
                        Create your custom interview plan
                    </h1>
                    <p className="mt-5 text-base text-slate-400 leading-relaxed">
                        Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                    </p>
                </header>

                {/* Main Card — framed like a code editor window */}
                <div className="rounded-2xl border border-white/10 bg-[#10151F] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] overflow-hidden">

                    {/* Window chrome */}
                    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-black/20">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                        <span className="ml-3 text-xs font-mono text-slate-500">interview_config.json</span>
                    </div>

                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5 relative">

                        {/* Left Panel - Job Description */}
                        <div className="flex flex-col gap-5 p-9 md:p-12">
                            <div className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-cyan-300 shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                </span>
                                <h2 className="text-lg font-semibold text-white">Target Job Description</h2>
                                <span className="ml-auto text-[11px] font-mono text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded">required</span>
                            </div>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => { setJobDescription(e.target.value) }}
                                className="w-full h-60 md:h-72 resize-none rounded-xl border border-white/10 bg-black/30 p-4 text-sm font-mono leading-relaxed text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all"
                                placeholder={`// Paste the full job description here...\n// e.g. "Senior Frontend Engineer at Google requires\n// proficiency in React, TypeScript, and system design..."`}
                                maxLength={5000}
                            />
                            <div className="self-end text-xs font-mono text-slate-600">{jobDescription.length} / 5000 chars</div>
                        </div>

                        {/* VS marker at the seam, desktop only */}
                        <div className="hidden md:flex absolute left-1/2 top-11 -translate-x-1/2 z-10">
                            <div className="relative flex items-center gap-1.5 px-4 h-11 rounded-xl bg-[#0A0E17] border border-cyan-400/30 shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                                <span className="text-white text-xs font-mono font-semibold tracking-wide">VS</span>
                            </div>
                        </div>

                        {/* Right Panel - Profile */}
                        <div className="flex flex-col gap-6 p-9 md:p-12">
                            <div className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-cyan-300 shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </span>
                                <h2 className="text-lg font-semibold text-white">Your Profile</h2>
                            </div>

                            {/* Upload Resume */}
                            <div className="flex flex-col gap-2.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-slate-200">Upload Resume</label>
                                    <span className="text-[11px] font-mono text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded">best results</span>
                                </div>
                                <label
                                    className="group flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/10 bg-black/20 py-9 px-4 text-center cursor-pointer hover:border-cyan-400/40 hover:bg-cyan-400/[0.03] transition-all"
                                    htmlFor="resume"
                                >
                                    <span className="flex items-center justify-center w-11 h-11 rounded-full bg-cyan-400/10 text-cyan-300 group-hover:scale-105 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                    </span>
                                    <p className="text-sm font-medium text-slate-200">
                                        {resumeFileName ? resumeFileName : "Click to upload or drag & drop"}
                                    </p>
                                    <p className="text-xs font-mono text-slate-600">// .pdf .docx · max 5mb</p>
                                    <input
                                        ref={resumeInputRef}
                                        onChange={(e) => setResumeFileName(e.target.files[ 0 ]?.name || "")}
                                        hidden type="file" id="resume" name="resume" accept=".pdf,.docx"
                                    />
                                </label>
                            </div>

                            {/* OR Divider */}
                            <div className="flex items-center gap-3 text-xs font-mono text-slate-600">
                                <div className="h-px flex-1 bg-white/10" />
                                <span>or</span>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>

                            {/* Quick Self-Description */}
                            <div className="flex flex-col gap-2.5">
                                <label className="text-sm font-medium text-slate-200" htmlFor="selfDescription">Quick Self-Description</label>
                                <textarea
                                    value={selfDescription}
                                    onChange={(e) => { setSelfDescription(e.target.value) }}
                                    id="selfDescription"
                                    name="selfDescription"
                                    className="w-full h-28 resize-none rounded-xl border border-white/10 bg-black/30 p-3.5 text-sm font-mono leading-relaxed text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all"
                                    placeholder="// briefly describe your experience, key skills, years..."
                                />
                            </div>

                            {/* Info Box */}
                            <div className="flex items-start gap-2.5 rounded-xl bg-cyan-400/5 border border-cyan-400/20 p-3.5 text-xs text-slate-300 leading-relaxed">
                                <span className="text-cyan-300 shrink-0 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#0A0E17" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#0A0E17" strokeWidth="2" /></svg>
                                </span>
                                <p>Either a <strong className="text-white">resume</strong> or a <strong className="text-white">self-description</strong> is required to generate a personalized plan.</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer — status bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 bg-black/20 px-9 md:px-12 py-6">
                        <span className="flex items-center gap-2 text-xs font-mono text-slate-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            ai ready · ~30s to generate
                        </span>
                        <button
                            onClick={handleGenerateReport}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-[#0A0E17] text-sm font-semibold px-7 py-3.5 shadow-[0_15px_35px_-10px_rgba(34,211,238,0.5)] hover:shadow-[0_20px_45px_-10px_rgba(34,211,238,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                            Generate My Interview Strategy
                        </button>
                    </div>
                </div>

                {/* Recent Reports List */}
                {reports.length > 0 && (
                    <section className="flex flex-col gap-4">
                        <h2 className="text-lg font-semibold text-white">My Recent Interview Plans</h2>
                        <ul className="flex flex-col divide-y divide-white/5 rounded-2xl border border-white/10 bg-[#10151F] overflow-hidden">
                            {reports.map(report => {
                                const borderColor = report.matchScore >= 80
                                    ? "border-emerald-400"
                                    : report.matchScore >= 60
                                        ? "border-amber-400"
                                        : "border-rose-400"
                                const pillColor = report.matchScore >= 80
                                    ? "text-emerald-300 bg-emerald-400/10 border border-emerald-400/20"
                                    : report.matchScore >= 60
                                        ? "text-amber-300 bg-amber-400/10 border border-amber-400/20"
                                        : "text-rose-300 bg-rose-400/10 border border-rose-400/20"
                                return (
                                    <li
                                        key={report._id}
                                        onClick={() => navigate(`/interview/${report._id}`)}
                                        className={`flex items-center justify-between gap-4 px-6 py-4 cursor-pointer hover:bg-white/[0.03] transition-colors border-l-4 ${borderColor}`}
                                    >
                                        <div>
                                            <h3 className="text-sm font-semibold text-white">{report.title || 'Untitled Position'}</h3>
                                            <p className="text-xs font-mono text-slate-500 mt-0.5">{new Date(report.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`text-xs font-mono px-3 py-1 rounded-full whitespace-nowrap ${pillColor}`}>
                                            {report.matchScore}% match
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                )}

                {/* Page Footer */}
                <footer className="flex flex-wrap gap-6 text-xs font-mono text-slate-600 pt-8 border-t border-white/5">
                    <a className="hover:text-slate-300 transition-colors" href="#">privacy_policy</a>
                    <a className="hover:text-slate-300 transition-colors" href="#">terms_of_service</a>
                    <a className="hover:text-slate-300 transition-colors" href="#">help_center</a>
                </footer>
            </div>
        </div>
    )
}

export default Home