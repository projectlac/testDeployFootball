// import React, { useEffect, useState } from 'react'
// import Default from '@/layouts/Default'
// import { Helmet } from 'react-helmet'
// import Tournament from '@/components/Tournament'
// import { getFixtures, getLiveFixtures, getMetaData } from '@/resources/api-constants'
// import { ILeagueMatches } from '@/types/app-type'
// import { getPrevDate, getPrevDateWithYear } from '@/utility/date'
// import { useAppDispatch } from '@/store/reducers/store'
// import { loadingAction } from '@/store/slice/loading.slice'
// import { useLocation, useParams } from 'react-router-dom'
// import { fetchMetaData } from '@/store/slice/metadata.slice'

// const LiveScore: React.FC = () => {
//   const [leagues, setLeagues] = useState<ILeagueMatches | null>(null)
//   const dispatch = useAppDispatch()
//   const { id } = useParams()
//   const location = useLocation()

//   const fetchMeta = async () => {
//     try {
//       const slug = id ?? ''

//       dispatch(fetchMetaData({ type: 'livescore', slug: slug, url: location.pathname }))
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   useEffect(() => {
//     fetchFixtures()
//     const intervalId = setInterval(() => {
//       fetchFixtures()
//     }, 300000)
//     return () => clearInterval(intervalId)
//   }, [])
//   useEffect(() => {
//     fetchMeta()
//   }, [])
//   const fetchFixtures = async () => {
//     dispatch(loadingAction.show())
//     try {
//       const result = await getLiveFixtures()
//       setLeagues(result.data)
//     } catch (error) {
//       console.log(error)
//     } finally {
//       dispatch(loadingAction.hide())
//     }
//   }
//   return (
//     <Default>
//       {leagues &&
//         Object.entries(leagues).map((item) => {
//           return <Tournament key={item[0]} country={item[1].country} league={item[1].league} name={item[0]} matches={item[1].items} />
//         })}
//     </Default>
//   )
// }

// export default LiveScore
