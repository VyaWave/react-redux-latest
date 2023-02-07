import * as React from 'react'
import { Spin } from 'antd'
import { RouteConfig } from 'react-router-config'

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

function LoadPage(loader: any) {
  const Com = React.lazy(loader)

  return (props: any) => (
    <React.Suspense fallback={<Loading />}>
      <Com {...props}></Com>
    </React.Suspense>
  )
}
export const RouterConfig: RouteConfig[] = [
  {
    path: '/',
    component: LoadPage(() => import('./pages/Home/index' /* webpackChunkName: "layout_app" */)),
    routes: [
      {
        path: '/',
        exact: true,
        title: '活动列表',
        component: LoadPage(() => import('./pages/Home/index' /* webpackChunkName: "pope_list_page" */)),
      },
    ],
  },
]
