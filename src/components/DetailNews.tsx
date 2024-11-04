import facebook from '@/assets/images/f-icon.svg'
import lk from '@/assets/images/lk.svg'
import pin from '@/assets/images/pinterest-logo.svg'
import tw from '@/assets/images/twitter-icon.svg'
import image from '@/assets/images/user.png'
import { IMatchInfo, IPostList, IServerProps } from '@/types/app-type'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import dynamic from 'next/dynamic'
dayjs.extend(utc)
dayjs.extend(timezone)
interface IPostProps {
  post: IPostList
}

const NewsList = dynamic(() => import('@/components/Page/NewsList'))

const ImageComponent = ({ matchInfo }: { matchInfo: IMatchInfo | null }) => {
  return (
    <div className="w-full md:h-[400px] h-[300px] banner-predictions">
      <img src={matchInfo?.teams.home.logo} alt={matchInfo?.teams.home.name} className="md:w-[160px] w-[100px] md:h-[160px] h-[100px] md:ml-20 ml-5" />
      <img src={matchInfo?.teams.away.logo} alt={matchInfo?.teams.away.name} className="md:w-[160px] w-[100px] md:h-[160px] h-[100px] md:mr-20 mr-5" />
      <div className="time flex justify-center flex-col items-center">
        <img alt={matchInfo?.league.logo} src={matchInfo?.league.name} className="md:w-[100px] md:h-[100px] w-[75px] h-[75px] mb-5" />
        <div className="hour">{`${dayjs(matchInfo?.match_date).tz(matchInfo?.timezone).format('HH:mm')}`}</div>
        <div className="day">{`${dayjs(matchInfo?.match_date).tz(matchInfo?.timezone).format('M/D, dddd')}`}</div>
        <div className="teammate">
          <p>{matchInfo?.teams.home.name}</p>
          <p>{matchInfo?.teams.away.name}</p>
        </div>
      </div>
    </div>
  )
}

const DetailNews = ({ data }: IServerProps<IPostProps>) => {
  const t = useTranslations('NewsDetail')

  const dataNews = { posts: data?.post.related_posts }

  useEffect(() => {
    // Check if the element with id="custom-image" exists in the DOM

    if (typeof window !== 'undefined') {
      const customImageContainer = document.getElementById('catalog')
      if (customImageContainer && data.post.match_info) {
        // Append ImageComponent to existing content inside the div
        const tempDiv = document.createElement('div')
        const root = createRoot(tempDiv) // React 18's createRoot API
        root.render(<ImageComponent matchInfo={data.post.match_info ?? null} />)

        // Append the new element inside the customImageContainer, after existing content
        customImageContainer.appendChild(tempDiv)
      }
    }
  }, [data.post])

  return (
    <>
      <div className="">
        <h1 className="py-1 mb-2.5  border-b border-[#eee] font-bold text-red">{data?.post?.title}</h1>

        <div className="mb-2 text-sm text-[#a0a0a0]">
          <FontAwesomeIcon icon={faUser} className="text-[#a0a0a0] mr-3" />{' '}
          <b>
            <Link className="text-primary" href={`/author/${data?.post?.author?.slug ?? ''}`}>
              {data?.post?.author?.name}
            </Link>
          </b>{' '}
          -{' '}
          <Link className="text-primary" href={`/${data?.post?.categories[0]?.slug ?? ''}/news`}>
            {data?.post?.categories[0].name}
          </Link>{' '}
          -{dayjs(data?.post?.created_at).format('DD/MM/YYYY HH:mm')}
        </div>
        <h2 className="py-1 mb-2.5  font-bold ">{data?.post?.description}</h2>

        <div className="text-sm *:mb-2">
          <div className=" custom-page" dangerouslySetInnerHTML={{ __html: data?.post?.body }}></div>
        </div>
        <div className="tag">
          <ul className="text-sm flex mt-2 text-primary">
            <b>Tags</b>:
            {data?.post?.tags &&
              data?.post?.tags.map((item, index) => {
                return (
                  <li className="text-sm ml-1" key={index}>
                    <Link href={`/tag/${item.slug}`}>{item.tag_name}</Link>
                    {data?.post?.tags.length !== index + 1 ? ', ' : ''}
                  </li>
                )
              })}
          </ul>
        </div>
        <div className="author-box  border border-[#eee] mt-2 flex px-2">
          <div className="w-16 mt-2">
            <Image src={image.src} width={64} height={64} alt="author" />
          </div>
          <div className="info text-sm p-2 w-[calc(100%-4rem)] pl-3">
            Tác giả:{' '}
            <Link className="mb-1 text-primary font-medium" href={`/author/${data?.post?.author?.slug ?? ''}`}>
              {data?.post?.author?.name}
            </Link>
            <p className="mt-1 text-sm"> {data?.post?.author?.about}</p>
            <div className="flex gap-3 mt-3">
              {data.post.author.fb_url && (
                <a href={data.post.author.fb_url} target="___blank">
                  <Image src={facebook} width={20} height={20} alt="author" />
                </a>
              )}
              {data.post.author.x_url && (
                <a href={data.post.author.x_url} target="___blank">
                  <Image src={tw} width={20} height={20} alt="author" />
                </a>
              )}{' '}
              {data.post.author.pinterest_url && (
                <a href={data.post.author.pinterest_url} target="___blank">
                  <Image src={pin} width={20} height={20} alt="author" />
                </a>
              )}
              {data.post.author.linkedin_url && (
                <a href={data.post.author.linkedin_url} target="___blank">
                  <Image src={lk} width={20} height={20} alt="linkdin" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-primary font-bold mx-2.5 my-5">{t('sameCategory')}</h1>
      <div className="mx-2.5">
        <NewsList data={dataNews}></NewsList>
      </div>
    </>
  )
}

export default DetailNews
