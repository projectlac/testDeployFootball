import api from '@/api/api_instance'
import Default from '@/layouts/Default'
import { getMenus, getMetaData, getNationalGroupByRegion } from '@/resources/api-constants'
import { ICountryRegion, IServerProps } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

interface IDataFootball {
  regionList: ICountryRegion[]
}

const NationalTeamPage = dynamic(() => import('@/components/Page/National/NationalTeam'))

const NationalListPage = ({ metadata, menu }: IServerProps<IDataFootball>) => {
  return (
    <Default metadata={metadata} menu={menu}>
      <NationalTeamPage></NationalTeamPage>
    </Default>
  )
}

export default NationalListPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const slugRaw: string = (context.params?.slug as string) ?? ''
  const slug = slugRaw.replace('-football', '')
  const type = slugRaw?.includes('-football') ? 'country' : 'league'
  const [metadata, menu] = await Promise.all([
    getMetaData({ type: type, slug: slug, url: `${renderPrefixLang(context.locale ?? '')}${slugRaw}/national-teams` }),
    getMenus(context.locale ?? 'en')
  ])
  //pre-render data

  try {
    const regionList = await getNationalGroupByRegion()
    return { props: { data: { regionList: regionList.data }, metadata: metadata.data, menu } }
  } catch (error) {
    return {
      redirect: {
        permanent: false, // or true
        destination: '/not-found'
      }
    }
  }
}
