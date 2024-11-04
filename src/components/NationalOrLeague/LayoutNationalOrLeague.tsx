import { ILayoutNationalOrLeague } from '@/types/app-type'
import { isEmpty, isUndefined } from 'lodash'
import dynamic from 'next/dynamic'
import NoData from '../NoData/NoData'

const Default = dynamic(() => import('@/layouts/Default'))
const NationalOrTournament = dynamic(() => import('@/components/NationalOrLeague/NationalOrLeague'))

const LayoutNationalOrLeague = ({ data, metadata, menu, children }: ILayoutNationalOrLeague<any>) => {
  return (
    <div>
      {isUndefined(data) ? (
        <Default menu={menu} metadata={metadata}>
          <NationalOrTournament metadata={metadata}>{isEmpty(data) ? 'Loading...' : 'Loading...'}</NationalOrTournament>
        </Default>
      ) : (
        <>
          {isEmpty(data) ? (
            <Default menu={menu} metadata={metadata}>
              <NationalOrTournament metadata={metadata}>
                <NoData />
              </NationalOrTournament>
            </Default>
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </div>
  )
}

export default LayoutNationalOrLeague
