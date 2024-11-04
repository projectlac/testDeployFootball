'use client'
import React, { useEffect } from 'react'
import { format } from 'date-fns'
import { usePathname, useRouter } from 'next/navigation'
import content from './redirect.json'
interface Props {
  children?: React.ReactNode
}

const RedirectGuard = ({ children }: Props) => {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd')

    content.map((item: any) => {
      if (item?.start_at <= today && item?.end_at >= today && pathname === item?.origin_link) {
        return router.push(item?.redirect_link)
      }
    })
  }, [pathname, router])
  return <>{children}</>
}

export default RedirectGuard
