import api from '@/api/api_instance'
import {
  IAboutUs,
  IAppMenu,
  IAuthResponse,
  IComment,
  ICommentAddForm,
  ICountry,
  ICountryRegion,
  IDataSideBar,
  IHighestLeagueStanding,
  ILeague,
  ILeagueMatches,
  IListOfLeague,
  IMatch,
  IMetadataModel,
  IPage,
  IPlayer,
  IPlayerDetailResponse,
  IPost,
  IPostList,
  IPostResponse,
  IProfile,
  IResponseAddComment,
  IResponsePostByAuthor,
  ITeamDetail,
  ITeamStanding,
  ITopScorePlayer,
  ITopScorePlayerClubResponse,
  ITopScorePlayerResponse,
  ITournaments,
  ITypePredictions,
  IUpdateProfile,
  PaginationResponse,
  TopScoreLeagueStats
} from '@/types/app-type'

export const login = (email: string, password: string): Promise<IAuthResponse> => {
  return api.post('/login', {
    email,
    password
  })
}

export const register = (params: { name: string; email: string; password: string; password_confirmation: string }) => {
  return api.post('/register', params)
}

export const resetPassword = (params: { email: string; password: string; password_confirmation: string; token: string }): Promise<IResponseAddComment> => {
  return api.put(`/reset-password/${params.token}`, { email: params.email, password: params.password, password_confirmation: params.password_confirmation })
}

export const getMenus = (lang = 'en'): Promise<IAppMenu> => {
  return api.get('/menu/', {
    params: {
      lang
    }
  })
}

export const saveNewsletterEmail = (email: string) => {
  return api.post('saveNewsletterEmail', { email })
}

export const getPopularLeagues = (lang: string = 'vi'): Promise<ILeague[]> => {
  return api.get(`/popularLeagues?lang=${lang}`)
}

export const getFixtures = (params: { date: string; perPage?: number; page?: number }): Promise<PaginationResponse<ILeagueMatches>> => {
  return api.get('/fixtures/', {
    params: { ...params, per_page: params.perPage }
  })
}

export const getFixturesByTeam = (params: { teamSlug: string; type?: number; perPage?: number; page?: number }): Promise<PaginationResponse<IMatch[]>> => {
  return api.get('/getFixturesByTeam', {
    params: {
      type: params.type,
      page: params.page,
      team_slug: params.teamSlug,
      per_page: params.perPage
    }
  })
}

export const getTopScoresByTeam = (params: { teamSlug: string }): Promise<TopScoreLeagueStats> => {
  return api.get('/getTopScoresByTeam', {
    params: {
      team_slug: params.teamSlug
    }
  })
}

export const getTopScores = (params: { slug: string; season: number }): Promise<ITopScorePlayer[] | ITopScorePlayerResponse | ITopScorePlayerClubResponse> => {
  return api.get('/getTopScores', {
    params: {
      slug: params?.slug,
      season: params.season
    }
  })
}

export const getFixturesByLeague = (params: {
  leagueSlug: string
  status?: number
  perPage?: number
  page?: number
}): Promise<PaginationResponse<IMatch[]>> => {
  return api.get('/getFixturesByLeague', {
    params: {
      status: params.status,
      page: params.page,
      league_slug: params.leagueSlug,
      per_page: params.perPage
    }
  })
}

export const getFixturesByCountry = (params: {
  countrySlug: string
  status?: number
  perPage?: number
  page?: number
}): Promise<PaginationResponse<ILeagueMatches>> => {
  return api.get('/getFixturesByCountry', {
    params: {
      page: params.page,
      status: params.status,
      country_slug: params.countrySlug,
      per_page: params.perPage
    }
  })
}

export const getFixturesByTeamOrLeague = (params: {
  slug: string
  status?: number
  perPage?: number
  page?: number
}): Promise<PaginationResponse<ILeagueMatches>> => {
  return api.get('/getFixturesByTeamOrLeague', {
    params: {
      page: params.page,
      status: params.status,
      slug: params?.slug,
      per_page: params.perPage
    }
  })
}

export const getLiveFixtures = (): Promise<PaginationResponse<ILeagueMatches>> => {
  return api.get('/live-fixtures/')
}

export const getAllPosts = (params?: {
  pageId?: number
  date?: string
  perPage?: number
  page?: number
  timezone?: string
}): Promise<PaginationResponse<IPostList[]>> => {
  return api.get('/allPosts/', {
    params: {
      page_id: params?.pageId,
      date: params?.date,
      per_page: params?.perPage,
      timezone: params?.timezone
    }
  })
}

