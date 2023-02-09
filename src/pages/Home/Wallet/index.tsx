import { useEffect } from 'react'
import { updateTab, useHomeHook, fetchList, useAppDispatch } from '../../../state/index'
import { useTranslation } from 'react-i18next'

import { Tabs, Typography, Select, Card, Button } from 'antd'
import type { TabsProps } from 'antd'

import Cover from '../../../assets/cover.png'
const { Title } = Typography
import './style.scss'

export const Wallet: React.FC = () => {
  const dispatch = useAppDispatch()

  const onChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  const onSearch = (value: string) => {
    console.log('search:', value)
  }

  const renderSearch = () => {
    return (
      <div className="w-full">
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          size="middle"
          options={[
            {
              value: 'Wallet',
              label: 'Pull-in fission',
            },
          ]}
        />
      </div>
    )
  }

  const renderTPL = () => {
    const cards = [1, 2].map(it => {
      return (
        <Card className="mr-1" key={it} hoverable>
          <p>pull-in fission</p>
          <Title level={5}>Pix Key Register</Title>
          <div className="cover ">
            <img src={Cover} className="my-1 w-full" />
            <div className="tips shadow-2xl p-1">
              <p>引导用户进行Pix Key 注册</p>
              <p>ID: 32789</p>
            </div>
          </div>
          <div className="flex flex-row">
            <Button className="mr-1">New Activity</Button>
            <Button>Activity List</Button>
          </div>
        </Card>
      )
    })

    return <div className="flex flex-row py-1">{cards}</div>
  }

  return (
    <div className="w-full h-full wallet-container">
      {renderSearch()}
      {renderTPL()}
    </div>
  )
}
