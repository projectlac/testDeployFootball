import { IMetadataModel } from '@/types/app-type'
import { useTranslations } from 'next-intl'
import Head from 'next/head'

const OgTag = ({ data }: { data?: IMetadataModel }) => {
  const t = useTranslations('HomePage')
  return (
    <Head>
      <base href="/" />
      <title>{data?.metadata?.meta_title ?? t('default')}</title>
      <meta name="keywords" content={data?.metadata?.meta_keywords} />
      <meta name="description" content={data?.metadata?.meta_description} />
      <meta property="og:title" content={data?.metadata?.meta_title} />
      <meta property="og:description" content={data?.metadata?.meta_description} />
      <meta property="og:image" content={data?.metadata?.image} />
      <meta property="og:url" content={data?.metadata?.canonical} />
      <meta property="twitter:title" content={data?.metadata?.meta_title} />
      <meta property="twitter:description" content={data?.metadata?.meta_description} />
      <meta property="twitter:image" content={data?.metadata?.image} />
      <meta property="twitter:card" content={data?.metadata?.image} />
      <link rel="canonical" href={data?.metadata?.canonical} />
    </Head>
  )
}

export default OgTag
