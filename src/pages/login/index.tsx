import { forgotPassword, getMenus, login, getMetaData } from '@/resources/api-constants'
import { ROUTES } from '@/resources/routes-constants'
import { useAppDispatch, useAppSelector } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { userAction } from '@/store/slice/user.slice'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import React from 'react'
import Default from '@/layouts/Default'
import { IAppMenu } from '@/types/app-type'
import { GetServerSidePropsContext } from 'next'
import { useTranslations } from 'next-intl'
import Cookies from 'js-cookie'
import api from '@/api/api_instance'
import { renderPrefixLang } from '@/utility/stringToSlug'
interface IFormInput {
  email: string
  password: string
}

const Login = ({ menu }: { menu: IAppMenu }) => {
  const t = useTranslations('AuthenPage')
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const user = useAppSelector((state) => state.user.user)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>()

  const onSubmit = async (data: IFormInput) => {
    dispatch(loadingAction.show())
    try {
      if (isLoginMode) {
        const result = await login(data.email, data.password)

        Cookies.set('token', result.access_token, { expires: 30 })
        api.defaults.headers.common['Authorization'] = `Bearer ${result.access_token}`

        setTimeout(() => {
          dispatch(userAction.setUser(result))
          toast.success('Login successful!')
          router.push(ROUTES.HOMEPAGE_ROUTE)
        }, 100)
      } else {
        await forgotPassword({ email: data.email })
        toast.success('Please check your email again!')
      }
    } catch (error) {
      isLoginMode ? toast.error('Incorrect email or password!') : toast.error('Error information')
    } finally {
      dispatch(loadingAction.hide())
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        router.push(ROUTES.HOMEPAGE_ROUTE)
      }, 100)
    }
  }, [router, user])

  return (
    <Default menu={menu}>
      <div className="py-2.5 pl-1 my-2.5 bg-[#f9f9f9] border border-[#eee]">
        <h1 className="text-sm font-bold text-red">{t('login')}</h1>
      </div>
      <div className="py-2.5 pl-4 pr-4 my-6 w-full max-w-md m-[auto] bg-[#f9f9f9] border border-[#eee]">
        <form onSubmit={handleSubmit(onSubmit)} className="py-2.5 pl-1 my-2.5  flex flex-col ">
          <label htmlFor="email">{t('email')} </label>
          <input
            {...register('email', {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t('invalidEmail')
              }
            })}
            type="text"
            id="email"
            className="mt-1 border border-[#ccc] p-2 rounded-lg focus-visible:outline-[#3c765f]"
            name="email"
            placeholder="email.example@gmail.com"
          />
          {errors.email && (
            <p className="text-sm text-red mb-4">
              {errors?.email?.type === 'required' && <span role="alert">{t('reqMes')}</span>}
              <span role="alert">{errors.email.message}</span>
            </p>
          )}

          {isLoginMode && (
            <>
              <label htmlFor="password">{t('password')} </label>
              <input
                {...register('password', { required: isLoginMode })}
                type="password"
                id="password"
                className="mt-1 border border-[#ccc] focus-visible:outline-[#3c765f] p-2 rounded-lg"
                name="password"
                placeholder={t('password')}
              />
              {errors.password && (
                <p className="text-sm text-red mb-4">
                  {errors?.password?.type === 'required' && <span role="alert">{t('reqMes')}</span>}
                  <span role="alert">{errors.password.message}</span>
                </p>
              )}
            </>
          )}
          {isLoginMode && (
            <p
              className="text-primary text-right cursor-pointer"
              onClick={() => {
                setIsLoginMode(false)
              }}
            >
              {t('forgot')}
            </p>
          )}
          <button
            type="submit"
            value="Submit"
            className="mt-6 uppercase bg-primary hover:bg-secondary text-white hover:text-primary font-bold text-[13px] border border-[#ccc] p-2 rounded-lg"
          >
            {isLoginMode ? t('signIn') : t('forgot')}
          </button>
          {!isLoginMode && (
            <button
              onClick={() => {
                setIsLoginMode(true)
              }}
              className="mt-6 uppercase bg-secondary hover:bg-primary text-white hover:text-secondary font-bold text-[13px] border border-[#ccc] p-2 rounded-lg"
            >
              {t('login')}
            </button>
          )}
        </form>
      </div>
    </Default>
  )
}

export default Login

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''
  api.defaults.headers.common['lang'] = context.locale
  const menu = await getMenus(context.locale ?? 'en')
  const metadata = await getMetaData({ type: 'login', slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}login` })
  //pre-render data

  return { props: { data: null, metadata: metadata.data, menu } }
}
