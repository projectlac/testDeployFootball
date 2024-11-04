import api from '@/api/api_instance'
import AdsSidebar from '@/assets/images/ads-sidebar.gif'
import { getLastestNew, getPopularLeagues, getSidebarDataBySlug, popularLeaguesRight, searchLeagues } from '@/resources/api-constants'
import { ROUTES } from '@/resources/routes-constants'
import { IAppMenu, IDataSideBar, ILeague, IPostList } from '@/types/app-type'
import { TrophyFilled } from '@carbon/icons-react'
import { debounce } from 'lodash'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'

interface IMMenuPropsSideBar {
  menu: IAppMenu
}
const Sidebar = ({ menu }: IMMenuPropsSideBar) => {
  const t = useTranslations('Slide')
  const params = useParams<{ slug: string }>()
  const [dynamicData, setDynamicData] = useState<IDataSideBar | undefined>(undefined)
  const [popular, setPopular] = useState<IDataSideBar | undefined>(undefined)
  const [news, setNews] = useState<IPostList[] | undefined>(undefined)
  const lang = useLocale()

  const [leagues, setLeagues] = useState<ILeague[]>([])
  const [searchResult, setSearchResult] = useState<ILeague[]>([])
  const [searchText, setSearchText] = useState('')
  const router = useRouter()

  const fetchData = async () => {
    try {
      const result = await getPopularLeagues(router.locale)
      setLeagues(result)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSearchLeagues = async (value: string) => {
    try {
      if (value.length > 2) {
        const result = await searchLeagues({ keyword: value })
        setSearchResult(result)
      } else {
        setSearchResult([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const debounceDropDown = useCallback(
    debounce((nextValue) => fetchSearchLeagues(nextValue), 1000),
    []
  )

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchText(value)
    debounceDropDown(value)
  }

  const fetchDataSldeBar = useCallback(async () => {
    try {
      const res = await getSidebarDataBySlug(params?.slug ?? '', router.asPath)
      setDynamicData(res)
    } catch (error) {
      console.error(error)
    }
  }, [params?.slug, router.asPath])

  const fetchPopularLeaguesRight = useCallback(async () => {
    try {
      const res = await popularLeaguesRight(params?.slug ?? '', router.asPath)
      setPopular(res)
    } catch (error) {
      console.error(error)
    }
  }, [params?.slug, router.asPath])

  const fetchNews = useCallback(async () => {
    try {
      const res = await getLastestNew()
      setNews(res.data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    api.defaults.headers.common['lang'] = lang
    fetchData()
    fetchDataSldeBar()
    fetchPopularLeaguesRight()
    fetchNews()
  }, [params?.slug, router.asPath])

  return (
    <>
      <div className="hidden md:flex mb-4 flex-wrap">
        <div className="w-1/2 relative">
          <Image src={AdsSidebar.src} alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="w-1/2 relative">
          <Image src={AdsSidebar.src} alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="w-1/2 relative">
          <Image src={AdsSidebar.src} alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="w-1/2 relative">
          <Image src={AdsSidebar.src} alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="w-1/2 relative">
          <Image src={AdsSidebar.src} alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="w-1/2 relative">
          <Image src={AdsSidebar.src} alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="w-1/2 relative">
          <Image src={AdsSidebar.src} alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="w-1/2 relative">
          <Image src={AdsSidebar.src} alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
        </div>
      </div>
      {dynamicData && dynamicData.heading?.name && (
        <div className="mt-2 text-sm bg-[#f0f0f0]">
          <div className="bg-[#dce0e4] py-2 px-1">
            <div className="uppercase font-bold flex items-center">
              <TrophyFilled className="text-red" />
              <Link href={`/${dynamicData.heading?.url ?? ''}`}>{dynamicData.heading?.name}</Link>
            </div>
          </div>
          <ul className="p-3">
            {dynamicData?.items?.map((item, index) => {
              return (
                <li key={index} className="my-1 inline-block w-[100%]">
                  <Link className="inline-flex gap-1 text-primary hover:text-red" href={`/${item.url}`}>
                    <Image src={item.logo} alt={item.name} width={16} height={16} /> {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      <div className="text-sm bg-[#f0f0f0]">
        <div className="bg-[#dce0e4] py-2 px-1">
          <p className="uppercase font-bold flex items-center">
            <TrophyFilled className="text-red" />
            {t('hostest')}
          </p>
        </div>
        <div className="p-1">
          <input
            value={searchText}
            onChange={handleSearch}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={t('searchtext')}
            required
          />
        </div>
        <ul className="p-1">
          {searchText ? (
            <>
              {searchResult.length > 0 ? (
                searchResult.map((item, index) => {
                  return <Item item={item} key={index} />
                })
              ) : (
                <p>{t('noResult')}</p>
              )}
            </>
          ) : (
            leagues.map((item, index) => {
              return <Item item={item} key={index} />
            })
          )}
        </ul>
      </div>

      {menu && menu['right-cup'] && (
        <div className="mt-2 text-sm bg-[#f0f0f0]">
          <div className="bg-[#dce0e4] py-2 px-1">
            <p className="uppercase font-bold flex items-center">
              <TrophyFilled className="text-red" />
              {t('world')}
            </p>
          </div>
          <ul className="p-3">
            {menu['right-cup']?.items?.map((item, index) => {
              return (
                <li key={index} className="my-1 inline-block w-[48%]">
                  <Link className="inline-flex gap-1 text-primary hover:text-red" href={item.url}>
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {popular && popular.heading.name && (
        <div className="mt-2 text-sm bg-[#f0f0f0]">
          <div className="bg-[#dce0e4] py-2 px-1">
            <p className="uppercase font-bold flex items-center">
              <TrophyFilled className="text-red" />
              <h2>{popular.heading.name}</h2>
            </p>
          </div>
          <ul className="p-3">
            {popular?.items?.map((item, index) => {
              return (
                <li key={index} className="my-1 inline-block w-[100%]">
                  <Link className="inline-flex gap-1 text-primary hover:text-red" href={`/${item.url}`}>
                    <Image src={item.logo} alt={item.name} width={16} height={16} /> {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {news && news.length > 0 && (
        <div className="mt-2 text-sm bg-[#f0f0f0]">
          <div className="bg-[#dce0e4] py-2 px-1">
            <p className="uppercase font-bold flex items-center">
              <TrophyFilled className="text-red" />
              News
            </p>
          </div>
          <ul className="p-3">
            {news.map((item, index) => {
              return (
                <li key={index} className="my-1 inline-block w-[100%]">
                  <Link className="inline-flex gap-1 text-primary hover:text-red" href={`/${item.slug}-a${item.id}`}>
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}

interface ItemProps {
  item: ILeague
}

const Item: FC<ItemProps> = ({ item }) => {
  return (
    <li className="inline-block w-[48%]">
      <Link href={ROUTES.NATIONAL_RESULTS.replace(':id', item.slug)} className="inline-flex gap-1 text-primary hover:text-red">
        <div>
          <Image width={16} height={16} src={item.logo} alt={item?.name ?? ''} />
        </div>
        {item.name}
      </Link>
    </li>
  )
}

export default memo(Sidebar)
