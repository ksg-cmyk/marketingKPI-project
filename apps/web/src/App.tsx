import { useEffect, useState } from "react"
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import { Sidebar, TopBar } from "@marketingkpi/ui"
import DashboardPage from "./features/dashboard"
import ChannelEfficiencyPage from "./features/channel-efficiency"
import PerformanceAnalysisPage from "./features/performance-analysis"
import type { Brand, PerformanceRow } from "@marketingkpi/core"
import { fetchAvailableBrands, fetchPerformanceRows } from "@marketingkpi/core"

type Page = "dashboard" | "channel-efficiency" | "performance-analysis"

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPage = location.pathname.replace("/", "") as Page || "dashboard"

  const [currentBrand, setCurrentBrand] = useState<string>("")
  const [availableBrands, setAvailableBrands] = useState<Brand[]>([])
  const [allRows, setAllRows] = useState<PerformanceRow[]>([])

  useEffect(() => {
    fetchAvailableBrands().then((brands) => {
      setAvailableBrands(brands)
      const initialBrand = brands.find((b) => b.code === "차일디")?.code ?? brands[0]?.code
      if (initialBrand) {
        setCurrentBrand(initialBrand)
        fetchPerformanceRows(initialBrand).then(setAllRows)
      }
    })
  }, [])

  const handleBrandChange = (code: string) => {
    setCurrentBrand(code)
    fetchPerformanceRows(code).then(setAllRows)
  }

  return (
    <div className="flex h-screen bg-slate-50 fontHeadline tracking-tight text-on-surface">
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => navigate(`/${page}`)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar
          currentBrand={currentBrand}
          brands={availableBrands}
          onBrandChange={handleBrandChange}
        />

        <div className="flex-1 overflow-auto bg-white/40 dark:bg-slate-950/20 backdrop-blur-3xl customScrollbar">
          <main className="p-8 lg:p-10 w-full max-w-[1700px] mx-auto min-h-full space-y-10 animate-in fade-in duration-1000">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage currentBrand={currentBrand} rows={allRows} />} />
              <Route path="/channel-efficiency" element={<ChannelEfficiencyPage />} />
              <Route path="/performance-analysis" element={<PerformanceAnalysisPage brand={currentBrand} rows={allRows} />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}
