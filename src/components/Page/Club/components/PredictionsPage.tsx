import Tournament from '@/components/Tournament'
import { getFixturePredictions } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { ILeagueMatches } from '@/types/app-type'
import { getPrevDateWithYear } from '@/utility/date'
import { useParams } from 'next/navigation'
import { memo, useCallback, useEffect, useState } from 'react'

const PredictionsPage = () => {
  const dispatch = useAppDispatch()
  const [leagues, setLeagues] = useState<ILeagueMatches | null>(null)

  const params = useParams<{ slug: string }>()

  const fetchData = useCallback(async () => {
    dispatch(loadingAction.show())
    try {
      const slug = params?.slug?.replace('-football', '')
      const type = 'team'
      const result = await getFixturePredictions({ date: getPrevDateWithYear(0), slug, type })

      setLeagues(result)
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }, [dispatch, params?.slug])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="mt-2">
      {leagues &&
        Object.entries(leagues).map((item, index) => {
          return <Tournament key={index} league={item[1].league} country={item[1].country} name={item[0]} matches={item[1].items} isShowPrediction={true} />
        })}
    </div>
  )
}

export default memo(PredictionsPage)
