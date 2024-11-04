import { useRouter } from 'next/router'
import { useEffect } from 'react'

const DateSlug404 = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/not-found')
  }, [router])
  return <></>
}

export default DateSlug404
