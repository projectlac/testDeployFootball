import api from '@/api/api_instance'
import Default from '@/layouts/Default'
import { getMenus, getMetaData, getPostsByTag } from '@/resources/api-constants'
import { IPostList, IServerProps } from '@/types/app-type'
import { METADATA_TYPE } from '@/utility/constant'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

interface IDataFootball {
  posts: IPostList[]
}

const News = dynamic(() => import('@/components/Page/News'))

const TagsPageList = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  return (
    <Default metadata={metadata} menu={menu}>
      <News data={data}></News>
    </Default>
  )
}

export default TagsPageList

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slugRaw: string = (context.params?.slug as string) ?? ''
  api.defaults.headers.common['lang'] = context.locale
  const metadata = await getMetaData({ type: METADATA_TYPE.TAG, slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}tag/${slugRaw}` })
  //pre-render data
  const menu = await getMenus(context.locale ?? 'en')

  try {
    const result = await getPostsByTag({ page: 1, tag: slugRaw })

    return { props: { data: { posts: result.data }, metadata: metadata.data, menu } }
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        destination: '/not-found'
      }
    }
  }
}
