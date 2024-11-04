export interface IMenuItem {
  name: string
  url: string
}

export interface IAuthResponse {
  access_token: string
  token_type: string
  expires_in: number
  user_name: string
}

export interface IMenu {
  name: string
  items: IMenuItem[]
}

export interface IAppMenu {
  [name: string]: IMenu
}

export interface IPeriod {
  first: number
  second: number | null
}

export interface IVenue {
  id: number | null
  city: string
  name: string
}

export interface IStatus {
  long: string
  short: string
  elapsed: number
}

export interface ILeague {
  id: number
  api_id: number
  name: string
  type: string
  logo: string
  country_code: string
  created_at: string
  updated_at: string
  slug: string
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  meta_title_vi: string | null
  meta_description_vi: string | null
  meta_keywords_vi: string | null
  vi_name: string | null
  content: string | null
  content_vi: string | null
  bot_body: string | null
  bot_body_vi: string | null
  shown_on_country_standing: number
  popular: number
  current_season: number
}

export interface ITeam {
  id: number
  logo: string
  name: string
  winner: boolean | null
}

export interface ITeamByLeague {
  id: number
  api_id: number
  name: string
  code: string | null
  country: string
  national: number
  logo: string
  league_id: number
  season: number
  created_at: string | null
  updated_at: string | null
  slug: string
  name_vi: string | null
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  meta_title_vi: string | null
  meta_description_vi: string | null
  meta_keywords_vi: string | null
  content: string | null
  content_vi: string | null
}

export interface ITeamsByLeague {
  [leagueName: string]: ITeamByLeague[]
}

export interface ITeamInLeague {
  api_id: number
  code: string
  country: string
  id: number
  league_id: number
  logo: string
  name: string
  national: number
  pivot: { league_id: string; team_id: string }
  slug: string
}

export interface IListOfLeague {
  [key: string]: IClubInterface
}
export interface IClubInterface {
  country: {
    flag: string
    name: string
    slug: string
  }
  league: {
    logo: string
    name: string
    slug: string
  }
  teams: ITeamInLeague[]
}
export interface IGoals {
  away: number
  home: number
}

export interface IScore {
  penalty: {
    away: number | null
    home: number | null
  }
  fulltime: {
    away: number | null
    home: number | null
  }
  halftime: {
    away: number
    home: number
  }
  extratime: {
    away: number | null
    home: number | null
  }
}

export interface IMatch {
  id: number
  api_id: number
  referee: string | null
  timezone: string
  date: string
  timestamp: number
  periods: IPeriod
  venue: IVenue
  status: IStatus
  league: {
    id: number
    flag: string | null
    logo: string
    name: string
    round: string
    season: number
    country: string
  }
  teams: {
    away: ITeam
    home: ITeam
  }
  goals: IGoals
  score: IScore
  created_at: string | null
  updated_at: string | null
  slug: string
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  meta_title_vi: string | null
  meta_description_vi: string | null
  meta_keywords_vi: string | null
  content: string | null
  vi_content: string | null
  related_posts: string | null
  bot_body: string | null
  bot_body_vi: string | null
  date_slug: string
  predictions: string[]
  predict_data: {
    '1x2': IMatchPredictData
    score: {
      home: number
      away: number
    }
    avg_goal: string
    bo: string
    goal: string
  }
}

export interface IMatchPredictData {
  '1': string
  x: string
  '2': string
}

export interface ILeagueMatches {
  [country: string]: {
    country: {
      name: string
      flag: string
      slug: string
    }
    league: {
      name: string
      slug: string
      flag: string
    }
    items: IMatch[]
  }
}

export interface IGoalsStandings {
  for: number
  against: number
}

export interface IMatchStats {
  win: number
  draw: number
  lose: number
  goals: IGoalsStandings
  played: number
}

export interface ITeamStanding {
  id: number
  league_id: number
  season: number
  team_id: number
  team_name: string
  rank: number
  points: number
  goalsDiff: number
  group: string
  form: string | null
  status: string
  description: string | null
  all: IMatchStats
  home: IMatchStats
  away: IMatchStats
  created_at: string
  updated_at: string
  five_recent_matches: string[]
}

export interface IHighestLeagueStanding {
  name: string
  season: number
  slug: string
  items: ITeamStanding[]
}

export interface ITopScorePlayerResponse {
  data: ITopScorePlayer[]
}

export interface ITopScorePlayerClubResponse {
  [key: string]: ITopScorePlayer[]
}

