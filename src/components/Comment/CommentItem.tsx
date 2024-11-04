import image from '@/assets/images/user.png'
import { useAppSelector } from '@/store/reducers/store'
import { IComment } from '@/types/app-type'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface IReplyComment {
  id: number
  name: string
}
function CommentItem({ cmt, setReplyComment }: { cmt: IComment; setReplyComment: (data: IReplyComment | undefined) => void }) {
  const t = useTranslations('Comment')
  const user = useAppSelector((state) => state.user.user)

  return (
    <div className="border-b border-[#e5e5e5] mb-2">
      <div className=" p-2 text-sm relative mb-2 flex">
        <div className="w-[70px] h-[70px]">
          <Image src={image.src} width={70} height={70} alt={cmt.id?.toString()} />
        </div>
        <div className="px-5 w-[calc(100%-70px)]">
          <p className="mb-1">
            <b>{cmt.user.name}</b> - <span className=" text-sm">{dayjs(cmt.created_at).format('YYYY/MM/DD HH:mm:ss')}</span>
          </p>

          <div className="">
            <p>{cmt.content}</p>
            {user && (
              <p
                className="text-sm text-primary mt-2 cursor-pointer"
                onClick={() => {
                  setReplyComment({ id: cmt.id, name: cmt.user.name })
                }}
              >
                <FontAwesomeIcon icon={faComment} className="text-[#008000] mr-2" />
                {t('reply')}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        {cmt.replies.map((item, index) => (
          <div className=" p-2 text-sm relative mb-2 flex ml-20" key={index}>
            <div className="w-[70px] h-[70px]">
              <Image src={image.src} width={70} height={70} alt={item.id?.toString()} />
            </div>
            <div className="px-5 w-[calc(100%-70px)]">
              <p className="mb-1">
                <b>{item.user.name}</b> - <span className=" text-sm">{dayjs(item.created_at).format('YYYY/MM/DD HH:mm:ss')}</span>
              </p>

              <div className="">
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentItem
