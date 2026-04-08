import { useState, useRef, useEffect } from "react"
import type { Brand } from "@marketingkpi/core"

interface TopBarProps {
  currentBrand: string
  brands: Brand[]
  onBrandChange: (code: string) => void
}

// 명시적으로 default 내보내기를 사용하여 index.ts의 오류를 해결합니다.
export default function TopBar({ currentBrand, brands, onBrandChange }: TopBarProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selected = brands.find((b) => b.code === currentBrand) || { name: "브랜드 선택", code: "" }

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-2xl font-bold">analytics</span>
        </div>
        <div>
          <h1 className="text-lg font-black fontHeadline tracking-tight text-on-surface">마케팅 KPI 대시보드</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time Performance tracking</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* 년도 선택 드롭다운 (복구됨) */}
        <div className="hidden lg:flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200/50 cursor-pointer hover:bg-slate-100 transition-colors group">
          <span className="fontHeadline text-[11px] font-black text-slate-500 uppercase tracking-wider">2025년 누적 데이터</span>
          <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-primary transition-colors">expand_more</span>
        </div>

        {/* 브랜드 선택 드롭다운 */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center space-x-3 bg-white px-5 py-2.5 rounded-2xl editorialShadow border border-slate-100 hover:bg-slate-50 transition-all active:scale-95 group"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-sm shadow-primary/20" />
            <span className="fontHeadline text-sm font-black text-on-surface tracking-tight">
              {selected.name}
            </span>
            <span className={`material-symbols-outlined text-[20px] text-slate-300 transition-transform duration-300 ${open ? 'rotate-180 text-primary' : 'group-hover:text-primary/50'}`}>
              expand_more
            </span>
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-3 border-b border-slate-50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">브랜드 전환</span>
              </div>
              <div className="py-1">
                {brands.map((brand) => (
                  <button
                    key={brand.code}
                    onClick={() => {
                      onBrandChange(brand.code)
                      setOpen(false)
                    }}
                    className={`w-full text-left px-5 py-3.5 text-sm fontHeadline font-bold transition-all flex items-center justify-between ${
                      brand.code === currentBrand
                        ? "bg-primary/5 text-primary"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {brand.name}
                    {brand.code === currentBrand && (
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
