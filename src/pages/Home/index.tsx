import { useDispatch, useSelector } from 'react-redux'

import { updateTab, useHomeHook } from '../../state/home/index'

import { useAppDispatch } from '../../state/index'
export const Index = () => {
  const dispatch = useDispatch()
  const { activeTab, tabs } = useHomeHook()

  const handleClick = () => {
    dispatch(updateTab(activeTab == 'unNormal' ? 'normal' : 'unNormal'))

    console.log('%c === Log Log state home ===', 'color: blue', activeTab)
  }
  return (
    <div onClick={handleClick}>
      <p>Home Page</p>
      <p>{activeTab}</p>
    </div>
  )
}
