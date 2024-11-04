import { useRouter } from 'next/router'
import { useEffect } from 'react'

const TagsPageList = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/not-found')
  }, [router])
  return <></>
}

export default TagsPageList
