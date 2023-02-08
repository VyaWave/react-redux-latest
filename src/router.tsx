import * as React from 'react'
import { Spin } from 'antd'
import { useRoutes, HashRouter, Routes } from 'react-router-dom'

const Loading = () => {
  return (
    <Spin
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  )
}

const LazyLoad = (loader: any) => {
  const Component = React.lazy(loader)

  return (props: any) => (
    <React.Suspense fallback={<Loading />}>
      <Component {...props} />
    </React.Suspense>
  )
}

export const RouterConfig: any[] = [
  {
    path: '/',
    element: LazyLoad(() => import('./pages/Home/index' /* webpackChunkName: "home_page" */)),
  },
]
