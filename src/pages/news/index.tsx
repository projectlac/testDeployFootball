import api from '@/api/api_instance'
import Default from '@/layouts/Default'
import { getAllPosts, getMenus, getMetaData } from '@/resources/api-constants'
import { IPostList, IServerProps } from '@/types/app-type'
import { METADATA_TYPE } from '@/utility/constant'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

interface IDataFootball {
  posts: IPostList[]
}

const News = dynamic(() => import('@/components/Page/News'))

const NewsListPage = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  return (
    <Default metadata={metadata} menu={menu}>
      <News data={data}></News>
    </Default>
  )
}

export default NewsListPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''
  api.defaults.headers.get['lang'] = context.locale
  const [metadata, menu] = await Promise.all([
    getMetaData({ type: METADATA_TYPE.NEWS, slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}news` }),
    await getMenus(context.locale ?? 'en')
  ])

  //pre-render data
  try {
    api.defaults.headers.get['lang'] = context.locale
    const result = await getAllPosts({ page: 1, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })

    return { props: { data: { posts: result.data ?? null }, metadata: metadata.data, menu } }
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        destination: '/not-found'
      }
    }
  }
}