export interface ITopScorePlayer {
  id: number
  player_id: number
  league_id: number
  season: number
  created_at: string
  updated_at: string
  goals: number
  penalty: number
  team_id: number
  player_name: string
  team_name: string
  team: string
}

export interface IPost {
  id: number
  user_id: number
  title: string
  description: string
  status: string
  slug: string
  body: string
  view: number
  meta_title: string
  meta_description: string
  meta_keywords: string
  created_at: string
  updated_at: string
  related_posts: string[]
  title_vi: string | null
  description_vi: string | null
  body_vi: string
  meta_title_vi: string | null
  meta_description_vi: string | null
  meta_keywords_vi: string | null
  on_pages: string[]
  tags: string[]
}

export interface IAuthor {
  about: string
  fb_url: string
  id: number
  linkedin_url: string
  name: string
  pinterest_url: string
  slug: string
  x_url: string
}

export interface IPostList {
  related_posts: IPostList[]
  id: number
  user_id: number
  author: IAuthor
  categories: { name: string; slug: string }[]
  title: string
  description: string
  status: string
  slug: string
  body: string
  view: number
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  created_at: string
  updated_at: string
  title_vi: string | null
  description_vi: string | null
  body_vi: string | null
  meta_title_vi: string | null
  meta_description_vi: string | null
  meta_keywords_vi: string | null
  on_pages: string[] | null
  tags: { slug: string; tag_name: string }[]
  bot_body: string | null
  bot_body_vi: string | null
  match_info?: IMatchInfo
}

export interface IMatchInfo {
  timezone: string
  match_date: string
  teams: {
    home: {
      logo: string
      name: string
    }
    away: {
      logo: string
      name: string
    }
  }
  league: {
    logo: string
    name: string
  }
}
export interface ICountry {
  id: number
  api_id: number | null
  name: string
  code: string
  flag: string
  from_team: number
  created_at: string | null
  updated_at: string
  name_vi: string | null
  slug: string | null
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  meta_title_vi: string | null
  meta_description_vi: string | null
  meta_keywords_vi: string | null
  region: string
  region_id: string
  subregion: string
  subregion_id: string
  rank: string
  previous_rank: string
  points: string
  previous_points: string
  region_vi: string
  subregion_vi: string
}

export interface TopScorePlayerStats {
  id: number
  player_id: number
  league_id: number
  season: number
  created_at: string
  updated_at: string
  goals: number
  penalty: number
  team_id: number
  player_name: string
  team_name: string
}

export interface TopScoreLeagueStats {
  [season: string]: TopScorePlayerStats[][]
}

export interface ICountryRegion {
  name: string
  name_vi: string
  items: ICountry[]
}

export interface IBookmaker {
  id: number
  name: string
}

export interface IBettingOdd {
  slug: string
  matches: IBettingMatch[]
  details: any[]
  country: {
    flag: string
    name: string
    slug: string
  }
  logo: string
}

export interface IBettingMatch {
  teams: {
    away: ITeam
    home: ITeam
  }
  bet: any
  date: string
}

export interface ICoachCareer {
  end: string
  team: {
    id: number
    logo: string
    name: string
  }
  start: string
}

export interface ICoach {
  id: number
  api_id: string
  name: string
  firstname: string
  lastname: string
  age: number
  date_of_birth: string
  place_of_birth: string
  country: string
  nationality: string
  height: number | null
  weight: number | null
  photo: string
  team_id: number
  career: ICoachCareer[]
  created_at: string | null
  updated_at: string | null
  slug: string
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  meta_title_vi: string | null
  meta_description_vi: string | null
  meta_keywords_vi: string | null
  content: string | null
  content_vi: string | null
  bot_body: string | null
  bot_body_vi: string | null
}

export interface ITeamDetail {
  status: boolean
  id: number
  api_id: number
  name: string
  code: string
  country: string
  national: number
  logo: string
  league_id: number
  season: number
  created_at: string | null
  updated_at: string | null
  slug: string
  name_vi: string | null
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  meta_title_vi: string | null
  meta_description_vi: string | null
  meta_keywords_vi: string | null
  content: string | null
  content_vi: string | null
  venue_id: number | null
  coach: ICoach
  venue: string | null
}

export interface PaginateParams {
  page?: number
  per_page?: number
}

