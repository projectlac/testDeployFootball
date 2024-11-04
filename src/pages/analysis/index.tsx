import Default from '@/layouts/Default'
import { getMenus, getMetaData } from '@/resources/api-constants'
import { IServerProps } from '@/types/app-type'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'

const Analysis = ({ metadata, menu }: IServerProps<null>) => {
  return (
    <>
      <Default menu={menu} metadata={metadata}>
        <div className="text-sm p-2.5 bg-[#f6fbff] my-2 *:mb-2">
          <p>
            Nhận định bóng đá hôm nay và ngày mai: Dự đoán kết quả tỷ số bóng đá các trận thi đấu tối và đêm nay. Phân tích tỷ lệ, soi kèo, nhận định, dự đoán
            đội hình dự kiến nhanh và chính xác nhất các giải bóng đá hàng đầu thế giới như: Ngoại Hạng Anh (NHA), La Liga (VĐQG Tây Ban Nha-TBN), Ligue 1 (VĐQG
            Pháp), Serie A (VĐQG Italia-Ý), Bundesliga (VĐQG Đức) và giải V-League của Việt Nam-VN.
          </p>
          <p>
            Nhận định bóng đá Anh, Đức, Pháp, Ý và TBN tối nay NHANH và SỚM nhất, dự đoán tỷ số và kết quả giải đấu World Cup WC Euro Copa America và CAN Cup
            chuẩn xác các trận đấu bóng đá 24h. Siêu máy tính nhận định dự đoán bóng đá ngày mai về kết quả và tỷ số CHÍNH XÁC nhất. Nhận định định bóng đá
            Ngoại Hạng Anh Cúp C1 tối-đêm nay và rạng sáng mai: dự đoán bóng đá chính xác hàng đầu trong nước và thế giới.
          </p>
          <p>
            Nhận định và dự đoán các giải bóng đá hàng đầu Thế Giới-Châu Á-Châu Âu-Nam Mỹ-Bắc Trung Mỹ (Concacaf)-Châu Phi và Châu Đại Dương. Nhận định bóng đá
            chính xác kết quả và tỷ số các giải Cúp C1-C2-C3 Châu Âu-Châu Á-Nam Mỹ và Châu Phi. Chuyên gia nhận định các trận đấu cấp ĐTQG (đội tuyển quốc gia)
            của U23 Việt Nam và ĐTQG Việt Nam (ĐT Việt Nam) ở các giải AFF Cúp-Asian Cup-SEA Games ở giải-cúp vô địch các quốc gia Đông Nam Á.
          </p>
        </div>
        <h1 className="text-primary font-bold mx-2.5 my-5">NHẬN ĐỊNH BÓNG ĐÁ HÔM NAY</h1>
        <div>
          <p className="text-sm font-bold px-2.5 py-1.5 bg-[#ddd]">
            <span className="uppercase">Nhận định bóng đá Châu Âu</span>
            <span className="px-2">&gt;</span>
            <span className="uppercase">U19 EURO</span>
          </p>
          <div>
            <div className="flex items-center gap-2 text-sm py-1.5 border-b border-[#eee] last-of-type:border-none">
              <span className="rounded-3xl text-red min-w-14 px-2 py-1 border border-[#eee] inline-block text-center">Live</span>
              <Link href={''}>Nhận định U19 Tây Ban Nha vs U19 Pháp, 1h00 ngày 23/7</Link>
              <span className="ml-auto text-white bg-red px-1.5 py-0.5 rounded-3xl">
                <Link href={''}>Cược</Link>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm py-1.5 border-b border-[#eee] last-of-type:border-none">
              <span className="rounded-3xl text-primary min-w-14 px-2 py-1 border border-[#eee] inline-block text-center">08:00</span>
              <Link href={''}>Nhận định U19 Tây Ban Nha vs U19 Pháp, 1h00 ngày 23/7</Link>
              <span className="ml-auto text-white bg-red px-1.5 py-0.5 rounded-3xl">
                <Link href={''}>Cược</Link>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm py-1.5">
              <span className="rounded-3xl text-red min-w-14 px-2 py-1 border border-[#eee] inline-block text-center">FT</span>
              <Link href={''}>Nhận định U19 Tây Ban Nha vs U19 Pháp, 1h00 ngày 23/7</Link>
              <span className="ml-auto text-white bg-red px-1.5 py-0.5 rounded-3xl">
                <Link href={''}>Cược</Link>
              </span>
            </div>
          </div>
        </div>
      </Default>
    </>
  )
}

export default Analysis

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''
  const metadata = await getMetaData({ type: 'analysis', slug: slugRaw, url: '/analysis' })
  const menu = await getMenus(context.locale ?? 'en')

  //pre-render data

  return { props: { data: null, metadata: metadata.data, menu } }
}
