import { IStaticProps, ITeamDetail } from '@/types/app-type'
import { stringToSlug } from '@/utility/stringToSlug'
import { InformationFilled } from '@carbon/icons-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface IDataFootball {
  teamDetail: ITeamDetail
}

const DetailPageClub = ({ data }: IStaticProps<IDataFootball>) => {
  const t = useTranslations('NationResult')
  if (!data.teamDetail) {
    return <></>
  }

  return (
    <div>
      <h2 className="flex items-center gap-1 font-bold text-primary">
        <InformationFilled className="text-red" />
        {data.teamDetail?.name}: {t('info')}
      </h2>
      {data.teamDetail && (
        <table className="text-sm w-full mt-4">
          <tbody>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('officialName')}</td>
              <td>
                <strong>{data.teamDetail.name}</strong>
              </td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('otherName')}</td>
              <td>{data.teamDetail.name}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('nickname')}</td>
              <td>{data.teamDetail.name}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('establishmentDate')}</td>
              <td>{data.teamDetail.created_at}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('nationalFootballTeam')}</td>
              <td>{data.teamDetail.country}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('league')}</td>
              <td>{data.teamDetail.country}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('season')}</td>
              <td>{data.teamDetail.season}</td>
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
                <Link
                  className="text-primary"
                  href={`/${data.teamDetail.coach.slug ?? stringToSlug(data.teamDetail.coach.name)}/${data.teamDetail.coach.api_id}/coach`}
                >
                  <b>{data.teamDetail.coach.name}</b>
                </Link>
              </td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('coachBirthdate')}</td>
              <td>{data.teamDetail.coach.date_of_birth}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('coachNationality')}</td>
              <td>{data.teamDetail.coach.country}</td>
            </tr>
            <tr className="*:border *:border-[#ccc] *:p-1">
              <td className="w-1/5 font-bold">{t('coachJoinDate')}</td>
              <td>{data.teamDetail.coach.created_at}</td>
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

export default DetailPageClub