export interface PaginationResponse<T extends object> {
  data: T
  status: boolean
  current_page: number
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export interface IMetadata {
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  content_top?: string
  content_bottom?: string
  canonical?: string
  image?: string
  content_footer?: string
  heading: string
}
export interface IMetadataModel {
  slug?: string
  url?: string
  type?: string
  language?: string
  metadata?: IMetadata
  breadcrumbs: IMetadataBreadcrumbs[]
}

export interface IPostResponse {
  data: IPostList
  status: boolean
}

export interface IMetadataBreadcrumbs {
  name: string
  url: string
}

export interface IMetadataResponse {
  data: IMetadataModel
  status: boolean
}

export type IMetadataProps = {
  params: { slug: string }
}

export interface IServerProps<T> {
  metadata: IMetadataModel
  menu: IAppMenu
  data: T
}

export interface ILayoutNationalOrLeague<T> extends IServerProps<T> {
  children: React.ReactNode
}

export interface IStaticProps<T> {
  data: T
}

export interface IAuthor {
  name: string
  about: string
  fb_url: string
  x_url: string
  pinterest_url: string
  linkedin_url: string
  slug: string
  id: number
}

export interface IPlayerDetailResponse {
  data: IPlayerDetail
  status: boolean
}

export interface IResponsePostByAuthor {
  author: IAuthor
  posts: PaginationResponse<IPostList>
}

export interface IPlayer {
  id: number
  api_id: number
  name: string
  first_name: string
  last_name: string
  age: number
  date_of_birth: string
  place_of_birth: string
  country: string
  nationality: string
  height: string
  weight: string
  injured: number
  photo: string
  slug: string
  team: ITeam
}

export interface ITeam {
  api_id: number
  code: string
  country: string
  id: number
  logo: string
  name: string
  national: number
  season: number
  slug: string
  venue_id: number
}

export interface ICareer {
  end: string | null
  start: string | null
  team: ITeam
}

export interface IPlayerDetail {
  api_id: number
  name: string
  first_name: string
  last_name: string
  age: number
  date_of_birth: string
  place_of_birth: string
  country: string
  nationality: string
  height: string
  weight: string
  injured: number
  photo: string
  created_at: string
  updated_at: string
  slug: string
  statistics?: IStatistics[]
  team: ITeam
  career: ICareer[]
}

export interface IStatistics {
  id: number
  player_id: number
  team_id: number
  league_id: number
  season: number
  games: {
    number: string
    rating: string
    captain: false
    lineups: string
    minutes: string
    position: string
    appearences: string
  }
  substitutes: {
    in: string
    out: string
    bench: string
  }
  shots: {
    on: string
    total: string
  }
  goals: {
    saves: string
    total: string
    assists: string
    conceded: string
  }
  passes: {
    key: string
    total: string
    accuracy: string
  }
  tackles: {
    total: string
    blocks: string
    interceptions: string
  }
  duels: {
    won: string
    total: string
  }
  dribbles: {
    past: string
    success: string
    attempts: string
  }
  fouls: {
    drawn: string
    committed: string
  }
  cards: {
    red: string
    yellow: string
    yellowred: string
  }
  penalty: {
    won: string
    saved: string
    missed: string
    scored: string
    commited: string
  }
  created_at: string
  updated_at: string
}

export interface IComment {
  id: number
  user_id: number
  content: string
  post_id: number
  news_id: number
  parent_id: null
  created_at: string
  updated_at: string
  lang: string
  user: { id: string; name: string }
  replies: IComment[]
}

export interface ICommentAddForm {
  api_id: number
  content: string
  parent_id?: number
}

export interface IResponseAddComment {
  message: string
}

export interface IUpdateProfile {
  name: string
  password: string
  password_confirmation: string
}

export interface IProfile {
  created_at: string
  email: string
  email_verified_at: string
  id: number
  name: string
  updated_at: string
}

export type ITypePredictions = 'team' | 'league' | 'country'

export interface IPage<T> {
  data: T
  status: boolean
}

export interface IAboutUs {
  id: number
  user_id: number
  title: string
  slug: string
  body: string
  view: number
  created_at: string
  updated_at: string
  meta_title: string
  meta_description: string
  meta_keywords: string
}

export interface ITournaments {
  items: ITournamentsItem
  country: string
}

export interface ITournamentsItem {
  data: ILeague[]
  status: boolean
  current_page: number
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export interface IDataSideBarItem {
  name: string
  slug: string
  logo: string
  url: string
}
export interface IDataSideBar {
  heading: {
    name: string
    url: string
  }
  items: IDataSideBarItem[]
}
