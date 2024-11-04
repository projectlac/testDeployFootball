import React, { memo } from 'react'

interface Props {
  bet: any[]
}

const BettingMatchWinner = ({ bet }: Props) => {
  const betting = bet.filter((b:any) => b.name === 'Match Winner')[0]
  if (!betting) {
    return (
      <div className="w-[35px] font-bold leading-5 px-2"></div>
    )
  }

  const values = JSON.parse(betting.values);

  return (
    <>
      {betting && (
        <div className="w-[35px] font-bold leading-5 px-2">
          <p>{values[0]?.odd}</p>
          <p>{values[1]?.odd}</p>
          <p>{values[2]?.odd}</p>
        </div>
      )}
    </>
  )
}

export default memo(BettingMatchWinner)
