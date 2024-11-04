import { IBettingOdd } from '@/types/app-type'
import React, { memo } from 'react'

interface Props {
  bettingOdd: IBettingOdd
}

const BettingOddTable = ({ bettingOdd }: Props) => {
  const asianHandicap = bettingOdd?.details.filter((b: any) => b.name === 'Asian Handicap')[0]?.values
  const overUnder = bettingOdd?.details.filter((b: any) => b.name === 'Goals Over/Under')[0]?.values
  const matchWinner = bettingOdd?.details.filter((b: any) => b.name === 'Match Winner')[0]?.values
  return (
    <>
      {bettingOdd && bettingOdd?.details && (
        <div className="w-full md:w-[60%] m-auto mt-5 text-sm">
          <div className="grid grid-flow-col text-center font-bold grid-cols-4 *:bg-[#626262] *:text-white *:p-3">
            <div></div>
            <div>Cược chấp</div>
            <div>BT trên/dưới</div>
            <div>1x2</div>
          </div>
          <div className="grid grid-flow-col text-center border-t border-r border-[#b3b3b3] grid-cols-4 *:p-3">
            <div className="bg-[#626262] text-white font-bold">Cả trận</div>
            {asianHandicap && (
              <div className="border-r border-[#b3b3b3]">
                <p className="w-1/2 inline-block text-[#F18A10]">{`+${Number(JSON.parse(asianHandicap)[0].value.replace('Home', ''))}`}</p>
                <p className="w-1/2 inline-block text-[#F18A10]">{`-${Number(JSON.parse(asianHandicap)[0].value.replace('Home', ''))}`}</p>
                <p className="w-1/2 inline-block text-sm md:text-md md:font-bold">{JSON.parse(asianHandicap)[0].odd}</p>
                <p className="w-1/2 inline-block text-sm md:text-md md:font-bold">{JSON.parse(asianHandicap)[1].odd}</p>
              </div>
            )}
            {overUnder && (
              <div className="border-r border-[#b3b3b3]">
                <p className="w-1/2 inline-block">
                  O<span className="text-[#F18A10] ml-[3px]">{`${Number(JSON.parse(overUnder)[0].value.replace('Over', ''))}`}</span>
                </p>
                <p className="w-1/2 inline-block">
                  U<span className="text-[#F18A10] ml-[3px]">{`${Number(JSON.parse(overUnder)[0].value.replace('Over', ''))}`}</span>
                </p>
                <p className="w-1/2 inline-block text-sm md:text-md md:font-bold">{JSON.parse(overUnder)[0].odd}</p>
                <p className="w-1/2 inline-block text-sm md:text-md md:font-bold">{JSON.parse(overUnder)[1].odd}</p>
              </div>
            )}
            {matchWinner && (
              <div className="border-r border-[#b3b3b3]">
                <p className="w-1/3 inline-block">1</p>
                <p className="w-1/3 inline-block">X</p>
                <p className="w-1/3 inline-block">2</p>
                <p className="w-1/3 inline-block text-sm md:text-md md:font-bold">{JSON.parse(matchWinner)[0].odd}</p>
                <p className="w-1/3 inline-block text-sm md:text-md md:font-bold">{JSON.parse(matchWinner)[1].odd}</p>
                <p className="w-1/3 inline-block text-sm md:text-md md:font-bold">{JSON.parse(matchWinner)[2].odd}</p>
              </div>
            )}
          </div>
          <div className="grid grid-flow-col text-center border-t border-r border-[#b3b3b3] grid-cols-4 *:p-3">
            <div className="bg-[#626262] text-white font-bold">Hiệp 1</div>
            {asianHandicap && (
              <div className="border-r border-[#b3b3b3]">
                <p className="w-1/2 inline-block text-[#F18A10]">{`+${Number(JSON.parse(asianHandicap)[0].value.replace('Home', ''))}`}</p>
                <p className="w-1/2 inline-block text-[#F18A10]">{`-${Number(JSON.parse(asianHandicap)[0].value.replace('Home', ''))}`}</p>
                <p className="w-1/2 inline-block text-sm md:text-md md:font-bold">{JSON.parse(asianHandicap)[0].odd}</p>
                <p className="w-1/2 inline-block text-sm md:text-md md:font-bold">{JSON.parse(asianHandicap)[1].odd}</p>
              </div>
            )}
            {overUnder && (
              <div className="border-r border-[#b3b3b3]">
                <p className="w-1/2 inline-block">
                  O<span className="text-[#F18A10] ml-[3px]">{`${Number(JSON.parse(overUnder)[0].value.replace('Over', ''))}`}</span>
                </p>
                <p className="w-1/2 inline-block">
                  U<span className="text-[#F18A10] ml-[3px]">{`${Number(JSON.parse(overUnder)[0].value.replace('Over', ''))}`}</span>
                </p>
                <p className="w-1/2 inline-block text-sm md:text-md md:font-bold">{JSON.parse(overUnder)[0].odd}</p>
                <p className="w-1/2 inline-block text-sm md:text-md md:font-bold">{JSON.parse(overUnder)[1].odd}</p>
              </div>
            )}
            {matchWinner && (
              <div className="border-r border-[#b3b3b3]">
                <p className="w-1/3 inline-block">1</p>
                <p className="w-1/3 inline-block">X</p>
                <p className="w-1/3 inline-block">2</p>
                <p className="w-1/3 inline-block text-sm md:text-md md:font-bold">{JSON.parse(matchWinner)[0].odd}</p>
                <p className="w-1/3 inline-block text-sm md:text-md md:font-bold">{JSON.parse(matchWinner)[1].odd}</p>
                <p className="w-1/3 inline-block text-sm md:text-md md:font-bold">{JSON.parse(matchWinner)[2].odd}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default memo(BettingOddTable)
