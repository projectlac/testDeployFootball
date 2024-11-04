import { memo } from 'react'
import React from 'react'
// interface MatchProps {
//   match: IMatch
// }

const BettingMatch = () => {
  return (
    <>
      <div className="flex items-center text-sm py-1.5">
        <div className="w-[65px] text-red">22:59</div>
        <div className="flex-1">
          <p>Wisla Krakow</p>
          <p>Rapid Wien</p>
        </div>
        <div className="w-[100px] font-bold leading-5 px-2">
          <span className="w-1/2 inline-block text-left text-primary">0.5/1</span>
          <span className="w-1/2 inline-block text-right">0.85</span>
          <span className="w-1/2 inline-block text-left text-primary">0.5/1</span>
          <span className="w-1/2 inline-block text-right">0.85</span>
          <span className="w-1/2 inline-block text-left text-primary">0.5/1</span>
          <span className="w-1/2 inline-block text-right">0.85</span>
        </div>
        <div className="w-[100px] font-bold leading-5 px-2">
          <span className="w-1/2 inline-block text-left text-primary">2.5</span>
          <span className="w-1/2 inline-block text-right">0.85</span>
          <span className="w-1/2 inline-block text-left">u</span>
          <span className="w-1/2 inline-block text-right">1.00</span>
        </div>
        <div className="w-[35px] font-bold leading-5 px-2">
          <p>4.50</p>
          <p>2.56</p>
          <p>3.34</p>
        </div>
      </div>
      <div className="flex items-center text-sm py-1.5 bg-[#edf2f7]">
        <div className="w-[65px] text-red">22:59</div>
        <div className="flex-1">
          <p>Wisla Krakow</p>
          <p>Rapid Wien</p>
        </div>
        <div className="w-[100px] font-bold leading-5 px-2">
          <span className="w-1/2 inline-block text-left text-primary">0.5/1</span>
          <span className="w-1/2 inline-block text-right">0.85</span>
          <span className="w-1/2 inline-block text-left text-primary">0.5/1</span>
          <span className="w-1/2 inline-block text-right">0.85</span>
          <span className="w-1/2 inline-block text-left text-primary">0.5/1</span>
          <span className="w-1/2 inline-block text-right">0.85</span>
        </div>
        <div className="w-[100px] font-bold leading-5 px-2">
          <span className="w-1/2 inline-block text-left text-primary">2.5</span>
          <span className="w-1/2 inline-block text-right">0.85</span>
          <span className="w-1/2 inline-block text-left">u</span>
          <span className="w-1/2 inline-block text-right">1.00</span>
        </div>
        <div className="w-[35px] font-bold leading-5 px-2">
          <p>4.50</p>
          <p>2.56</p>
          <p>3.34</p>
        </div>
      </div>
      <div className="flex items-center text-sm py-1.5">
        <div className="w-[65px] text-red">22:59</div>
        <div className="flex-1">
          <p>Wisla Krakow</p>
          <p>Rapid Wien</p>
        </div>
        <div className="w-[100px] font-bold leading-5 px-2">
          <span className="w-1/2 inline-block text-left text-primary">0.5/1</span>
          <span className="w-1/2 inline-block text-right">0.85</span>
          <span className="w-1/2 inline-block text-left text-primary">0.5/1</span>
          <span className="w-1/2 inline-block text-right">0.85</span>
          <span className="w-1/2 inline-block text-left text-primary">0.5/1</span>
          <span className="w-1/2 inline-block text-right">0.85</span>
        </div>
        <div className="w-[100px] font-bold leading-5 px-2">
          <span className="w-1/2 inline-block text-left text-primary">2.5</span>
          <span className="w-1/2 inline-block text-right">0.85</span>
          <span className="w-1/2 inline-block text-left">u</span>
          <span className="w-1/2 inline-block text-right">1.00</span>
        </div>
        <div className="w-[35px] font-bold leading-5 px-2">
          <p>4.50</p>
          <p>2.56</p>
          <p>3.34</p>
        </div>
      </div>
    </>
  )
}

export default memo(BettingMatch)
