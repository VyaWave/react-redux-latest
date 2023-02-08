import React from 'react'
import { ConfigProvider } from 'antd'
import ReactDOM from 'react-dom/client'
import { HashRouter, BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import { useRoutes } from 'react-router'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'
import 'antd/dist/reset.css'
import { Index } from './pages/Home/index'
import { RouterConfig } from './router'

import store from './state/index'
import { Provider } from 'react-redux'
dayjs.locale('zh-cn')

const RenderRouter = () => {
  const ele = useRoutes(RouterConfig)

  return ele
}

function RouteElement() {
  const element = useRoutes(RouterConfig)
  return element
}

import '@/styles/index.css'

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ConfigProvider locale={zhCN}>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
          </Provider>
        </ConfigProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
