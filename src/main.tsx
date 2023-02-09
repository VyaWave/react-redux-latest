import React from 'react'
import { ConfigProvider } from 'antd'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useRoutes } from 'react-router'
import zhCN from 'antd/locale/zh_CN'

import './common'
import { Index } from './pages/Home/index'
import { RouterConfig } from './router'
import store from './state/store'
import { Provider } from 'react-redux'

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
      <HashRouter>
        <ConfigProvider locale={zhCN}>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
          </Provider>
        </ConfigProvider>
      </HashRouter>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
