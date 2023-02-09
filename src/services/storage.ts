import * as qs from 'querystring'
import * as ck from 'cookie'
import { UserInfo } from './types'
type Lang = string

class Storage {
  constructor() {
    const lang = this.getLang() || 'en-US'
    this.setLang(lang)

    const country = this.getCountry() || 'BR'
    this.setCountry(country)

    const utc = this.getUTC()
    this.setUTC(Number.isNaN(utc) ? -240 : utc)

    const client = this.getClient() || 'passenger'

    this.setClient(client)

    if (!this.getNs()) {
      // 如果司机端骑手空间
      if (this.getNsType() === 'food_rider') {
        this.setNs(`${country.toLowerCase()}.${client}.${this.getNsType()}`)
        return
      }
      this.setNs(`${country.toLowerCase()}.${client}`)
    }
  }

  // 国家
  getCountry() {
    return this.getQuery<string>('country')
  }

  setCountry(country: string) {
    this.setQuery('country', country)
    this.setCookie('country', country)
  }

  // 端
  getClient() {
    return this.getQuery<string>('client')
  }

  getNsType() {
    return this.getQuery<string>('nsType')
  }

  setClient(client: string) {
    this.setQuery('client', client)
  }

  // ns
  getNs() {
    return this.getQuery<string>('ns')
  }

  setNs(ns: string) {
    this.setQuery('ns', ns)
  }

  // 顺风车
  isHitchhike() {
    return this.getQuery<string>('ns').includes('oasis')
  }

  // 语言
  getLang() {
    return this.getQuery<Lang>('lang') || this.getCookie<Lang>('lang') || 'en-US'
  }

  setLang(lang: Lang) {
    this.setQuery('lang', lang)
    this.setCookie('lang', lang)
  }

  // 时区
  getUTC() {
    return +this.getQuery<string>('utc')
  }

  setUTC(utc: number) {
    this.setQuery('utc', utc)
    this.setCookie('utc', utc)
  }

  // 用户名
  getUsername() {
    return this.getCookie<string>('username') || this.getQuery<string>('username')
  }

  setUsername(usernmae: string) {
    this.setQuery('username', usernmae)
    this.setCookie('username', usernmae)
  }

  // 用户信息
  getUserInfo() {
    const str = this.getCookie<string>('userInfo')
    let result = {} as UserInfo

    try {
      result = JSON.parse(decodeURIComponent(str))
    } catch (e) {
      console.error(e)
    }

    return result
  }

  getTicket() {
    return this.getCookie<string>('MISP_SUB_TICKET')
  }

  setQuery(key: string, value: any) {
    const { protocol, host, pathname, hash, search } = window.location
    const query: any = qs.parse(search.substr(1))
    query[key] = value

    const q = qs.stringify(query)

    const newUrl = `${protocol}//${host}${pathname}?${q}${hash}`
    window.history.pushState({ path: newUrl }, '', newUrl)
  }

  getQuery<T>(key: string) {
    const query: any = qs.parse(window.location.search.substr(1))
    return query[key] as T
  }

  getLocalStorage<T>(key: string) {
    const value: any = localStorage.getItem(key)
    try {
      return JSON.parse(value) as T
    } catch (e) {
      return value as T
    }
  }

  setLocalStorage(key: string, value: any) {
    if (typeof value === 'object') return localStorage.setItem(key, JSON.stringify(value))
    return localStorage.setItem(key, value)
  }

  getCookie<T>(key: string) {
    return ck.parse(document.cookie)[key] as T
  }

  setCookie(key: string, value: any) {
    document.cookie = `${key}=${value}`
  }

  getFlagsOfSMSSplit() {
    const countryFlag: boolean = ['BR'].includes((this.getCountry() || '').toUpperCase())
    const clientFlag: boolean = ['passenger'].includes((this.getClient() || '').toLowerCase())
    return countryFlag && clientFlag
  }

  getCanvasActionCache() {
    return JSON.parse(localStorage.getItem('fintech-canvas-action-map') || '{}')
  }
}

export type StorageType = typeof Storage
const StorageManger: any = new Storage()

export default StorageManger
