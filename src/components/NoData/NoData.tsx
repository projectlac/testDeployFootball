import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import React from 'react'

function NoData() {
  const t = useTranslations('NoData')
  return (
    <div>
      <div className="mt-2 text-center">{t('title')}</div>
      <div className="text-right text-sm">
        {t('time')} {dayjs().format('DD/MM/YYYY HH:mm')}
      </div>
    </div>
  )
}

export default NoData