export const getPostsOnPage = (params: { pageId: number; date?: string; perPage?: number; page?: number }): Promise<PaginationResponse<IPostList[]>> => {
  return api.get('/posts/', {
    params: {
      page_id: params.pageId,
      date: params.date,
      per_page: params.perPage,
      page: params.page
    }
  })
}

export const getPostsByCategory = (params: {
  categoryId: string
  date?: string
  perPage?: number
  page?: number
}): Promise<PaginationResponse<IPostList[]>> => {
  return api.get('/getPostsByCategory', {
    params: {
      date: params.date,
      category_slug: params.categoryId,
      per_page: params.perPage,
      page: params.page
    }
  })
}

export const getPostById = (params: { postId: number }): Promise<IPost> => {
  return api.get('/getPostById/', {
    params: {
      post_id: params.postId
    }
  })
}

export const getPostsByTag = (params: { tag: string; date?: string; perPage?: number; page?: number }): Promise<PaginationResponse<IPostList[]>> => {
  return api.get('/getPostsByTag', {
    params: {
      tag: params.tag,
      date: params.date,
      per_page: params.perPage,
      page: params.page
    }
  })
}

export const getComments = (params: { postId: number; perPage?: number; page?: number }): Promise<PaginationResponse<ILeagueMatches>> => {
  return api.get('/comments/', {
    params: {
      ...params,
      per_page: params.perPage
    }
  })
}

export const getCategories = (): Promise<PaginationResponse<ILeagueMatches>> => {
  return api.get('/categories/')
}

export const getCountries = (params: { keyword?: string; perPage?: number; page?: number }): Promise<PaginationResponse<ICountry[]>> => {
  return api.get('/countries/', {
    params: {
      ...params,
      per_page: params.perPage
    }
  })
}

export const getLeagues = (params: {
  countrySlug?: string
  countryStandingPage?: number
  perPage?: number
  page?: number
}): Promise<PaginationResponse<ILeague[]>> => {
  return api.get('/leagues', {
    params: {
      ...params,
      country_slug: params.countrySlug,
      countryStandingPage: params.countryStandingPage,
      per_page: params.perPage
    }
  })
}

export const getTournaments = (params: { countrySlug?: string; countryStandingPage?: number; perPage?: number; page?: number }): Promise<ITournaments> => {
  return api.get('/leaguesbycountry', {
    params: {
      ...params,
      country_slug: params.countrySlug,
      countryStandingPage: params.countryStandingPage,
      per_page: params.perPage
    }
  })
}

export const searchLeagues = (params: { keyword: string; perPage?: number; page?: number }): Promise<ILeague[]> => {
  return api.get('/searchLeagues', {
    params: {
      ...params,
      keyword: params.keyword,
      per_page: params.perPage
    }
  })
}

export const getStanding = (params: { slug: string; season: number; perPage?: number; page?: number }): Promise<ITeamStanding[]> => {
  return api.get('/standing', {
    params: {
      ...params,
      per_page: params.perPage
    }
  })
}

export const getHighestLeagueStanding = (params: { team_slug: string; season?: number }): Promise<IHighestLeagueStanding> => {
  return api.get('/getHighestLeagueStanding', {
    params: {
      ...params
    }
  })
}

export const getTopScoresByLeague = (params: { league_slug: string; season: number; perPage?: number; page?: number }): Promise<ITopScorePlayerResponse> => {
  return api.get('/getTopScoresByLeague', {
    params: {
      ...params,
      per_page: params.perPage
    }
  })
}

export const getHighestLeagueTopScores = (params: { country_slug: string; season: number; perPage?: number; page?: number }): Promise<ITopScorePlayer[]> => {
  return api.get('/getHighestLeagueTopScores', {
    params: {
      ...params,
      per_page: params.perPage
    }
  })
}

export const getNationalGroupByRegion = (): Promise<PaginationResponse<ICountryRegion[]>> => {
  return api.get('/nationalGroupByRegion')
}

export const getTeams = (params: { keyword?: string; national?: number; perPage?: number; page?: number }): Promise<PaginationResponse<ILeagueMatches>> => {
  return api.get('/teams/', {
    params: {
      ...params,
      per_page: params.perPage
    }
  })
}

export const getTeamDetail = (params: { team_slug: string }): Promise<ITeamDetail> => {
  return api.get('/teamDetails/', {
    params: {
      ...params
    }
  })
}

