'use client'
import Default from '@/layouts/Default'
import { getMenus, getMetaData } from '@/resources/api-constants'
import { ROUTES } from '@/resources/routes-constants'
import { IServerProps } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/navigation'

const NotFound = ({ metadata, menu }: IServerProps<null>) => {
  const router = useRouter()

  /**
   * Call this function to redirect the user to the homepage.
   */
  const redirectToHomePage = () => {
    router.push(ROUTES.HOMEPAGE_ROUTE)
  }

  return (
    <Default metadata={metadata} menu={menu}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <h1 style={{ fontSize: '4em' }}>Oops 404!</h1>
        <span style={{ cursor: 'pointer' }} onClick={() => redirectToHomePage()}>
          Homepage
        </span>
      </div>
    </Default>
  )
}

export default NotFound

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slugRaw: string = (context.params?.slug as string) ?? ''

  const metadata = await getMetaData({ type: 'not-found', slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}not-found` })
  //pre-render data
  const menu = await getMenus(context.locale ?? 'en')

  return { props: { data: { posts: [] }, metadata: metadata.data, menu } }
}
