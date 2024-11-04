import { getLeagues } from '@/resources/api-constants'
import { ROUTES } from '@/resources/routes-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { fetchMetaData } from '@/store/slice/metadata.slice'
import { ILeague } from '@/types/app-type'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const Tournament = () => {
  const [leagues, setLeagues] = useState<ILeague[] | null>(null)
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()
  const params = useParams<{ slug: string }>()
  const pathname = usePathname()

  const fetchMeta = async () => {
    try {
      const slug = (params?.slug ?? '').replace('-football', '')
      const type = params?.slug?.includes('-football') ? 'country' : 'league'

      dispatch(fetchMetaData({ slug, url: pathname, type }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMeta()
  }, [])

  const fetchData = async (page: number) => {
    try {
      if (!params?.slug) {
        return
      }
      const result = await getLeagues({
        countrySlug: params?.slug.includes('-football') ? params?.slug.replace('-football', '') : params?.slug,
        countryStandingPage: 1,
        page
      })

      if (result.data.length < 15) {
        setIsLoadMore(false)
      }
      if (leagues) {
        setLeagues([...leagues, ...result.data])
      } else {
        setLeagues(result.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }
  useEffect(() => {
    dispatch(loadingAction.show())
    fetchData(1)
  }, [params?.slug])

  return (
    <div>
      <div className="py-2.5 pl-1 my-2.5 bg-[#f9f9f9] border border-[#eee]">
        <h1 className="text-sm font-bold text-red">HỆ THỐNG DANH SÁCH GIẢI ĐẤU BÓNG ĐÁ ANH</h1>
      </div>

      {leagues && (
        <InfiniteScroll
          style={{
            height: 'unset',
            overflow: 'unset'
          }}
          hasMore={isLoadMore}
          loader={<p>Loading...</p>}
          next={() => {
            setPage((prev) => prev + 1)
            fetchData(page + 1)
          }}
          dataLength={leagues.length}
        >
          <table className="w-full">
            <thead>
              <tr className="bg-[#edf2f7] text-left text-sm [&>th]:p-2">
                <th>Tên giải đấu</th>
                <th>Hạng</th>
                <th>Thể thức</th>
              </tr>
            </thead>
            <tbody>
              {leagues.map((item, index) => {
                return (
                  <tr key={index} className="text-sm [&>td]:p-2 border-b border-[#eee]">
                    <td>
                      <Link
                        className="text-primary hover:text-red inline-flex gap-4 items-center"
                        href={ROUTES.NATIONAL_RESULTS.replace(':id', item.slug ?? '')}
                      >
                        <Image className="max-w-5" width={20} height={20} src={item.logo} alt={item.name} />
                        {item.name}
                      </Link>
                    </td>
                    <td></td>
                    <td>{item.type}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </InfiniteScroll>
      )}
    </div>
  )
}

export default Tournament
