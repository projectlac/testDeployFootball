import Link from 'next/link'
import { memo } from 'react'
import React from 'react'
// interface TournamentProps {
//   name: string
//   matches: IMatch[]
// }

const Betting = () => {
  return (
    <div>
      <div className="pl-2.5 py-1.5 bg-[#edf2f7] flex items-center justify-between">
        <div>
          <Link className="text-primary hover:text-red text-sm font-bold" href="/">
            Kèo bóng đá Thế giới
          </Link>
          <Link className="text-primary hover:text-red text-sm font-bold" href="/">
            {' ⟩ '} Olympic Games
          </Link>
          <span className="ml-2 text-sm text-white bg-red px-1.5 py-0.5 rounded-3xl">
            <Link href={''}>Cược</Link>
          </span>
        </div>
        <div className="clear-both"></div>
      </div>
    </div>
  )
}

export default memo(Betting)
