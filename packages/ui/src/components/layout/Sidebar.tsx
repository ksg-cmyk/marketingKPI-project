type Page = "dashboard" | "channel-efficiency" | "performance-analysis"

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems: { icon: string; label: string; page: Page }[] = [
  { icon: "dashboard", label: "대시보드", page: "dashboard" },
  { icon: "bar_chart", label: "성과 분석", page: "performance-analysis" },
  { icon: "analytics", label: "채널 효율", page: "channel-efficiency" },
]

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="h-full w-72 flex-shrink-0 bg-slate-50 border-r border-slate-200 flex flex-col p-8 space-y-2 z-50">
      <div className="mb-10">
        <div className="text-2xl font-black text-primary mb-1">마케팅 KPI</div>
        <p className="fontHeadline text-xs font-semibold text-slate-500 uppercase tracking-widest">
          프리시전 분석가
        </p>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <div
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer active:scale-95 transition-all duration-200 ${
              currentPage === item.page
                ? "text-white bg-primary shadow-md font-bold"
                : "text-slate-500 hover:text-primary hover:bg-slate-200/50"
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="fontHeadline text-sm">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="pt-6 mt-6 border-t border-slate-200 space-y-2">
        <div className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 rounded-lg cursor-pointer transition-all duration-200">
          <span className="material-symbols-outlined">help</span>
          <span className="fontHeadline text-sm">고객센터</span>
        </div>
        <div className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 rounded-lg cursor-pointer transition-all duration-200">
          <span className="material-symbols-outlined">logout</span>
          <span className="fontHeadline text-sm">로그아웃</span>
        </div>
      </div>
    </aside>
  )
}
