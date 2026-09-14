import React, { useEffect } from 'react'
import { useStudyPlan } from '../hooks/useStudyPlan.js'
import { useParams } from 'react-router'

const dotGrid = {
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
    backgroundSize: '22px 22px'
}

const priorityStyles = {
    high: 'text-rose-300 bg-rose-400/10 border border-rose-400/20',
    medium: 'text-amber-300 bg-amber-400/10 border border-amber-400/20',
    low: 'text-slate-300 bg-white/5 border border-white/10',
}

const TaskRow = ({ task, onToggle }) => {
    const completed = task.status === 'completed'
    return (
        <div className={`flex items-start gap-3 rounded-xl border p-4 transition-colors ${
            completed ? 'border-emerald-400/20 bg-emerald-400/[0.03]' : 'border-white/10 bg-[#10151F]'
        }`}>
            <button
                onClick={() => onToggle(task._id)}
                className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    completed ? 'border-emerald-400/40 bg-emerald-400/20' : 'border-white/15 hover:border-cyan-400/40'
                }`}
            >
                {completed && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                )}
            </button>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h4 className={`text-sm font-semibold ${completed ? 'text-slate-500 line-through decoration-slate-600' : 'text-white'}`}>
                        {task.title}
                    </h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${priorityStyles[ task.priority ]}`}>
                        {task.priority}
                    </span>
                </div>
                <p className={`text-sm mt-1 leading-relaxed ${completed ? 'text-slate-600' : 'text-slate-400'}`}>
                    {task.description}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs font-mono text-slate-500">
                    <span>{task.skill}</span>
                    <span>·</span>
                    <span>{task.estimatedHours}h</span>
                </div>
            </div>
        </div>
    )
}

const StudyPlanResult = () => {
    const { studyPlan, loading, getPlanById, toggleTask } = useStudyPlan()
    const { studyPlanId } = useParams()

    useEffect(() => {
        if (studyPlanId) {
            getPlanById(studyPlanId)
        }
    }, [ studyPlanId ])

    if (loading || !studyPlan) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center bg-[#0A0E17]">
                <p className="text-sm font-mono text-slate-500 animate-pulse">// loading your study plan...</p>
            </main>
        )
    }

    const totalTasks = studyPlan.tasks.length
    const completedTasks = studyPlan.tasks.filter(t => t.status === 'completed').length
    const pendingTasks = totalTasks - completedTasks
    const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    const today = new Date()
    const startDate = new Date(studyPlan.startDate)
    const currentDay = Math.max(1, Math.min(
        studyPlan.tasks.length ? Math.max(...studyPlan.tasks.map(t => t.day)) : 1,
        Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1
    ))

    const todayTasks = studyPlan.tasks.filter(t => t.day === currentDay)
    const todayCompleted = todayTasks.filter(t => t.status === 'completed').length

    const tasksByDay = studyPlan.tasks.reduce((acc, task) => {
        acc[ task.day ] = acc[ task.day ] || []
        acc[ task.day ].push(task)
        return acc
    }, {})

    const days = Object.keys(tasksByDay).map(Number).sort((a, b) => a - b)

    return (
        <div className="min-h-screen w-full bg-[#0A0E17] text-slate-100" style={dotGrid}>
            <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:divide-x lg:divide-white/5 flex flex-col">

                {/* ── Main: day-by-day tasks ── */}
                <main className="p-8 md:p-10 flex flex-col gap-6 border-b lg:border-b-0 border-white/5">
                    <header>
                        <span className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-1 rounded-full mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                            study_plan
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{studyPlan.targetRole}</h1>
                        <p className="text-sm text-slate-400 mt-2">
                            {studyPlan.skillLevel} · {studyPlan.hoursPerDay}h/day · {days.length} days
                        </p>
                    </header>

                    <div className="flex flex-col gap-8">
                        {days.map(day => (
                            <section key={day} className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs font-mono font-medium px-2.5 py-1 rounded-full shrink-0 ${
                                        day === currentDay
                                            ? 'text-[#0A0E17] bg-cyan-300'
                                            : 'text-slate-400 bg-white/5 border border-white/10'
                                    }`}>
                                        day_{day}
                                    </span>
                                    {day === currentDay && (
                                        <span className="text-xs font-mono text-cyan-300">today</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    {tasksByDay[ day ].map(task => (
                                        <TaskRow
                                            key={task._id}
                                            task={task}
                                            onToggle={(taskId) => toggleTask({ studyPlanId, taskId })}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </main>

                {/* ── Sidebar: progress overview ── */}
                <aside className="p-8 flex flex-col gap-8">

                    {/* Overall progress ring */}
                    <div className="flex flex-col items-center gap-3 text-center">
                        <p className="text-xs font-mono text-slate-500">overall_progress</p>
                        <div
                            className="w-28 h-28 rounded-full flex items-center justify-center"
                            style={{
                                background: `conic-gradient(#22d3ee ${overallProgress * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
                                boxShadow: '0 0 30px -5px rgba(34,211,238,0.35)'
                            }}
                        >
                            <div className="w-[84%] h-[84%] rounded-full bg-[#0A0E17] flex items-baseline justify-center">
                                <span className="text-2xl font-bold text-white">{overallProgress}</span>
                                <span className="text-xs text-slate-500 ml-0.5">%</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">{completedTasks} of {totalTasks} tasks done</p>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Today's progress */}
                    <div className="flex flex-col gap-2.5">
                        <p className="text-xs font-mono text-slate-500">today's_progress</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-300">{todayCompleted} / {todayTasks.length} tasks</span>
                            <span className="text-xs font-mono text-cyan-300">
                                {todayTasks.length > 0 ? Math.round((todayCompleted / todayTasks.length) * 100) : 0}%
                            </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                                style={{ width: `${todayTasks.length > 0 ? (todayCompleted / todayTasks.length) * 100 : 0}%` }}
                            />
                        </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Stats */}
                    <div className="flex flex-col gap-4">
                        <p className="text-xs font-mono text-slate-500">stats</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Completed</span>
                            <span className="text-sm font-mono text-emerald-300">{completedTasks}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Pending</span>
                            <span className="text-sm font-mono text-amber-300">{pendingTasks}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Total days</span>
                            <span className="text-sm font-mono text-slate-300">{days.length}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default StudyPlanResult