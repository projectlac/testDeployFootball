import api from '@/api/api_instance'
import Default from '@/layouts/Default'
import { getMenus, getMetaData, getTeamDetail } from '@/resources/api-constants'
import { IServerProps, ITeamDetail } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

interface IDataFootball {
  teamDetail: ITeamDetail
}

const ClubPage = dynamic(() => import('@/components/Page/Club/ClubPage'))

const ClubPageDetail = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  return (
    <Default metadata={metadata} menu={menu}>
      <ClubPage data={data}></ClubPage>
    </Default>
  )
}

export default ClubPageDetail

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const params = context.params
  const slugRaw = (params?.slug as string) ?? ''

  const [metadata, menu] = await Promise.all([
    getMetaData({ slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}${slugRaw}/club`, type: 'team' }),
    getMenus(context.locale ?? 'en')
  ])

  try {
    const teamDetail = await getTeamDetail({ team_slug: slugRaw })

    return { props: { data: { teamDetail: teamDetail }, metadata, menu } }
  } catch (error) {
    return {
      redirect: {
        permanent: false, // or true
        destination: '/not-found'
      }
    }
  }
}
