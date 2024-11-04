import api from '@/api/api_instance'
import Default from '@/layouts/Default'
import { getMenus, getMetaData, getPostBySlug, getPostsByCategory } from '@/resources/api-constants'
import { IPostList, IServerProps } from '@/types/app-type'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { GetServerSidePropsContext } from 'next'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'

interface IPostProps {
  post: IPostList
  categories: IPostList[]
}

const NewsList = dynamic(() => import('@/components/Page/NewsList'))

const DetailNews = ({ data, metadata, menu }: IServerProps<IPostProps>) => {
  const t = useTranslations('NewsDetail')
  const dataNews = { posts: data.categories }
  return (
    <>
      <Default menu={menu} metadata={metadata}>
        <div className="mx-2.5">
          <h1 className="py-1 -2.5  border-b-1 border-[#eee] font-bold text-red">{data.post.title}</h1>
          <h2 className="py-1   mb-2.5  font-bold ">{data.post.description}</h2>
          <div className="  text-sm text-[#a0a0a0]">
            <FontAwesomeIcon icon={faUser} className="text-[#a0a0a0] mr-3" /> <b> {data.post.author.name}</b> -{' '}
            {dayjs(data.post.updated_at).format('DD/MM/YYYY HH:mm')}
          </div>
          <div className="text-sm py-2.5 bg-[#f6fbff] my-2 *:mb-2">
            <div dangerouslySetInnerHTML={{ __html: data.post.body }}></div>
          </div>
        </div>
        <h1 className="text-primary font-bold mx-2.5 my-5">{t('sameCategory')}</h1>
        <div className="mx-2.5">
          <NewsList data={dataNews}></NewsList>
        </div>
      </Default>
    </>
  )
}

export default DetailNews

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''
  const metadata = await getMetaData({ type: 'analysis', slug: slugRaw, url: `/analysis/${slugRaw}` })
  const menu = await getMenus(context.locale ?? 'en')

  const post = await getPostBySlug({ slug: slugRaw })
  const postByCategory = await getPostsByCategory({ categoryId: post.data.slug, perPage: 20 })
  //pre-render data

  return { props: { data: { post: post.data, categories: postByCategory.data }, metadata: metadata.data, menu } }
}
