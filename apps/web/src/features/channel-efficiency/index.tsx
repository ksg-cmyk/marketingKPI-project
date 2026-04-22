import { useState, useEffect } from "react"
import { SectionHeader } from "@marketingkpi/ui"
import {
  ComposedChart, BarChart, Bar, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"
import { fetchChannelEfficiencyRows, toChannelEfficiencyRow } from "@marketingkpi/core"
import type { ChannelEfficiencyRow } from "@marketingkpi/core"

const cleanNum = (v: unknown) => parseFloat(String(v ?? '0').replace(/[^0-9.]/g, '')) || 0

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color: string
  }>
  label?: string
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-xl p-4 text-xs fontHeadline">
      <p className="font-black text-slate-500 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center space-x-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-500">{p.name}</span>
          <span className="font-black text-on-surface ml-auto pl-4">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

export default function ChannelEfficiencyPage() {
  const [rows, setRows] = useState<ChannelEfficiencyRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChannelEfficiencyRows().then(data => {
      setRows(data.map(toChannelEfficiencyRow))
      setLoading(false)
    })
  }, [])

  if (loading) return null

  const byDate = rows.reduce((acc, r) => {
    const date = r.date
    if (!acc[date]) acc[date] = { date, views: 0, reach: 0, likes: 0, saves: 0, shares: 0, comments: 0, profileVisits: 0, purchases: 0 }
    acc[date].views += cleanNum(r.views)
    acc[date].reach += cleanNum(r.reach)
    acc[date].likes += cleanNum(r.likes)
    acc[date].saves += cleanNum(r.saves)
    acc[date].shares += cleanNum(r.shares)
    acc[date].comments += cleanNum(r.comments)
    acc[date].profileVisits += cleanNum(r.profileVisits)
    acc[date].purchases += cleanNum(r.purchases)
    return acc
  }, {} as Record<string, {
    date: string
    views: number
    reach: number
    likes: number
    saves: number
    shares: number
    comments: number
    profileVisits: number
    purchases: number
  }>)

  const chartData = Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date))
  const maxViews = Math.max(...chartData.map(d => d.views))

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <SectionHeader
        variant="page"
        title="채널 효율 지표"
        description="날짜별 SNS 콘텐츠 성과 인사이트"
      />

      {/* 조회수 · 도달 + 구매 오버레이 */}
      <div className="bg-white rounded-2xl editorialShadow border border-slate-100 p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xl fontHeadline font-black text-on-surface mb-1">조회수 · 도달/노출</h3>
            <p className="text-slate-400 text-sm">날짜별 콘텐츠 노출 성과 및 구매 전환</p>
          </div>
          <div className="bg-primary/5 px-4 py-2 rounded-lg border border-primary/10 flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-black text-primary uppercase tracking-wider">
              최고 조회수 {maxViews.toLocaleString()}
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData} barGap={4}>
            <defs>
              <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#004B87" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#004B87" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="reachGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a5b4fc" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#a5b4fc" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fontWeight: 700, fill: '#f43f5e' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Legend wrapperStyle={{ fontSize: 11, fontWeight: 700, paddingTop: 16 }} />
            <Bar yAxisId="left" dataKey="views" name="조회수" fill="url(#viewsGrad)" radius={[6, 6, 0, 0]} maxBarSize={32} />
            <Bar yAxisId="left" dataKey="reach" name="도달/노출" fill="url(#reachGrad)" radius={[6, 6, 0, 0]} maxBarSize={32} />
            <Line yAxisId="right" dataKey="purchases" name="구매 건수" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 반응수 스택 차트 */}
      <div className="bg-white rounded-2xl editorialShadow border border-slate-100 p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xl fontHeadline font-black text-on-surface mb-1">반응수 분석</h3>
            <p className="text-slate-400 text-sm">좋아요 · 저장 · 공유 · 댓글 · 프로필 방문</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Legend wrapperStyle={{ fontSize: 11, fontWeight: 700, paddingTop: 16 }} />
            <Bar dataKey="likes" name="좋아요" fill="#f59e0b" stackId="a" />
            <Bar dataKey="saves" name="저장" fill="#10b981" stackId="a" />
            <Bar dataKey="shares" name="공유" fill="#3b82f6" stackId="a" />
            <Bar dataKey="comments" name="댓글" fill="#8b5cf6" stackId="a" />
            <Bar dataKey="profileVisits" name="프로필 방문" fill="#ec4899" stackId="a" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="h-10" />
    </div>
  )
}
