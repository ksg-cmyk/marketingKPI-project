import { useState } from "react"
import crmData from "@marketingkpi/core/src/data/channelEfficiencyData.json"
import kakaoData from "@marketingkpi/core/src/data/kakaoCampaignData.json"
import type { MonthlyChannelData, KakaoMonthlyData } from "@marketingkpi/core"
import { CrmMonthSummary, KakaoWeeklyTable, AppPushTable, KakaoCampaignTable } from "@marketingkpi/ui"
import { SectionHeader } from "@marketingkpi/ui"

type Tab = "crm" | "kakao"

// ── 메인 페이지 ──────────────────────────────────────────

export default function ChannelEfficiencyPage() {
  const [tab, setTab] = useState<Tab>("crm")
  const [selectedMonth, setSelectedMonth] = useState(
    tab === "crm"
      ? (crmData.months as MonthlyChannelData[])[0].month
      : (kakaoData.months as KakaoMonthlyData[])[0].month
  )

  const crmMonths = crmData.months as MonthlyChannelData[]
  const kakaoMonths = kakaoData.months as KakaoMonthlyData[]
  const months = tab === "crm" ? crmMonths : kakaoMonths

  const handleTabChange = (t: Tab) => {
    setTab(t)
    setSelectedMonth(t === "crm" ? crmMonths[0].month : kakaoMonths[0].month)
  }

  const crmCurrent = crmMonths.find((m) => m.month === selectedMonth)
  const kakaoCurrent = kakaoMonths.find((m) => m.month === selectedMonth)

  const tabs: { key: Tab; label: string }[] = [
    { key: "crm", label: "CRM 주차별" },
    { key: "kakao", label: "카카오 건별" },
  ]

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <SectionHeader
        variant="page"
        title="채널 효율 지표"
        description="차일디 KAKAO · APP PUSH 성과 (25.11~)"
        actions={
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-on-surface fontHeadline focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
          >
            {months.map((m) => (
              <option key={m.month} value={m.month}>{m.month.slice(0, 4)}년 {m.label}</option>
            ))}
          </select>
        }
      />

      {/* 탭 */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => handleTabChange(t.key)}
            className={`px-5 py-2 rounded-md text-sm font-bold transition-all ${
              tab === t.key
                ? "bg-white text-primary shadow-sm"
                : "text-slate-500 hover:text-on-surface"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 콘텐츠 */}
      {tab === "crm" && crmCurrent && (
        <>
          <CrmMonthSummary month={crmCurrent} />
          <KakaoWeeklyTable weeks={crmCurrent.weeks} />
          <AppPushTable weeks={crmCurrent.weeks} />
        </>
      )}
      {tab === "kakao" && kakaoCurrent && (
        <KakaoCampaignTable weeks={kakaoCurrent.weeks} />
      )}

      <div className="h-10" />
    </div>
  )
}
