import { useSelector } from 'react-redux'
import { AppState } from '../index'

export function useHomeHook() {
  const state = useSelector<AppState, AppState['home']>(s => s.home)
  return {
    tabs: state.tabs,
    activeTab: state.activeTab,
    loading: state.loading,
    error: state.error,
  }
}
