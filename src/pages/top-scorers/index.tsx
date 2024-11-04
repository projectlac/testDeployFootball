'use client'

import api from '@/api/api_instance'
import Default from '@/layouts/Default'
import { getMenus, getMetaData, getPopularLeagues } from '@/resources/api-constants'
import { ROUTES } from '@/resources/routes-constants'
import { ILeague, IServerProps } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

interface IDataFootball {
  leagues: ILeague[]
}

const TopScore = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  const t = useTranslations('TopScore')
  return (
    <Default menu={menu} metadata={metadata}>
      {data.leagues.map((item, index) => {
        return (
          <div key={index} className="text-sm [&>td]:p-2 border-b border-[#eee] px-2 py-2.5 flex justify-between">
            <Link className="text-primary hover:text-red font-bold flex items-center gap-4" href={ROUTES.TOURNAMENT_TOP_SCORES.replace(':id', item.slug ?? '')}>
              <Image width={20} height={20} className="max-w-5" src={item.logo} alt={item.name} />
              {t('goal')} {item.name}
            </Link>
            <div>{new Date(item.updated_at).toLocaleDateString()}</div>
          </div>
        )
      })}
    </Default>
  )
}

export default TopScore

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slugRaw: string = (context.params?.slug as string) ?? ''
  api.defaults.headers.common['lang'] = context.locale
  const metadata = await getMetaData({
    type: 'top-scorers',
    slug: slugRaw,
    url: `${renderPrefixLang(context.locale ?? '')}top-scorers`
  })

  //pre-render data
  const menu = await getMenus(context.locale ?? 'en')

  try {
    const leagues = await getPopularLeagues(context.locale)

    return { props: { data: { leagues }, metadata: metadata.data, menu } }
  } catch (error) {
    return { props: { data: [] }, metadata: metadata.data, menu }
  }
}
