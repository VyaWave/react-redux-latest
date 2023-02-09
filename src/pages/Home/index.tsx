import { updateTab, useHomeHook, fetchList } from '../../state/index'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../state/index'

import { useEffect } from 'react'
export const Index = () => {
  const dispatch = useAppDispatch()
  const { activeTab, tabs, loading, error } = useHomeHook()
  const { t, i18n } = useTranslation()

  const handleClick = () => {
    dispatch(fetchList({ page: 1, size: 10 }))
    i18n.changeLanguage(i18n.language == 'zh' ? 'en' : 'zh')
    const tab = activeTab == 'unNormal' ? 'normal' : 'unNormal'
    dispatch(
      updateTab({
        activeTab: tab,
      }),
    )

    console.log('%c === Log Log state home ===', 'color: blue', activeTab, i18n)
  }

  useEffect(() => {
    dispatch(fetchList({ page: 1, size: 10 }))
    console.log('%c === Log Log 222 ===', 'color: blue')
  }, [])

  console.log('%c === Log Log tabs ===', 'color: blue', tabs, loading)

  return (
    <div onClick={handleClick}>
      {loading ? <p>loading</p> : <p>loaded</p>}
      <p>Home Page</p>
      <p>{activeTab}</p>
      <p>{t('name')}</p>
    </div>
  )
}
