import { saveNewsletterEmail } from '@/resources/api-constants'
import { IAppMenu } from '@/types/app-type'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Logo from '../../assets/images/logo.png'
import Image from 'next/image'
interface IFormInput {
  email: string
}

const Footer = ({ menu }: { menu: IAppMenu }) => {
  const [email, setEmail] = useState('')
  const t = useTranslations('Footer')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>()

  // const handleSubmit = async () => {
  //   toast.promise(saveNewsletterEmail(email), {
  //     loading: 'Xin chờ',
  //     success: 'Đăng ký nhận thông tin thành công',
  //     error: 'Đăng ký nhận thông tin không thành công'
  //   })
  // }

  const onSubmit: SubmitHandler<IFormInput> = () => {
    toast.promise(saveNewsletterEmail(email), {
      loading: 'Xin chờ',
      success: 'Đăng ký nhận thông tin thành công',
      error: 'Đăng ký nhận thông tin không thành công'
    })
  }

  return (
    <footer className="w-full bg-[#ebf1ff] border-t-[5px] border-[#014c6b] border-">
      <div className="container mx-auto text-sm bg-white p-4 my-3">
        <p className="text-center mb-4">{t('title')}</p>
        <div className="flex justify-center">
          <input
            {...register('email', {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t('invalid')
              }
            })}
            className="border-2 border-primary rounded-tl-[32px] rounded-bl-[32px] p-4 w-[400px]"
            placeholder={t('placeHolder')}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="p-4 rounded-tr-[32px] rounded-br-[32px] bg-primary border-2 border-primary text-white"
          >
            {t('submit')}
          </button>
        </div>
        <p className="text-red text-center my-2">{errors.email && <span role="alert">{errors.email.message}</span>}</p>
      </div>

      <div className="container mx-auto text-sm bg-white p-4">
        <div className="mx-auto text-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 flex-wrap">
          {menu && menu['quick-link-1'] && (
            <div className="col-2">
              <p className="font-bold uppercase text-lg underline-offset-[6px] underline decoration-2 decoration-[#0080c7]">{menu['quick-link-1'].name}</p>
              <ul className="list-disc pl-4 mt-2.5">
                {menu['quick-link-1']?.items?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link className="text-primary hover:text-red py-1.5 inline-block" href={item.url}>
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {menu && menu['quick-link-2'] && (
            <div className="col-2">
              <p className="font-bold uppercase text-lg underline-offset-[6px] underline decoration-2 decoration-[#0080c7]">{menu['quick-link-2'].name}</p>
              <ul className="list-disc pl-4 mt-2.5">
                {menu['quick-link-2']?.items?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link className="text-primary hover:text-red py-1.5 inline-block" href={item.url}>
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {menu && menu['quick-link-3'] && (
            <div className="col-2">
              <p className="font-bold uppercase text-lg underline-offset-[6px] underline decoration-2 decoration-[#0080c7]">{menu['quick-link-3'].name}</p>
              <ul className="list-disc pl-4 mt-2.5">
                {menu['quick-link-3']?.items?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link className="text-primary hover:text-red py-1.5 inline-block" href={item.url}>
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {menu && menu['quick-link-4'] && (
            <div className="col-2">
              <p className="font-bold uppercase text-lg underline-offset-[6px] underline decoration-2 decoration-[#0080c7]">{menu['quick-link-4'].name}</p>
              <ul className="list-disc pl-4 mt-2.5">
                {menu['quick-link-4']?.items?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link className="text-primary hover:text-red py-1.5 inline-block" href={item.url}>
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {menu && menu['quick-link-5'] && (
            <div className="col-2">
              <p className="font-bold uppercase text-lg underline-offset-[6px] underline decoration-2 decoration-[#0080c7]">{menu['quick-link-5'].name}</p>
              <ul className="list-disc pl-4 mt-2.5">
                {menu['quick-link-5']?.items?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link className="text-primary hover:text-red py-1.5 inline-block" href={item.url}>
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {menu && menu['quick-link-6'] && (
            <div className="col-2">
              <p className="font-bold uppercase text-lg underline-offset-[6px] underline decoration-2 decoration-[#0080c7]">{menu['quick-link-6'].name}</p>
              <ul className="list-disc pl-4 mt-2.5">
                {menu['quick-link-6']?.items?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link className="text-primary hover:text-red py-1.5 inline-block" href={item.url}>
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="container py-4 mx-auto">
        <div className="block lg:flex items-center ju">
          <Link href={'/'}>
            <Image src={Logo.src} width={206} height={50} alt="Logo" className="mx-auto" />
          </Link>
          <div className="text-sm mx-auto lg:mx-0 flex flex-col items-start pl-3">
            <ul className="flex gap-x-2.5 justify-center flex-wrap">
              {menu &&
                menu.footer?.items?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link className="text-primary hover:text-red py-1.5 inline-block" href={item.url}>
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
            </ul>
            <p className="text-center lg:text-left">Copyright © 2018 - 2024. All rights reserved. You must be 18 years old or over to use this site. | ®</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
