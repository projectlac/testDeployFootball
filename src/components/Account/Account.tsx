import image from '@/assets/images/user.png'
import { updateProfile } from '@/resources/api-constants'
import { useAppDispatch, useAppSelector } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { userAction } from '@/store/slice/user.slice'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface IFormInput {
  name: string
  password: string
  confirmPassword: string
}

const AccountDetail = () => {
  const [isUpdateMode, setUpdateMode] = useState<boolean>(false)
  const t = useTranslations('UserDetail')
  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<IFormInput>()

  const onSubmit = async (data: IFormInput) => {
    dispatch(loadingAction.show())
    try {
      const result = await updateProfile({ name: data.name, password: data.password, password_confirmation: data.confirmPassword })
      if (result) {
        dispatch(userAction.setUser({ email: result.email, name: result.name }))
        setUpdateMode(false)
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }

  return (
    <div className="mt-2">
      <h1 className="py-1 px-2.5 bg-[#f9f9f9] mb-2.5 border border-[#eee] font-bold text-primary">{t('userProfile')}</h1>
      <div className="flex items-end relative mt-5 bg-[#9594b7] h-[170px]">
        <div className="border border-[#eee] w-[150px] p-1 ml-10 relative z-10 bg-white bottom-1">
          <div className="border border-[#eee] p-1">
            <Image src={image.src} width={150} height={150} alt={'profile image'}></Image>
          </div>
        </div>
        <div className="h-[70px] bg-[#efefef] w-full flex items-center absolute bottom-0 left-0 z-1">
          <p className="text-xl mb-1 pl-[210px]">
            {t('name')}: <b>{user?.name}</b>
          </p>
          <div
            className="bg-[#dfdfdf] hover:bg-[#c9c9c9] h-[20px] w-[20px] flex items-center justify-center ml-2 rounded cursor-pointer"
            onClick={() => {
              setUpdateMode((prev) => !prev)
              setValue('name', user?.name ?? '')
            }}
          >
            <FontAwesomeIcon icon={faRotate} className="text-[#9594b7]" size="sm" />
          </div>
        </div>
      </div>
      {isUpdateMode && (
        <div className="py-2.5 pl-4 pr-4 my-6 w-full max-w-md m-[auto] bg-[#f9f9f9] border border-[#eee]">
          <form onSubmit={handleSubmit(onSubmit)} className="py-2.5 pl-1 my-2.5  flex flex-col ">
            <label htmlFor="name">{t('name')}: </label>
            <input
              {...register('name', {
                required: true
              })}
              type="text"
              id="name"
              className="mt-1 border border-[#ccc] p-2 rounded-lg focus-visible:outline-[#3c765f]"
              name="name"
            />
            {errors.name && (
              <p className="text-sm text-red mb-4">
                {errors?.name?.type === 'required' && <span role="alert">{t('reqPass')}</span>}
                <span role="alert">{errors.name.message}</span>
              </p>
            )}

            <label htmlFor="password">{t('password')}: </label>
            <input
              {...register('password', { required: false })}
              type="password"
              id="password"
              className="mt-1 border border-[#ccc] focus-visible:outline-[#3c765f] p-2 rounded-lg"
              name="password"
              placeholder={`${t('password')} (${t('optional')})`}
            />
            {errors.password && (
              <p className="text-sm text-red mb-4">
                {errors?.password?.type === 'required' && <span role="alert">{t('reqPass')}</span>}
                <span role="alert">{errors.password.message}</span>
              </p>
            )}

            <div className="mb-4">
              <label htmlFor="confirmPassword">{t('confirmPassword')}:</label>
              <input
                {...register('confirmPassword', {
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return 'Password does not match'
                    }
                  }
                })}
                type="password"
                id="confirmPassword"
                className="block w-full mt-1 border border-[#ccc] focus-visible:outline-[#3c765f] p-2 rounded-lg"
                name="confirmPassword"
                placeholder={`${t('confirmPassword')} (${t('optional')})`}
              />
              {errors.confirmPassword && (
                <p className="text-red mb-4">
                  {errors?.confirmPassword?.type === 'required' && <span role="alert">{t('reqPass')}</span>}
                  <span role="alert">{errors.confirmPassword.message}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              value="Submit"
              className="mt-6 uppercase bg-primary hover:bg-secondary text-white hover:text-primary font-bold text-[13px] border border-[#ccc] p-2 rounded-lg"
            >
              {t('update')}
            </button>
            <button
              onClick={() => {
                setUpdateMode(false)
              }}
              className="mt-6 uppercase bg-secondary hover:bg-primary text-white hover:text-secondary font-bold text-[13px] border border-[#ccc] p-2 rounded-lg"
            >
              {t('cancel')}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default AccountDetail
