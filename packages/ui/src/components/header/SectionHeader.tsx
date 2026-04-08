import type { ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  variant?: 'page' | 'section'
}

export default function SectionHeader({ title, description, actions, variant = 'section' }: SectionHeaderProps) {
  // 채널 효율 지표 페이지의 '웅장한(text-3xl)' 스타일을 앱 전체의 표준으로 설정합니다.
  // p-8 padding과 하단 border-b를 유지하면서, 제목의 크기를 3xl로 키우고 
  // 우측에 액션(셀렉트 박스 등)이 자연스럽게 붙는 구조입니다.
  
  return (
    <div className={`p-8 border-b border-slate-100 flex flex-col md:flex-row md:justify-between md:items-end bg-white/50 backdrop-blur-sm ${variant === 'page' ? 'mb-8' : ''}`}>
      <div className="flex-1">
        <h1 className="text-3xl fontHeadline font-black text-on-surface tracking-tight mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-slate-500 font-medium text-sm max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      
      {actions && (
        <div className="flex items-center space-x-4 mt-6 md:mt-0 md:pb-1">
          {actions}
        </div>
      )}
    </div>
  )
}
