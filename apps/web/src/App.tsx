import { useState, useEffect } from "react"
import { Sidebar, TopBar } from "@marketingkpi/ui"
import DashboardPage from "./features/dashboard"
import ChannelEfficiencyPage from "./features/channel-efficiency"
import PerformanceAnalysisPage from "./features/performance-analysis"
import type { BrandCode, Brand } from "@marketingkpi/core"
import { fetchAvailableBrands } from "@marketingkpi/core"

type Page = "dashboard" | "channel-efficiency" | "performance-analysis"

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [currentBrand, setCurrentBrand] = useState<BrandCode>('차일디')
  const [availableBrands, setAvailableBrands] = useState<Brand[]>([])

  useEffect(() => {
    // 앱 시작 시 실제 데이터에서 사용 가능한 브랜드 목록 로드
    const init = async () => {
      const brands = await fetchAvailableBrands();
      setAvailableBrands(brands);
      
      // 만약 데이터에 차일디가 없고 다른 것만 있다면 첫 번째 것으로 변경
      if (brands.length > 0 && !brands.find(b => b.code === '차일디')) {
        setCurrentBrand(brands[0].code as BrandCode);
      }
    };
    init();
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage currentBrand={currentBrand} />
      case "channel-efficiency":
        return <ChannelEfficiencyPage />
      case "performance-analysis":
        return <PerformanceAnalysisPage brand={currentBrand} />
      default:
        return <DashboardPage currentBrand={currentBrand} />
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 fontHeadline tracking-tight text-on-surface">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar 
          currentBrand={currentBrand}
          brands={availableBrands}
          onBrandChange={(code) => setCurrentBrand(code as BrandCode)}
        />
        
        <div className="flex-1 overflow-auto bg-white/40 dark:bg-slate-950/20 backdrop-blur-3xl customScrollbar">
          <main className="p-8 lg:p-10 w-full max-w-[1700px] mx-auto min-h-full space-y-10 animate-in fade-in duration-1000">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  )
}
