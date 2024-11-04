import { IMetadataModel } from '@/types/app-type'
import { useTranslations } from 'next-intl'
import React from 'react'

const PlayerOrCoach = ({ children, metadata }: { children: React.ReactNode; metadata: IMetadataModel }) => {
  const t = useTranslations('PlayerOrCoach')

  return (
    <>
      <h1 className="py-1 px-2.5 bg-[#f9f9f9] mb-2.5 border border-[#eee] font-bold text-secondary">{metadata.slug === 'coachs' ? t('coach') : t('player')}</h1>
      <div className="border-b-2 border-secondary mt-2"></div>
      {children}
    </>
  )
}

export default PlayerOrCoach
