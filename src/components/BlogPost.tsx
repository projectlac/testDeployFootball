import { IPostList } from '@/types/app-type'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React, { FC } from 'react'

interface BlogPostProps {
  post: IPostList
}

const BlogPost: FC<BlogPostProps> = ({ post }) => {
  const t = useTranslations('BlogPost')
  return (
    <div className="pb-5 mb-5 border-b border-[#eee] flex gap-4">
      <img src="https://static.demo.kqbd.ai/nhan-dinh-leeds-united-vs-southampton-21h00-ngay-26-5_1716687132.jpg" alt={post.title} />
      <div>
        <Link className="text-primary hover:text-red font-bold" href={`/${post.slug}-a${post.id}`}>
          {post.title}
        </Link>
        <p className="text-sm mb-2.5">
          <Link href={`/author/${post.author.slug}`}>{post.author.name}</Link> - {new Date(post.created_at).toLocaleDateString()}{' '}
          {new Date(post.created_at).toLocaleTimeString()}
        </p>
        <p className="text-sm">{post.description}</p>

        <div className="categories">
          <ul className="text-sm flex mt-2 text-primary">
            <b>{t('category')}</b>:
            {post.categories &&
              post.categories.map((item, index) => {
                return (
                  <li className="text-sm ml-1" key={index}>
                    <Link href={`/${item.slug}/news`}>{item.name}</Link>
                    {post.categories.length !== index + 1 ? ', ' : ''}
                  </li>
                )
              })}
          </ul>
        </div>

        <div className="tag">
          <ul className="text-sm flex mt-2 text-primary">
            <b>{t('tag')}</b>:
            {post.tags &&
              post.tags.map((item, index) => {
                return (
                  <li className="text-sm ml-1" key={index}>
                    <Link href={`/tag/${item.slug}`}>{item.tag_name}</Link>
                    {post.tags.length !== index + 1 ? ', ' : ''}
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BlogPost
