import BlogPost from '@/components/BlogPost'
import { getAllPosts } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { IPostList, IStaticProps } from '@/types/app-type'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

interface IDataFootball {
  posts: IPostList[]
}

const News = ({ data }: IStaticProps<IDataFootball>) => {
  const [posts, setPosts] = useState<IPostList[] | null>(data.posts)
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()

  const fetchData = async (page: number) => {
    try {
      const result = await getAllPosts({ page })

      if (result.data.length < 15) {
        setIsLoadMore(false)
        return
      }
      if (posts) {
        setPosts([...posts, ...result.data])
      } else {
        setPosts(result.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }

  return (
    <div>
      {posts && (
        <InfiniteScroll
          style={{
            height: 'unset',
            overflow: 'unset'
          }}
          hasMore={isLoadMore}
          loader={<p>Loading...</p>}
          next={() => {
            setPage((prev) => prev + 1)
            fetchData(page + 1)
          }}
          dataLength={posts.length}
        >
          {posts.map((item, index) => {
            return (
              <div key={index}>
                <BlogPost post={item} />
              </div>
            )
          })}
        </InfiniteScroll>
      )}
    </div>
  )
}

export default News
