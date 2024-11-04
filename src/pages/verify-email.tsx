// import Tournament from '@/components/Tournament'

import { getMenus, getMetaData, verifyAccount } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { userAction } from '@/store/slice/user.slice'
import { IAppMenu, IMetadataModel } from '@/types/app-type'
import { GetServerSidePropsContext } from 'next'
import { useLocale, useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import api from '@/api/api_instance'
import { renderPrefixLang } from '@/utility/stringToSlug'

const Default = dynamic(() => import('@/layouts/Default'))

const VerifyEmail = ({ metadata, menu }: { metadata: IMetadataModel; menu: IAppMenu }) => {
  const t = useTranslations('AuthenPage')
  const [isVerified, setVerified] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const searchParam = useSearchParams()
  const router = useRouter()
  const lang = useLocale()
  const verify = useCallback(async () => {
    try {
      const id = searchParam.get('id')
      const hash = searchParam.get('hash')

      if (!id || !hash) {
        router.push(`${lang === 'en' ? '/' : '/vi'}`)
        return
      }

      const res = await verifyAccount(id, hash)
      if (res) {
        toast.success(res.message)
        setVerified(true)
        setTimeout(() => {
          router.push(`${lang === 'en' ? '' : '/vi'}/login`)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }, [lang, router, searchParam])

  useEffect(() => {
    dispatch(userAction.clearUser(null))
    Cookies.remove('token')
    verify()
  }, [dispatch, verify])

  return (
    <Default menu={menu} metadata={metadata}>
      {isVerified ? <div className="text-center">{t('verified')}</div> : <div className="text-center">{t('verify')}</div>}
    </Default>
  )
}

export default VerifyEmail

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const slug = ''
  const [metadata, menu] = await Promise.all([
    getMetaData({ type: 'home', slug: slug, url: `${renderPrefixLang(context.locale ?? '')}not-found` }),
    getMenus(context.locale ?? 'en')
  ])
  // Fetch data from external API
  try {
    // Pass data to the page via props
    return { props: { data: null, metadata: metadata.data, menu } }
  } catch (error) {
    return { props: { data: null, metadata: metadata.data, menu } }
  }
}
