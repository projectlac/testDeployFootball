import api from '@/api/api_instance'
import Default from '@/layouts/Default'
import { getAllPostsByAuthor, getMenus, getMetaData } from '@/resources/api-constants'
import { IPostList, IServerProps } from '@/types/app-type'
import { METADATA_TYPE } from '@/utility/constant'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

interface IDataFootball {
  posts: IPostList[]
}

const News = dynamic(() => import('@/components/Page/News'))

const AuthorPageList = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  return (
    <Default metadata={metadata} menu={menu}>
      <News data={data}></News>
    </Default>
  )
}

export default AuthorPageList

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slugRaw: string = (context.params?.slug as string) ?? ''
  api.defaults.headers.common['lang'] = context.locale
  const metadata = await getMetaData({ type: METADATA_TYPE.AUTHOR, slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}author/${slugRaw}` })

  //pre-render data
  const menu = await getMenus(context.locale ?? 'en')

  try {
    const result = await getAllPostsByAuthor({ page: 1, author: slugRaw })

    return { props: { data: { posts: result.posts.data }, metadata: metadata.data, menu } }
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        destination: '/not-found'
      }
    }
  }
}
