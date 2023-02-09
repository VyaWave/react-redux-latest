import { Dispatch } from 'redux'
import axios, { AxiosRequestConfig } from 'axios'
import genuuidjs from '@didi/ibt-fe-genuuidjs'
import Storage from './storage'
import raven, { RavenEvents } from './raven'

import { HTTP_ERROR, HTTP_LOADING, HTTP_SUCCESS } from './types'

// DIDI:INFO: 默认 baseURL 金融前缀
export const http = axios.create({
  baseURL: ``,
  withCredentials: true,
  headers: {
    'Accept-Language': Storage.getLang(),
  },
})

const trackRequest = (success: boolean = true) => {
  if (success) {
    setTimeout(() => {
      raven.trackEvent(RavenEvents.requestSuccess)
    })
  } else {
    setTimeout(() => {
      raven.trackEvent(RavenEvents.requestError)
    })
  }
}

http.interceptors.request.use(
  (req: any) => {
    req.headers = {
      ...req.headers,
      traceid: genuuidjs.createTraceId(),
      spanid: genuuidjs.createSpanId(),
    }
    req.params = {
      ...((window as any).needNotNs ? {} : { namespace: Storage.getNs() }),
      lang: Storage.getLang(),
      ...req.params,
      utcOffset: Storage.getUTC(),
    }

    raven?.trackEvent('tech_request_start', {
      url: req?.url || '',
    })
    ;(req as any).raven = {
      done: raven.trackRequest(req.url as string, req.method === 'get' ? req.params : req.data),
    }
    return req
  },
  err => {
    return Promise.reject(err)
  },
)

http.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    return Promise.reject(err)
  },
)

export interface HttpAction<T> {
  type: string
  payload: {
    options: HttpActionOptions
    loading: boolean
    error: Error | null
    data: T | null
  }
}
export interface HttpActionOptions extends AxiosRequestConfig {
  type: string
  pipe?: (res: any) => any
  onSuccess?: (result: any) => any
  onError?: (e: Error) => any
  extra?: any
}

export function httpLoading(options: HttpActionOptions) {
  return {
    type: HTTP_LOADING + options.type,
    payload: { options, loading: true, error: null, data: null },
  }
}

export function httpLoadingClose(options: HttpActionOptions) {
  return {
    type: HTTP_LOADING + options.type,
    payload: { options, loading: false, error: null, data: null },
  }
}

export function httpSuccess<T>(options: HttpActionOptions, result: T) {
  return {
    type: HTTP_SUCCESS + options.type,
    payload: { options, loading: false, error: null, data: result },
  }
}

export function httpError(options: HttpActionOptions, error: Error | null) {
  return {
    type: HTTP_ERROR + options.type,
    payload: {
      options,
      loading: false,
      error,
      data: null,
      message: error?.message,
    },
  }
}

export function genHttpAction<T>(options: HttpActionOptions) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(httpLoading(options))
      let result = await http(options)
      if (options.pipe) result = options.pipe(result)
      dispatch(httpSuccess(options, result))
      if (options.onSuccess) options.onSuccess(result)
      return result
    } catch (e: any) {
      console.error(e)
      console.error(e)
      dispatch(httpError(options, e))
      if (options.onError) options.onError(e)
    }
  }
}
