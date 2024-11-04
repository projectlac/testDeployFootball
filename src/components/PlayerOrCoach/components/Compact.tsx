import { getPlayers } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { IPlayer, IStaticProps, PaginationResponse } from '@/types/app-type'
import { stringToSlug } from '@/utility/stringToSlug'
import { isUndefined } from 'lodash'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

interface IDataFootball {
  playerList: PaginationResponse<IPlayer[]>
}

const CompactPlayer = ({ data }: IStaticProps<IDataFootball>) => {
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const t = useTranslations('Player')
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [playerList, setPlayerList] = useState<IPlayer[]>(data.playerList.data)
  const [page, setPage] = useState<number>(1)

  const fetchData = useCallback(
    async (page: number) => {
      dispatch(loadingAction.show())
      try {
        const res = await getPlayers({ perPage: 32, page: page })

        if (res.data.length < 32) {
          setIsLoadMore(false)
          return
        }
        if (playerList) {
          setPlayerList([...playerList, ...res.data])
        } else {
          setPlayerList(res.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(loadingAction.hide())
      }
    },
    [page]
  )

  return (
    <div className="px-2 md:px-0">
      {!isUndefined(pathname) && (
        <div>
          {pathname.includes('player') && (
            <div className="">
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
                dataLength={playerList.length}
              >
                <div className="flex flex-wrap md:gap-3 xs:gap-0">
                  {playerList &&
                    playerList.map((item, index) => {
                      return (
                        <div key={index} className="text-sm p-2 border border-[#eee] flex items-center md:w-[calc((100%-12px)/2)] w-full mt-2 relative">
                          <div className="h-9 w-full absolute top-0 left-0 bg-[#efefef] flex items-center">
                            <b className="text-sm font-semibold text-primary pl-[100px]">
                              <Link href={`/${item.slug ?? stringToSlug(item.name)}/${item.api_id}/${pathname.includes('player') ? 'player' : 'coach'}`}>
                                {item.name}
                              </Link>
                            </b>
                          </div>
                          <div className="flex z-2 relative">
                            <div className="p-2 border border-[#eee] w-[75px] bg-white">
                              <Image src={item.photo} alt={item.name} width={75} height={75} />
                            </div>
                          </div>
                          <div className="ml-2 mt-8 pl-3 flex w-full items-end">
                            <div className="w-[50%]">
                              <p className="mb-1">
                                {t('age')}: <b>{item?.age ?? '-'}</b>
                              </p>
                              <p>
                                {t('nat')}: <b>{item?.nationality ?? '-'}</b>
                              </p>
                            </div>
                            <p>
                              {t('team')}: <b>{item?.team?.name ?? '-'}</b>
                            </p>
                          </div>
                          <div className="absolute right-6 top-2 z-4 bg-white">
                            <div className="w-[50px] p-2 border border-[#eee] ">
                              <Image src={item.team.logo} alt={item.team.name} width={50} height={50} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </InfiniteScroll>
            </div>
          )}

          {pathname.includes('coach') && (
            <div className="">
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
                dataLength={playerList.length}
              >
                <div className="flex flex-wrap md:gap-3 xs:gap-0">
                  {playerList &&
                    playerList.map((item, index) => {
                      return (
                        <div key={index} className="text-sm p-2 border border-[#eee] flex items-center md:w-[calc((100%-12px)/2)] w-full mt-2 relative">
                          <div className="h-9 w-full absolute top-0 left-0 bg-[#efefef] flex items-center">
                            <b className="text-sm font-semibold text-primary pl-[100px]">
                              <Link href={`/${item.slug ?? stringToSlug(item.name)}/${item.api_id}/${pathname.includes('player') ? 'player' : 'coach'}`}>
                                {item.name}
                              </Link>
                            </b>
                          </div>
                          <div className="flex z-2 relative">
                            <div className="p-2 border border-[#eee] w-[75px] bg-white">
                              <Image src={item.photo} alt={item.name} width={75} height={75} />
                            </div>
                          </div>
                          <div className="ml-2 mt-8 pl-3 flex w-full items-end">
                            <div className="w-[50%]">
                              <p className="mb-1">
                                {t('age')}: <b>{item?.age ?? '-'}</b>
                              </p>
                              <p>
                                {t('nat')}: <b>{item?.nationality ?? '-'}</b>
                              </p>
                            </div>
                            <p>
                              {t('team')}: <b>{item?.team?.name ?? '-'}</b>
                            </p>
                          </div>
                          <div className="absolute right-6 top-2 z-4 bg-white">
                            <div className="w-[50px] p-2 border border-[#eee] ">
                              <Image src={item.team.logo} alt={item.team.name} width={50} height={50} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </InfiniteScroll>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CompactPlayer
