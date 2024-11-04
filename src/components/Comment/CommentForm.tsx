import { addComment } from '@/resources/api-constants'
import { useTranslations } from 'next-intl'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface IReplyComment {
  id: number
  name: string
}
interface IPropsComment {
  parentId: IReplyComment | undefined
  cancelComment?: () => void
  setReplyComment: (data: IReplyComment | undefined) => void
  fetchComment: () => void
  apiId: number
}
const CommentForm = React.forwardRef<HTMLTextAreaElement, IPropsComment>((props, refs) => {
  const t = useTranslations('Comment')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    if (props.parentId) {
      setValue(`@Reply-${props.parentId.name}: `)
    } else {
      setValue('')
    }
  }, [props.parentId])

  const handleAddComment = useCallback(async () => {
    try {
      if (!value) return
      setIsLoading(true)

      const res = await addComment({ api_id: props.apiId, content: value, parent_id: props.parentId?.id ?? undefined })
      if (res.message) {
        toast.success(res.message)
        props.fetchComment()
        setValue('')
        props.setReplyComment(undefined)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [props, value])

  return (
    <div className="border-b border-[#e5e5e5]">
      <div className="mb-6">
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-[#e5e5e5]">
          <label htmlFor="comment" className="sr-only">
            {t('yourComment')}
          </label>
          <textarea
            id="comment"
            rows={6}
            className="px-0 w-full text-sm text-gray border-0 focus:ring-0 focus:outline-none border-[#e5e5e5]"
            placeholder={t('write')}
            required
            ref={refs}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }}
          ></textarea>
        </div>
        <div>
          <button
            className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-[#5fb593]"
            onClick={handleAddComment}
          >
            {isLoading ? t('loading') : props.parentId ? t('reply') : t('post')}
          </button>
          {props.parentId && (
            <button
              onClick={() => {
                props.setReplyComment(props.parentId)
              }}
              className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-primary bg-white rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-[#f9f9f9] border border-[#e5e5e5] ml-2"
            >
              {t('cancel')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
})
CommentForm.displayName = 'CommentForm'
export default CommentForm
