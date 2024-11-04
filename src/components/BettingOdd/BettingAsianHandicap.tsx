import React, { memo } from 'react'

interface Props {
  bet: any[]
}

const BettingAsianHandicap = ({ bet }: Props) => {
  const betting = bet.filter((b:any) => b.name === 'Asian Handicap')[0]
  if (!betting) {
    return (
      <div className="w-[100px] font-bold leading-5 px-2"></div>
    )
  }

  const values = JSON.parse(betting.values);

  // Home odd
  const home = values[0].odd;

  // Away odd 
  const away = values[1].odd;

  // Get value
  const value = Number(values[0].value.replace('Home', '')) 

  return (
    <>
      {betting && (
        <div className="w-[100px] font-bold leading-5 px-2 border-l border-r border-[#eee]">
          <span className="w-1/2 inline-block text-left text-primary">{value >= 0 ? value : ''}</span>
          <span className="w-1/2 inline-block text-right">{home}</span>
          <span className="w-1/2 inline-block text-left text-primary">{value < 0 ? Math.abs(value) : ''}</span>
          <span className="w-1/2 inline-block text-right">{away}</span>
        </div>
      )}
    </>
  )
}

export default memo(BettingAsianHandicap)
