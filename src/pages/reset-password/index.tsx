import Default from '@/layouts/Default'
import { getMenus, resetPassword, getMetaData } from '@/resources/api-constants'
import { ROUTES } from '@/resources/routes-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { IAppMenu } from '@/types/app-type'
import { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslations } from 'use-intl'
import api from '@/api/api_instance'
import { renderPrefixLang } from '@/utility/stringToSlug'
interface IFormInput {
  email: string
  password: string
  rePassword: string
}

const ResetPassword = ({ menu }: { menu: IAppMenu }) => {
  const t = useTranslations('AuthenPage')
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<IFormInput>()

  const onSubmit = async (data: IFormInput) => {
    dispatch(loadingAction.show())
    try {
      const res = await resetPassword({
        email: data.email,
        password: data.password,
        password_confirmation: data.rePassword,
        token: searchParams.get('token') as string
      })

      toast.success(res.message)
      setTimeout(() => {
        router.push(ROUTES.LOGIN)
      })
    } catch (error) {
      const err = error as AxiosError
      const errorList = err?.response?.data as Record<string, string>
      for (const key in errorList) {
        toast.error(errorList[key])
      }
    } finally {
      dispatch(loadingAction.hide())
    }
  }

  return (
    <Default menu={menu}>
      <div className="py-2.5 pl-1 my-2.5 bg-[#f9f9f9] border border-[#eee]">
        <h1 className="text-sm font-bold text-red">{t('reset')}</h1>
      </div>
      <div className="py-2.5 pl-4 pr-4 my-6 w-full max-w-md m-[auto] bg-[#f9f9f9] border border-[#eee]">
        <form action="/#" className="py-2.5 pl-1 my-2.5">
          <div className="mb-4">
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
              className="block w-full mt-1 border border-[#ccc] p-2 rounded-lg focus-visible:outline-[#3c765f]"
              name="email"
              placeholder="email.example@gmail.com"
            />
            {errors.email && (
              <p className="text-red mb-4">
                {errors?.email?.type === 'required' && <span role="alert">{t('reqMes')}</span>}
                <span role="alert">{errors.email.message}</span>
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password">{t('password')} </label>
            <input
              {...register('password', {
                required: true
              })}
              type="password"
              id="password"
              className="block w-full mt-1 border border-[#ccc] focus-visible:outline-[#3c765f] p-2 rounded-lg"
              name="password"
              placeholder={t('password')}
            />
            {errors.password && (
              <p className="text-red mb-4">
                {errors?.password?.type === 'required' && <span role="alert">{t('reqMes')}</span>}
                <span role="alert">{errors.password.message}</span>
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="rePassword">{t('rePassword')} </label>
            <input
              {...register('rePassword', {
                required: true,
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return t('sameMsg')
                  }
                }
              })}
              type="password"
              id="rePassword"
              className="block w-full mt-1 border border-[#ccc] focus-visible:outline-[#3c765f] p-2 rounded-lg"
              name="rePassword"
              placeholder={t('rePasswordMsg')}
            />
            {errors.rePassword && (
              <p className="text-red mb-4">
                {errors?.rePassword?.type === 'required' && <span role="alert">{t('reqMes')}</span>}
                <span role="alert">{errors.rePassword.message}</span>
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            value="Submit"
            className="mt-6 uppercase bg-primary hover:bg-secondary text-white hover:text-primary font-bold text-[13px] border border-[#ccc] p-2 rounded-lg"
          >
            {t('reset')}
          </button>
        </form>
      </div>
    </Default>
  )
}

export default ResetPassword

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''
  api.defaults.headers.common['lang'] = context.locale
  const menu = await getMenus(context.locale ?? 'en')
  const metadata = await getMetaData({ type: 'reset-pasword', slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}reset-password` })
  //pre-render data

  return { props: { data: null, metadata: metadata.data, menu } }
}
