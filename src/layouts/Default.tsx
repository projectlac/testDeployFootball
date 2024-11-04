import api from '@/api/api_instance'
import { IAppMenu, IMetadataModel } from '@/types/app-type'
import { parsePath } from '@/utility/stringToSlug'
import Cookies from 'js-cookie'
import { useLocale } from 'next-intl'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

const Header = dynamic(() => import('./components/Header'))
const Footer = dynamic(() => import('./components/Footer'))
const Sidebar = dynamic(() => import('@/components/Sidebar'))
const OgTag = dynamic(() => import('@/components/OgTag/OgTag'))

interface DefaultProps {
  children: ReactNode
  metadata?: IMetadataModel
  menu: IAppMenu
}

const Default = ({ children, metadata, menu }: DefaultProps) => {
  const lang = useLocale()
  const router = useRouter()
  useEffect(() => {
    Cookies.set('current_lang', lang, { expires: 30 })

    api.defaults.headers.common['lang'] = lang
  }, [lang])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathName = window.location.pathname
      const parsePathname = parsePath(pathName)
      if (parsePathname.lang !== 'vi' && parsePathname.lang !== '/') {
        router.push(parsePathname.pathname)
      }
    }
  }, [])
  return (
    <div>
      <Toaster />
      <OgTag data={metadata}></OgTag>
      <Header menu={menu} metadata={metadata} />
      <div>
        <div className="container mx-auto pb-4">
          <div className="w-[100%] md:w-[75%] xl:w-[70%] md:pr-2 mb-4 md:mb-0 md:float-left">
            <div className="px-2 md:px-0">
            {metadata?.metadata?.heading && <h1 className="py-1 mb-2.5  border-b border-[#eee] font-bold text-red">{metadata?.metadata?.heading}</h1>}

            {metadata?.metadata?.content_top && (
              <div
                className="text-sm mb-5 my-2 content_top"
                dangerouslySetInnerHTML={{
                  __html: metadata?.metadata?.content_top
                }}
              ></div>
            )}
            </div>
            <div className="px-2 md:px-0">{children}</div>

            {metadata?.metadata?.content_bottom && (
              <div
                className="text-sm my-2 content_bottom"
                dangerouslySetInnerHTML={{
                  __html: metadata?.metadata?.content_bottom
                }}
              ></div>
            )}

            {metadata?.metadata?.content_footer && (
              <div
                className="text-sm my-2 content_footer"
                dangerouslySetInnerHTML={{
                  __html: metadata?.metadata?.content_footer
                }}
              ></div>
            )}
          </div>
          <div className="w-[100%] md:w-[25%] xl:w-[30%] md:float-right">
            <Sidebar menu={menu} />
          </div>
          <div className="clear-both"></div>
        </div>
      </div>
      <Footer menu={menu} />
    </div>
  )
}

export default Default