export const getTeamsByPopularLeagues = (): Promise<IListOfLeague> => {
  return api.get('/getTeamsByPopularLeagues/')
}

export const getPlayers = (params: {
  keyword?: string
  perPage?: number
  teamId?: number
  leagueId?: number
  season?: number
  page?: number
}): Promise<PaginationResponse<IPlayer[]>> => {
  return api.get('/players/', {
    params: {
      ...params,
      per_page: params.perPage,
      team_id: params.teamId,
      league_id: params.leagueId,
      page: params.page
    }
  })
}

export const getBettingOdds = (params: { date: string; bookmaker_id?: number }): Promise<PaginationResponse<any>> => {
  return api.get('/betting-odds', {
    params
  })
}

export const getBettingOddByLeague = (params: { league: string; bookmaker_id?: number }): Promise<PaginationResponse<any>> => {
  return api.get('/betting-odds/league', {
    params
  })
}

export const getBookmakers = (): Promise<PaginationResponse<any>> => {
  return api.get('/bookmakers')
}

export const getMatchDetail = (params: { bookmaker_id?: number }, slug?: string, date?: string): Promise<any> => {
  if (date) {
    return api.get(`/match/${slug}/${date}`, {
      params
    })
  } else {
    return api.get(`/match/${slug}`, {
      params
    })
  }
}

export const getMetaData = (params: { type?: string; slug?: string; url?: string; language?: string }) => {
  return api.get<IMetadataModel>('/getmetadata', {
    params: {
      ...params
    }
  })
}
export const getFixturePredictions = (params: { date: string; type?: ITypePredictions; slug?: string; page?: number; per_page?: number }): Promise<any> => {
  return api.get('/predictions', {
    params
  })
}

export const getPostBySlug = (params: { slug: string; timezone?: string }): Promise<IPostResponse> => {
  return api.get('/getPostBySlug', {
    params
  })
}

export const getAllPostsByAuthor = (params?: { author: string; perPage?: number; page?: number }): Promise<IResponsePostByAuthor> => {
  return api.get('/getPostByAuthor', {
    params: {
      author: params?.author,
      per_page: params?.perPage,
      page: params?.page
    }
  })
}

export const getPlayerDetail = (playerId: number): Promise<IPlayerDetailResponse> => {
  return api.get(`/player/${playerId}`)
}

export const getCoachs = (params: { perPage?: number; page?: number }): Promise<PaginationResponse<IPlayer[]>> => {
  return api.get('/coaches/', {
    params: {
      ...params,
      per_page: params.perPage,
      page: params.page
    }
  })
}

export const getCoachDetail = (playerId: number): Promise<IPlayerDetailResponse> => {
  return api.get(`/coach/${playerId}`)
}

export const getCommentList = (apiId: number): Promise<IComment[]> => {
  return api.get(`/comments/`, { params: { api_id: apiId } })
}

export const addComment = (params: ICommentAddForm): Promise<IResponseAddComment> => {
  return api.post(`/comments/`, params)
}

export const getProfile = (token: string): Promise<IProfile> => {
  return api.get(`/profile/`, { headers: { Authorization: `Bearer ${token}` } })
}

export const updateProfile = (params: IUpdateProfile): Promise<IProfile> => {
  return api.put(`/profile/update`, params)
}

export const forgotPassword = (params: { email: string }): Promise<IResponseAddComment> => {
  return api.post(`/forgot-password/`, params)
}

export const getPage = (slug: string): Promise<IPage<IAboutUs>> => {
  return api.get(`/page/${slug}`)
}

export const getFixtureByClubOrLeague = (params: {
  status?: number
  limit?: number
  slug?: string
  page?: number
}): Promise<PaginationResponse<ILeagueMatches>> => {
  return api.get(`/getFixtureByClubOrLeague`, { params: { ...params, status: params.status, limit: params.limit, slug: params.slug, page: params.page } })
}

export const verifyAccount = (id: string, hash: string): Promise<{ message: string }> => {
  return api.get(`email/verify/${id}/${hash}`)
}

export const getSidebarDataBySlug = (slug: string, url: string): Promise<IDataSideBar> => {
  return api.get(`leaguesbycountry-url?slug=${slug}&url=${url}`)
}

export const popularLeaguesRight = (slug: string, url: string): Promise<IDataSideBar> => {
  return api.get(`popularLeaguesright?slug=${slug}&url=${url}`)
}

export const getLastestNew = (): Promise<PaginationResponse<IPostList[]>> => {
  return api.get(`latest-news`)
}
