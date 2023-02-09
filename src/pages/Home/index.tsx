import { useEffect, useMemo } from 'react'
import { updateTab, useHomeHook, fetchList, useAppDispatch } from '../../state/index'
import { useTranslation } from 'react-i18next'

import { Tabs, Typography } from 'antd'
import type { TabsProps } from 'antd'

import { Wallet as WalletComp } from './Wallet/index'

const { Title } = Typography
import './style.scss'

export const Index: React.FC = () => {
  const dispatch = useAppDispatch()

  const Wallet = useMemo(() => <WalletComp />, [])

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `钱包`,
      children: Wallet,
    },
    {
      key: '2',
      label: `通用`,
      children: ``,
    },
    {
      key: '3',
      label: `平台优惠中心`,
      children: ``,
    },
    {
      key: '5',
      label: `现金贷`,
      children: ``,
    },
    {
      key: '6',
      label: `信用卡`,
      children: ``,
    },
    {
      key: '7',
      label: `端外商户`,
      children: ``,
    },
    {
      key: '8',
      label: `Marketplace`,
      children: ``,
    },
    {
      key: '9',
      label: `其他`,
      children: ``,
    },
  ]

  const onChange = (val: string) => {}

  return (
    <div className="w-full h-full p-2">
      <div className="w-full">
        <Title level={3}>Mission System</Title>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  )
}
