import AdsHeader from '@/assets/images/ads-logo.gif'
import en from '@/assets/images/en.png'
import vi from '@/assets/images/vi.png'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getProfile } from '@/resources/api-constants'
import { ROUTES } from '@/resources/routes-constants'
import { useAppDispatch, useAppSelector } from '@/store/reducers/store'
import { userAction } from '@/store/slice/user.slice'
import { IAppMenu, IMetadataModel } from '@/types/app-type'
import { Search, User } from '@carbon/icons-react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Logo from '../../assets/images/logo.png'
import LogoMobile from '../../assets/images/logo-mobile.png'

import Cookies from 'js-cookie'

const Header = ({ menu, metadata }: { menu: IAppMenu; metadata?: IMetadataModel }) => {
  const t = useTranslations('AuthenPage')
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const router = useRouter()
  const lang = useLocale()

  const pathname = usePathname()

  const handleSignOut = useCallback(async () => {
    try {
      dispatch(userAction.clearUser(null))
      Cookies.remove('token')
      toast.success('Logout successful!')

      setTimeout(() => {
        router.push('/')
      })
    } catch (error) {
      toast.error('An error occurred.!')
    }
  }, [dispatch, router])

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  const fetchProfile = useCallback(
    async (token: string) => {
      try {
        const res = await getProfile(token)
        dispatch(userAction.setUser({ email: res.email, name: res.name, access_token: token }))
      } catch (error) {
        dispatch(userAction.clearUser(null))
        Cookies.remove('token')
      }
    },
    [dispatch]
  )

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      dispatch(userAction.setUser({ access_token: token }))
      setTimeout(() => {
        fetchProfile(token)
      })
    }
  }, [dispatch, fetchProfile])

  return (
    <div>
      <div className="w-full bg-[#efefef]">
        <div className="container mx-auto flex items-center justify-between">
          <div className="w-[calc(100%-75px)]">
            <ul className="py-2.5 text-nowrap whitespace-nowrap overflow-x-auto flex">
              {menu?.topbar?.items?.map((item, index) => {
                return (
                  <li key={index} className="px-2.5 py-1.5 text-sm font-bold">
                    <Link className="text-primary hover:text-red" href={`${item.url}`}>
                      {item.name}
                    </Link>
                  </li>
                )
              })}
              <div className="clear-both"></div>
            </ul>
          </div>
          <div className="pl-2 w-[75px]">
            <div className="flex items-center ">
              <a href={pathname ?? '/'} className="mr-2" lang="en">
                <Image src={en.src} alt="en" width={25} height={20} priority />
              </a>
              <a href={`/vi${pathname ?? '/'}`} lang="vi">
                <Image src={vi.src} alt="vi" width={25} height={20} priority />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto container">
        <div className="my-2.5 flex justify-between items-center">
          <Link className="inline" href={ROUTES.HOMEPAGE_ROUTE}>
            <Image className="block w-[206px]" src={Logo.src} alt="Logo" width={206} height={50} />
          </Link>
          <img src={AdsHeader.src} alt="" />
        </div>
      </div>
      <div className="w-full bg-primary border-b-1.5 border-secondary border-b-[3px]">
        <div className="container mx-auto flex items-center justify-between">
          <nav className="flex flex-wrap items-center justify-between md:w-[calc(100%-60px)] w-[96px]">
            <div className="ml-2 flex items-center justify-start w-full">
              <svg
                onClick={toggleMenu}
                xmlns="http://www.w3.org/2000/svg"
                id="menu-button"
                className="h-[44px] w-6 cursor-pointer md:hidden block text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <div className={`w-full flex md:items-center  ${isMenuVisible ? '' : 'hidden'} md:flex hidden `} id="menu">
              <ul className="text-nowrap whitespace-nowrap overflow-x-auto flex flex-col md:flex-row">
                {menu?.main?.items?.map((item, index) => {
                  return (
                    <li key={index} className="md:border-r md:border-secondary last:border-none">
                      <Link
                        className="p-3 uppercase bg-primary hover:bg-secondary text-white hover:text-primary float-left font-bold text-[13px] inline-block"
                        href={`${item.url}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>
          <Link className="inline md:w-0" href={ROUTES.HOMEPAGE_ROUTE}>
            <img className="block md:w-[175px] w-[100px]" src={LogoMobile.src} alt="Logo" />
          </Link>
          <div className="flex items-center gap-2 -z-[0] ">
            <a className="p-3.5 text-white block ring-1 ring-inset ring-gray-300" href={`/${lang}/search#gsc.tab=0&gsc.q=betiball&gsc.page=1`}>
              <Search />
            </a>
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="p-3.5 text-white inline-flex w-full justify-center gap-x-1.5 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-gray-50">
                <User />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  {user ? (
                    <>
                      <MenuItem>
                        <button
                          onClick={() => {
                            router.push('/account-settings')
                          }}
                          className="text-left block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          {t('accountSettings')}
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={handleSignOut}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          {t('signOut')}
                        </button>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem>
                        <button
                          onClick={() => router.push(ROUTES.LOGIN)}
                          className="text-left block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          {t('signIn')}
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={() => router.push(ROUTES.REGISTER)}
                          className="text-left block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          {t('register')}
                        </button>
                      </MenuItem>
                    </>
                  )}
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      <div className={`w-full flex md:items-center  ${isMenuVisible ? '' : 'hidden'}  absolute z-50 md:hidden`} id="menu">
        <ul className=" w-full text-nowrap whitespace-nowrap bg-primary overflow-x-auto flex flex-col md:flex-row">
          {menu?.main?.items?.map((item, index) => {
            return (
              <li key={index} className="md:border-r md:border-secondary bg-primary last:border-none w-full content">
                <Link
                  className="p-3 uppercase bg-primary hover:bg-secondary text-white hover:text-primary float-left font-bold text-[13px] w-full"
                  href={`${item.url}`}
                >
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="container mx-auto">
        <div className="flex items-center text-nowrap whitespace-nowrap overflow-x-auto">
          <span className="text-red font-bold text-sm">HOT:</span>
          <ul className="py-1.5">
            {menu?.hot?.items?.map((item, index) => {
              return (
                <li key={index} className="inline-block px-1.5 text-sm border-r border-[#d6d6d6]">
                  <Link className="text-primary hover:text-red" href={`${item.url}`}>
                    {item.name}
                  </Link>
                </li>
              )
            })}
            <div className="clear-both"></div>
          </ul>
        </div>
      </div>
      <div className="container mx-auto">{metadata?.breadcrumbs && <Breadcrumbs data={metadata.breadcrumbs} />}</div>
    </div>
  )
}

export default Header
