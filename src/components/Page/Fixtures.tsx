// import React, { useEffect, useState } from 'react'
// import InfiniteScroll from 'react-infinite-scroll-component'
// import Default from '@/layouts/Default'
// import { Helmet } from 'react-helmet'
// import Tournament from '@/components/Tournament'
// import { getFixtures, getMetaData } from '@/resources/api-constants'
// import { ILeagueMatches, PaginationResponse } from '@/types/app-type'
// import { getNextDate, getNextDateWithYear, getPrevDateWithYear } from '@/utility/date'
// import { useAppDispatch } from '@/store/reducers/store'
// import { loadingAction } from '@/store/slice/loading.slice'
// import { usePrevious } from '@/hooks/usePrevious'
// import { useLocation, useParams } from 'react-router-dom'
// import { fetchMetaData } from '@/store/slice/metadata.slice'

// const Fixtures: React.FC = () => {
//   const [isLoadMore, setIsLoadMore] = useState(true)
//   const [page, setPage] = useState(1)
//   const [leagues, setLeagues] = useState<ILeagueMatches | null>(null)
//   const numbers = Array.from({ length: 9 }, (_, i) => i)
//   const [day, setDay] = useState(0)
//   const dispatch = useAppDispatch()
//   const prevDay = usePrevious(day)
//   const { id } = useParams()
//   const location = useLocation()

//   const fetchMeta = async () => {
//     try {
//       const slug = id ?? ''
//       dispatch(fetchMetaData({ type: 'homepage', slug: slug, url: location.pathname }))
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   useEffect(() => {
//     fetchMeta()
//     fetchData(1)
//   }, [day])
//   const fetchData = async (page: number) => {
//     dispatch(loadingAction.show())
//     try {
//       const formattedDate = getNextDateWithYear(day)

//       const result = await getFixtures({ date: formattedDate, page: prevDay !== day ? 1 : page })
//       if (Object.entries(result.data).length < 15) {
//         setIsLoadMore(false)
//       }
//       if (prevDay !== day) {
//         setPage(1)
//         setLeagues(result.data)
//       } else {
//         setLeagues({...leagues, ...result.data })
//       }
//     } catch (error) {
//       console.log(error)
//     } finally {
//       dispatch(loadingAction.hide())
//     }
//   }
//   return (
//     <Default>
//       <div className="flex items-center text-nowrap whitespace-nowrap overflow-x-auto pb-2.5">
//         {numbers.map((number) => {
//           return (
//             <span key={number}>
//               {day === number ? (
//                 <span className="px-3 py-1 bg-secondary rounded text-primary  hover:cursor-pointer text-sm mr-2">{getNextDate(number)}</span>
//               ) : (
//                 <span
//                   className="px-3 py-1 bg-[#dce0e4] rounded text-primary hover:text-primary hover:bg-secondary hover:cursor-pointer text-sm mr-2"
//                   onClick={() => setDay(number)}
//                 >
//                   {getNextDate(number)}
//                 </span>
//               )}
//             </span>
//           )
//         })}
//       </div>

//       {leagues && (
//         <InfiniteScroll
//           style={{
//             height: 'unset',
//             overflow: 'unset'
//           }}
//           hasMore={isLoadMore}
//           loader={<p>Loading...</p>}
//           next={() => {
//             setPage((prev) => prev + 1)
//             fetchData(page + 1)
//           }}
//           dataLength={Object.entries(leagues).length}
//         >
//           {Object.entries(leagues).map((item, index) => {
//             return <Tournament key={index} league={item[1].league} country={item[1].country} name={item[0]} matches={item[1].items} />
//           })}
//         </InfiniteScroll>
//       )}
//     </Default>
//   )
// }

// export default Fixtures
