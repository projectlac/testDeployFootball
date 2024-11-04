import { useTranslations } from 'next-intl'
import React, { memo } from 'react'
import SoccerLineUp from 'react-soccer-lineup'
import { Player } from 'react-soccer-lineup/dist/components/team/player/Player'
import { Squad, Style } from 'react-soccer-lineup/dist/components/team/Team'

interface Props {
  lineups: any
  teams: any
  awayFormationGrid: string[]
  homeFormationGrid: string[]
}

const LineUp = ({ lineups, teams, awayFormationGrid, homeFormationGrid }: Props) => {
  const t = useTranslations('MatchDetail.lineUp')
  const renderHomeLineUp = (isSub = false) => {
    const lineup = lineups.filter((lineup: any) => lineup.team.id === teams.home.id)[0]
    const players = isSub ? lineup.substitutes : lineup.startXI

    return (
      <>
        {players.map((item: any, index: number) => {
          return (
            <div key={index} className="flex ml-2 text-sm font-bold">
              <div className="w-[10%] mr-2">{item.player.number}</div>
              {item.player.name}
            </div>
          )
        })}
      </>
    )
  }

  const renderAwayLineUp = (isSub = false) => {
    const lineup = lineups.filter((lineup: any) => lineup.team.id === teams.away.id)[0]
    const players = isSub ? lineup.substitutes : lineup.startXI

    return (
      <>
        {players.map((item: any, index: number) => {
          return (
            <div key={index} className="flex ml-2 text-sm font-bold justify-end">
              <div className="w-[90%] text-right mr-5">{item.player.name}</div>
              <div className="w-[10%] ml-2">{item.player.number}</div>
            </div>
          )
        })}
      </>
    )
  }

  const homeFormations = () => {
    return formationSquad(lineups.filter((lineup: any) => lineup.team.id === teams.home.id)[0], homeFormationGrid)
  }

  const awayFormations = () => {
    return formationSquad(lineups.filter((lineup: any) => lineup.team.id === teams.away.id)[0], awayFormationGrid)
  }

  const formationSquad = (lineup: any, grid: string[]) => {
    let gk: Player = {}
    const df: Player[] = []
    const cdm: Player[] = []
    const cm: Player[] = []
    const cam: Player[] = []
    const fw: Player[] = []

    const formationArray = lineup.formation?.split('-')

    grid.map((g: string) => {
      const position = Number(g?.split(':')[0])
      const player = lineup.startXI.filter((p: any) => {
        return p.player.grid === g
      })[0].player
      const names = player.name.split(' ')
      let name = ''
      if (names.length > 1) {
        names.map((n: string, index: number) => {
          if (index < names.length - 1) {
            name += n.charAt(0) + '. '
          } else {
            name += n
          }
        })
      } else {
        name = player.name
      }

      // Goalkeeper
      if (position === 1) {
        gk = {
          name,
          number: player.number
        }
      }

      // Defenders
      if (position === 2) {
        df.push({
          name,
          number: player.number
        })
      }

      // Normal formation: 4-3-3, 3-4-3,...
      if (formationArray && formationArray.length === 3) {
        if (position === 3) {
          cm.push({
            name,
            number: player.number
          })
        }

        if (position === 4) {
          fw.push({
            name,
            number: player.number
          })
        }
      }

      // Other formation: 4-3-2-1, 3-4-1-2,...
      if (formationArray && formationArray.length === 4) {
        if (position === 3) {
          formationArray[1] < formationArray[2] ? cm.push({ name, number: player.number }) : cdm.push({ name, number: player.number })
        }

        if (position === 4) {
          formationArray[1] < formationArray[2] ? cam.push({ name, number: player.number }) : cm.push({ name, number: player.number })
        }

        if (position === 5) {
          fw.push({
            name,
            number: player.number
          })
        }
      }
    })

    return {
      gk,
      df,
      cdm,
      cm,
      cam,
      fw
    } as Squad
  }

  const homeFormationStyle = () => {
    return formationStyle(lineups.filter((lineup: any) => lineup.team.id === teams.home.id)[0])
  }

  const awayFormationStyle = () => {
    return formationStyle(lineups.filter((lineup: any) => lineup.team.id === teams.away.id)[0])
  }

  const formationStyle = (lineup: any) => {
    return {
      numberColor: `#${lineup.team?.colors?.player.number ?? '0000000'}`,
      color: `#${lineup.team?.colors?.player.primary ?? '0000000'}`,
      nameColor: `#ffffff`
    } as Style
  }

  // const getPlayerName = (player: any): string => {
  //   let name = player.name
  //   const names = player.name.split(' ')
  //   if (names.length > 1) {
  //     names.map((n: string, index: number) => {
  //       if (index < names.length - 1) {
  //         name += n.charAt(0) + '. '
  //       } else {
  //         name += n
  //       }
  //     })
  //   }

  //   return name
  // }

  return (
    <>
      <div className="bg-[#edf2f7] text-center p-3 mt-3 text-[#656565] font-bold border-b border-t border-[#e5e5e5] mt-5">
        {teams.home.name} vs {teams.away.name}: {t('title')}
      </div>
      <div className="w-100 flex border-b border-[#e5e5e5]">
        <div className="w-[50%]">
          <div className="text-center mb-5 font-bold">
            {t('formation')}: {lineups.filter((lineup: any) => lineup.team.id === teams.home.id)[0].formation}
          </div>
        </div>
        <div className="w-[50%]">
          <div className="text-center mb-5 font-bold">
            {t('formation')}: {lineups.filter((lineup: any) => lineup.team.id === teams.away.id)[0].formation}
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-[98%] justify-center md:hidden flex border-b border-[#e5e5e5]">
          <SoccerLineUp
            size={'small'}
            pattern={'lines'}
            homeTeam={{
              squad: homeFormations(),
              style: homeFormationStyle()
            }}
            awayTeam={{
              squad: awayFormations(),
              style: awayFormationStyle()
            }}
          />
        </div>
      </div>
      <div className="w-[98%]  justify-center hidden md:flex border-b border-[#e5e5e5]">
        <SoccerLineUp
          size={'normal'}
          pattern={'lines'}
          homeTeam={{
            squad: homeFormations(),
            style: homeFormationStyle()
          }}
          awayTeam={{
            squad: awayFormations(),
            style: awayFormationStyle()
          }}
        />
      </div>
      <div className="bg-[#edf2f7] text-center p-3 mt-3 text-[#656565] font-bold border-b border-t border-[#e5e5e5] text-sm">{t('reserveTeam')}</div>
      <div className="w-100 flex border-b border-[#e5e5e5]">
        <div className="w-[50%]">{renderHomeLineUp(true)}</div>
        <div className="w-[50%]">{renderAwayLineUp(true)}</div>
      </div>
      <div className="bg-[#edf2f7] text-center p-3 mt-3 text-[#656565] font-bold border-b border-t border-[#e5e5e5] text-sm">{t('coach')}</div>
      <div className="w-100 flex border-b border-[#e5e5e5] p-2">
        <div className="w-[50%] text-center">{lineups.filter((lineup: any) => lineup.team.id === teams.home.id)[0]?.coach?.name}</div>
        <div className="w-[50%] text-center">{lineups.filter((lineup: any) => lineup.team.id === teams.away.id)[0]?.coach?.name}</div>
      </div>
    </>
  )
}

export default memo(LineUp)
