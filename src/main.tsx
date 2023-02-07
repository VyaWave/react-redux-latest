import React from 'react'
import ReactDOM from 'react-dom/client'

import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import { ConfigProvider } from 'antd'
import { renderRoutes } from 'react-router-config'

import 'dayjs/locale/zh-cn'
import 'antd/dist/reset.css'

import { RouterConfig } from './router'
import 'styles/index.css'

import { HashRouter } from 'react-router-dom'

dayjs.locale('zh-cn')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <HashRouter>{renderRoutes(RouterConfig)}</HashRouter>
    </ConfigProvider>
  </React.StrictMode>,
)
