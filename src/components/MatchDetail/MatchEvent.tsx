import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo } from 'react'
import { faArrowUp, faArrowDown, faSoccerBall } from '@fortawesome/free-solid-svg-icons';
interface Props {
  event: any,
  teams: any,
  score: string
}

const MatchEvent = ({ event, teams, score }: Props) => {
  const renderHomeEvent = (event: any) => {
    if (event.team.id !== teams.home.id) {
      return;
    }

    return (
      <>
        {event.type === 'subst' && (
          <>
            <div className="flex justify-end">
              {event.player.name}
              <span className="ml-2">
                <FontAwesomeIcon icon={faArrowUp} className="text-[#008000]" />
              </span>
            </div>
            <div className="flex justify-end">
              {event.assist.name}
              <span className="ml-2">
                <FontAwesomeIcon icon={faArrowDown} className="text-[#ff253a]" />
              </span>
            </div>
          </>
        )}
        {event.type === 'Goal' && (
          <>
            <div className="flex justify-end">
              {event.player.name} {event.player.assist ? `(${event.player.assist})` : ''} {event.detail == 'Penalty' ? `(Pen)` : ''}
              <span className="ml-2">
                <FontAwesomeIcon icon={faSoccerBall} />
              </span>
            </div>
          </>
        )}
        {event.type === 'Card' && event.detail === 'Yellow Card' && (
          <div className="flex justify-end">
            {event.player.name}                
            <span className="p-2 pr-0">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="8" height="12" fill="#FDB822"></rect>
              </svg>
            </span>
          </div>
        )}
      </>
    )
  }

  const renderAwayEvent = (event: any) => {
    if (event.team.id !== teams.away.id) {
      return;
    }

    return (
      <>
        {event.type === 'subst' && (
          <>
            <div className="flex justify-start">
              <span className="mr-2">
                <FontAwesomeIcon icon={faArrowUp} className="text-[#008000]" />
              </span>
              {event.player.name}
            </div>
            <div className="flex justify-start">
              <span className="mr-2">
                <FontAwesomeIcon icon={faArrowDown} className="text-[#ff253a]" />
              </span>
              {event.assist.name}
            </div>
          </>
        )}
        {event.type === 'Goal' && (
          <>
            <div className="flex justify-start">
              <span className="mr-2">
                <FontAwesomeIcon icon={faSoccerBall} />
              </span>
              {event.player.name} {event.player.assist ? `(${event.player.assist})` : ''} {event.detail == 'Penalty' ? `(Pen)` : ''}
            </div>
          </>
        )}
        {event.type === 'Card' && event.detail === 'Yellow Card' && (
          <div className="flex justify-start">
            <span className="p-2 pl-0">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="8" height="12" fill="#FDB822"></rect>
              </svg>
            </span>
            {event.player.name}
          </div>
        )}
      </>
    )
  }

  return (
    <div className="w-100 flex border-b border-[#e5e5e5]">
      <div className="w-[15%] flex items-center justify-start ml-3">
        {event.time.elapsed}{event.time.extra ? `(+${event.time.extra})` : ''}&apos;
      </div>
      <div className="w-[35%] text-right mr-2">
        {renderHomeEvent(event)}
      </div>
      <div className="w-[15%] bg-[#edf2f7] flex items-center justify-center">
        {score}
      </div>
      <div className="w-[35%] text-left ml-2">
        {renderAwayEvent(event)}
      </div>
    </div>
  )
}

export default memo(MatchEvent)
