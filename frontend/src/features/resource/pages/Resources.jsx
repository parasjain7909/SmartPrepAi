import React, { useState, useMemo } from 'react'
import { RESOURCE_CATEGORIES } from '../data/resources.data.js'

const dotGrid = {
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
    backgroundSize: '22px 22px'
}

const TYPE_CONFIG = {
    video: {
        badge: 'text-rose-300 bg-rose-400/10 border-rose-400/20',
        glow: 'hover:border-rose-400/30 hover:shadow-[0_0_30px_-14px_rgba(251,113,133,0.4)]',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>)
    },
    notes: {
        badge: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
        glow: 'hover:border-emerald-400/30 hover:shadow-[0_0_30px_-14px_rgba(52,211,153,0.4)]',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>)
    },
}

const LEVEL_STYLES = {
    beginner: 'text-cyan-300 bg-cyan-400/10',
    intermediate: 'text-amber-300 bg-amber-400/10',
    advanced: 'text-violet-300 bg-violet-400/10',
}

const getYouTubeThumbnail = (url) => {
    const watchMatch = url.match(/[?&]v=([^&]+)/)
    if (watchMatch) return `https://img.youtube.com/vi/${watchMatch[1]}/hqdefault.jpg`
    return null
}

const ResourceCard = ({ item }) => {
    const config = TYPE_CONFIG[ item.type ]
    const thumbnail = item.type === 'video' ? getYouTubeThumbnail(item.url) : null

    return (
        
           <a href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-col rounded-2xl border border-white/10 bg-[#10151F] overflow-hidden transition-all ${config.glow}`}
        >
            {thumbnail ? (
                <div className="relative w-full aspect-video bg-black overflow-hidden">
                    <img
                        src={thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center group-hover:bg-rose-500/80 group-hover:scale-110 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                        </span>
                    </span>
                    <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border backdrop-blur-sm ${config.badge}`}>
                        {config.icon}
                        {item.type}
                    </span>
                    <span className={`absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded-full backdrop-blur-sm ${LEVEL_STYLES[ item.level ]}`}>
                        {item.level}
                    </span>
                </div>
            ) : (
                <div className="flex items-center justify-between p-5 pb-0">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border ${config.badge}`}>
                        {config.icon}
                        {item.type}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-1 rounded-full ${LEVEL_STYLES[ item.level ]}`}>
                        {item.level}
                    </span>
                </div>
            )}

            <div className="flex flex-col gap-1.5 p-5">
                <h3 className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-xs font-mono text-slate-500">{item.source}</p>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">{item.description}</p>
            </div>
        </a>
    )
}

const Resources = () => {
    const [ activeCategory, setActiveCategory ] = useState(RESOURCE_CATEGORIES[ 0 ].id)
    const [ search, setSearch ] = useState("")
    const [ activeSkill, setActiveSkill ] = useState("all")

    const currentCategory = RESOURCE_CATEGORIES.find(c => c.id === activeCategory)

    const totalCount = useMemo(() =>
        RESOURCE_CATEGORIES.reduce((sum, cat) =>
            sum + cat.skills.reduce((s, skill) => s + skill.items.length, 0), 0
        ), [])

    const filtered = useMemo(() => {
        return currentCategory.skills
            .filter(group => activeSkill === "all" || group.skill === activeSkill)
            .map(group => ({
                ...group,
                items: group.items.filter(item =>
                    item.title.toLowerCase().includes(search.toLowerCase()) ||
                    group.skill.toLowerCase().includes(search.toLowerCase())
                )
            }))
            .filter(group => group.items.length > 0)
    }, [ currentCategory, search, activeSkill ])

    const handleCategoryChange = (id) => {
        setActiveCategory(id)
        setActiveSkill("all")
        setSearch("")
    }

    return (
        <div className="min-h-screen w-full bg-[#0A0E17] text-slate-100 px-6 sm:px-10 lg:px-16 py-16" style={dotGrid}>
            <div className="max-w-6xl mx-auto flex flex-col gap-10">

                <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 max-w-4xl">
                    <div>
                        <span className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-1 rounded-full mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                            resources.ts
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                            Learning Resources
                        </h1>
                        <p className="mt-4 text-base text-slate-400 leading-relaxed max-w-lg">
                            Curated playlists and notes, organized by track and difficulty.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 shrink-0">
                        <span className="text-2xl font-bold text-white">{totalCount}</span>
                        resources across {RESOURCE_CATEGORIES.length} tracks
                    </div>
                </header>

                {/* Category tabs */}
                <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
                    {RESOURCE_CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                                activeCategory === cat.id
                                    ? 'bg-cyan-400/10 text-cyan-300 border border-cyan-400/20'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Search + skill filters */}
                <div className="flex flex-col gap-4">
                    <div className="relative w-full sm:max-w-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search resources or skills..."
                            className="w-full rounded-xl border border-white/10 bg-[#10151F] py-3 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveSkill("all")}
                            className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${
                                activeSkill === "all"
                                    ? 'text-cyan-300 bg-cyan-400/10 border-cyan-400/20'
                                    : 'text-slate-400 bg-white/5 border-white/10 hover:border-white/20'
                            }`}
                        >
                            all
                        </button>
                        {currentCategory.skills.map(group => (
                            <button
                                key={group.skill}
                                onClick={() => setActiveSkill(group.skill)}
                                className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${
                                    activeSkill === group.skill
                                        ? 'text-cyan-300 bg-cyan-400/10 border-cyan-400/20'
                                        : 'text-slate-400 bg-white/5 border-white/10 hover:border-white/20'
                                }`}
                            >
                                {group.skill}
                                <span className="text-[10px] text-slate-600">{group.items.length}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results */}
                <div className="flex flex-col gap-10">
                    {filtered.length === 0 && (
                        <p className="text-sm text-slate-500 font-mono">// no resources match your search</p>
                    )}
                    {filtered.map(group => (
                        <section key={group.skill} className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-sm font-semibold text-white">{group.skill}</h2>
                                <span className="h-px flex-1 bg-white/5" />
                                <span className="text-xs font-mono text-slate-600">{group.items.length} resources</span>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {group.items.map((item, i) => (
                                    <ResourceCard key={i} item={item} />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Resources