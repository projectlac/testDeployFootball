import React, { memo } from 'react'

interface Props {
  bet: any[]
}

const BettingOverUnder = ({ bet }: Props) => {
  const betting = bet.filter((b:any) => b.name === 'Goals Over/Under')[0]
  if (!betting) {
    return (
        <div className="w-[100px] font-bold leading-5 px-2"></div>
    )
  }

  const values = JSON.parse(betting.values);

  // Over odd
  const over = values[0].odd;

  // Under odd 
  const under = values[1].odd;

  // Get value
  const value = Number(values[0].value.replace('Over', '')) 

  return (
    <>
      {betting && (
        <div className="w-[100px] font-bold leading-5 px-2 border-r border-[#eee]">
          <span className="w-1/2 inline-block text-left text-primary">{value}</span>
          <span className="w-1/2 inline-block text-right">{over}</span>
          <span className="w-1/2 inline-block text-left">u</span>
          <span className="w-1/2 inline-block text-right">{under}</span>
        </div>
      )}
    </>
  )
}

export default memo(BettingOverUnder)
