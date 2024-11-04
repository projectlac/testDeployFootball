import { getTeamDetail } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { ITeamDetail } from '@/types/app-type'
import { stringToSlug } from '@/utility/stringToSlug'
import { InformationFilled } from '@carbon/icons-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const DetailPage = () => {
  const t = useTranslations('NationResult')
  const params = useParams<{ slug: string }>()
  const dispatch = useAppDispatch()
  const [teamDetail, setTeamDetail] = useState<ITeamDetail | null>(null)
  const fetchData = async () => {
    if (!params?.slug) return
    dispatch(loadingAction.show())
    try {
      const result = await getTeamDetail({ team_slug: params?.slug })

      setTeamDetail(result)
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h2 className="flex items-center gap-1 font-bold text-primary">
        <InformationFilled className="text-red" />
        {teamDetail?.name}: {t('info')}
      </h2>
      {teamDetail && (
        <table className="text-sm w-full mt-4">
          <tbody>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('officialName')}</td>
              <td>
                <strong>{teamDetail.name}</strong>
              </td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('otherName')}</td>
              <td>{teamDetail.name}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('nickname')}</td>
              <td>{teamDetail.name}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('establishmentDate')}</td>
              <td>{teamDetail.created_at}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('nationalFootballTeam')}</td>
              <td>{teamDetail.country}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('league')}</td>
              <td>{teamDetail.country}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('season')}</td>
              <td>{teamDetail.season}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('address')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('address')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('stadium')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('stadiumCapacity')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('owner')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('president')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('footballDirector')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('currentCoach')}</td>
              <td>
                <Link className="text-primary" href={`/${teamDetail.coach.slug ?? stringToSlug(teamDetail.coach.name)}/${teamDetail.coach.api_id}/coach`}>
                  <b>{teamDetail.coach.name}</b>
                </Link>
              </td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('coachBirthdate')}</td>
              <td>{teamDetail.coach.date_of_birth}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('coachNationality')}</td>
              <td>{teamDetail.coach.country}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('coachJoinDate')}</td>
              <td>{teamDetail.coach.created_at}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('website')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('email')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('officialFacebook')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('officialTwitter')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('officialInstagram')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('officialYoutube')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('clubOrNationalTeam')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('ageGroup')}</td>
              <td></td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('gender')}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

export default DetailPage
