import { IPlayerDetail, IStaticProps, IStatistics } from '@/types/app-type'
import _ from 'lodash'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import image from '@/assets/images/user.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
interface IDataFootball {
  playerInfo: IPlayerDetail
}

type IFormat = Omit<IStatistics, 'id' | 'created_at' | 'player_id' | 'league_id' | 'team_id' | 'updated_at' | 'season'>

const PlayerDetailComponent = ({ data }: IStaticProps<IDataFootball>) => {
  const t = useTranslations('PlayerDetail')

  const pathname = usePathname()
  return (
    <div>
      <h1 className="py-1 px-2.5 bg-[#f9f9f9] mb-2.5 border border-[#eee] font-bold text-primary">
        {pathname.includes('player') ? t('playerData') : t('coachData')}
      </h1>
      <div className="flex gap-2 items-end">
        <div className="border border-[#eee] w-[150px] p-2">
          <Image src={data.playerInfo?.photo ?? image.src} width={150} height={150} alt={data.playerInfo?.name}></Image>
        </div>
        <div>
          <p className="text-xl mb-1">
            {data.playerInfo?.first_name} <b>{data.playerInfo?.last_name}</b>
          </p>
          <div className="text-sm flex flex-wrap">
            <p className="w-[50%] ">
              {t('dOB')}:{' '}
              <b>
                {' '}
                {data.playerInfo?.date_of_birth ?? '-'} ({data.playerInfo?.age ?? '-'})
              </b>
            </p>
            <p className="w-[50%] ">
              {t('placeOfBirth')}: <b>{data.playerInfo?.place_of_birth ?? '-'}</b>
            </p>
            <p className="w-[50%] ">
              {t('nationality')}: <b>{data.playerInfo?.nationality ?? '-'}</b>
            </p>
            <p className="w-[50%] ">
              {t('country')}: <b>{data.playerInfo?.country ?? '-'}</b>
            </p>
            <p className="w-[50%] ">
              {t('height')}: <b>{data.playerInfo?.height ?? '-'}</b>
            </p>
            <p className="w-[50%] ">
              {t('weight')}: <b>{data.playerInfo?.weight ?? '-'}</b>
            </p>
          </div>
        </div>
      </div>
      {data.playerInfo?.team && (
        <div>
          <h1 className="py-1 px-2.5 bg-[#f9f9f9] mb-1 border border-[#eee] font-bold text-primary mt-1">{t('team')}</h1>
          <div className="border border-[#eee] flex p-2">
            <Image src={data.playerInfo?.team.logo} width={75} height={75} alt={data.playerInfo?.name} />
            <div className="ml-2 text-sm">
              <p className="mb-0.5">
                {t('name')}:{' '}
                <Link
                  href={data.playerInfo?.team?.national === 0 ? `/${data.playerInfo?.team?.slug}/club` : `/${data.playerInfo?.team?.slug}/national-team`}
                  className="text-primary"
                >
                  <b> {data.playerInfo?.team?.name}</b> (<b>{data.playerInfo?.team?.code}</b>){' '}
                </Link>
              </p>
              <p className="mb-0.5">
                {t('country')}: <b>{data.playerInfo?.team?.country}</b>{' '}
              </p>
              <p className="mb-0.5">
                {t('season')}: <b>{data.playerInfo?.team?.season}</b>{' '}
              </p>
            </div>
          </div>
        </div>
      )}

      {data.playerInfo?.career && (
        <div>
          <h1 className="py-1 px-2.5 bg-[#f9f9f9] mb-1 border border-[#eee] font-bold text-primary mt-1">{t('career')}</h1>
          <div className="border border-[#eee]">
            <div className="bg-[rgb(237,242,247)] flex text-sm p-2 h-[30px] items-center font-bold">
              <p className="text-left w-[20%]"> {t('start')}</p>
              <p className="w-[20%]"> {t('end')}</p>
              <p className="w-[60%]"> {t('team')}</p>
            </div>

            {data.playerInfo?.career.map((item, index) => (
              <div className="text-sm p-2 border-b border-[#eee] flex items-center" key={index}>
                <div className="flex w-[20%]">
                  <p>{item?.start ?? '-'}</p>
                </div>
                <div className=" w-[20%]">
                  <p>{item?.end ?? '-'}</p>
                </div>
                <div className=" w-[60%] flex">
                  <div>
                    <Image src={item?.team?.logo} alt={item?.team?.name} width={30} height={30} />
                  </div>
                  <div className="ml-2">
                    <b className="text-sm font-semibold text-primary">
                      {item.team.name ?? ''}
                      {/* <Link href={`/${item.team.slug}/club`}>{item.team.name ?? ''}</Link> */}
                    </b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.playerInfo?.statistics && (
        <div>
          <h1 className="py-1 px-2.5 bg-[#f9f9f9] mb-2.5 border border-[#eee] font-bold text-primary mt-1"> {t('statistic')}</h1>
          {data.playerInfo.statistics &&
            data.playerInfo.statistics.map((item, index) => {
              const formatData: IFormat = _.omit(item, ['id', 'created_at', 'player_id', 'league_id', 'team_id', 'updated_at', 'season'])

              return (
                <div key={index}>
                  <p className="text-sm ml-3 mb-2">
                    {t('season')}: <b> {item.season}</b>
                  </p>

                  <div className="flex flex-wrap gap-2 border-b-4 mb-2 border-[#eee]">
                    {Object.entries(formatData).map(([k, v], index1) => {
                      return (
                        <div key={index1} className="w-[calc((100%-8px)/2)] mb-2">
                          <p className="capitalize mb-1 bg-[#f9f9f9] border border-[#eee] font-bold text-primary py-1 px-2.5 ">
                            {t(`${k}.title`)}: {typeof v !== 'object' ? v : ''}
                          </p>
                          {Object.entries(v).map(function ([k1, v1], index2) {
                            return (
                              <div key={index2} className="ml-3">
                                <p className="text-sm">
                                  {t(`${k}.${k1}`)}: <b>{v1 ?? '-'}</b>
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default PlayerDetailComponent
