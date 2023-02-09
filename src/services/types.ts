export interface UserInfo {
  admin: boolean
  adminId: number
  adminName: string
  appId: string
  country: string
  country_code: string
  currentCountry: string
  currentLang: string
  currentUtc: string
  dept: string
  email: string
  headImg: string
  lang: string
  location_cityid: number
  opId: number
  opName: string
  opNameCn: string
  phone: string
  username: string
}

export const HTTP_LOADING = 'LOADING_'
export const HTTP_ERROR = 'ERROR_'
export const HTTP_SUCCESS = 'SUCCESS_'
