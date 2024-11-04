import api from '@/api/api_instance'
import Default from '@/layouts/Default'
import { getMenus, getMetaData, getPostsByCategory } from '@/resources/api-constants'
import { IPostList, IServerProps } from '@/types/app-type'
import { METADATA_TYPE } from '@/utility/constant'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

interface IDataFootball {
  posts: IPostList[]
}

const News = dynamic(() => import('@/components/Page/News'))

const CategoriesPageList = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  return (
    <Default metadata={metadata} menu={menu}>
      <News data={data}></News>
    </Default>
  )
}

export default CategoriesPageList

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const slugRaw: string = (context.params?.slug as string) ?? ''

  //pre-render data
  const [metadata, menu] = await Promise.all([
    getMetaData({ type: METADATA_TYPE.CATEGORY, slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}${slugRaw}/news` }),
    getMenus(context.locale ?? 'en')
  ])
  try {
    const result = await getPostsByCategory({ page: 1, categoryId: slugRaw })

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
