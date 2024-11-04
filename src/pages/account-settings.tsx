'use client'
import AccountDetail from '@/components/Account/Account'
import Default from '@/layouts/Default'
import { getMenus, getMetaData } from '@/resources/api-constants'
import { IAppMenu } from '@/types/app-type'
import { GetServerSidePropsContext } from 'next'
import api from '@/api/api_instance'
import { renderPrefixLang } from '@/utility/stringToSlug'
const AccountSetting = ({ menu }: { menu: IAppMenu }) => {
  return (
    <Default menu={menu}>
      <AccountDetail />
    </Default>
  )
}

export default AccountSetting

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const slug = ''
  const [metadata, menu] = await Promise.all([
    getMetaData({ type: 'about-us', slug: slug, url: `${renderPrefixLang(context.locale ?? '')}account-setting` }),
    getMenus(context.locale ?? 'en')
  ])

  //pre-render data

  return { props: { data: null, metadata: metadata.data, menu } }
}
