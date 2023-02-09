// raven 文档 http://book.intra.xiaojukeji.com/raven/guide/use.html#%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B
import raven from '@didi/raven'
import ravenPageViewPlugin from '@didi/raven/dist/plugins/pageview'
import ravenPerformancePlugin from '@didi/raven/dist/plugins/performance'
import ravenErrorPlugin from '@didi/raven/dist/plugins/error'
import ravenBlankObserverPlugin from '@didi/raven/dist/plugins/blankObserver'

import Storage from './storage'

export enum RavenEvents {
  pageVisited = 'fin_pope_page_view',
  requestSuccess = 'fin_pope_request_success',
  requestError = 'fin_pope_request_error',
  createByCopy = 'fin_pope_new_activity_from_copy',
  saveDraft = 'fin_pope_activity_save_draft',
  submitApprove = 'fin_pope_activity_save_and_submit',

  editBaseInfoOnCanvas = 'fin_pope_edit_base_info_on_canvas_btn_ck',
  continueEditByCache = 'fin_pope_continue_edit_by_cache_btn_ck',
  giveUpEditByCache = 'fin_pope_give_up_edit_by_cache_btn_ck',

  searchActivityBtnCk = 'fin_pope_search_activity',
  viewActivityOnListBtnCk = 'fin_pope_view_activity_on_list_btn_ck',
  editActivityOnListBtnCk = 'fin_pope_edit_activity_on_list_btn_ck',
  submitActivityOnListBtnCk = 'fin_pope_submit_activity_on_list_btn_ck',
  approveActivityOnListBtnCk = 'fin_pope_approve_activity_on_list_btn_ck',
  deleteActivityOnListBtnCk = 'fin_pope_delete_activity_on_list_btn_ck',
  recallActivityOnListBtnCk = 'fin_pope_recall_activity_on_list_btn_ck',
  viewEffectOnListBtnCk = 'fin_pope_view_activity_effect_on_list_btn_ck',
  finishActivityOnListBtnCk = 'fin_pope_finish_activity_on_list_btn_ck',
  pinTopOnListBtnCk = 'fin_pope_pin_activity_top_on_list_btn_ck',
  cancelPinTopOnListBtnCk = 'fin_pope_cancel_pin_activity_top_on_list_btn_ck',
  cancelExecOnListBtnCk = 'fin_pope_cancel_activity_exec_on_list_btn_ck',
  saveTPLOnListBtnCk = 'fin_pope_save_activity_tpl_on_list_btn_ck',
}

export enum OmegaEvents {
  recordCreateDuration = 'tech_canvas_activity_create_duration',
}

declare const window: any

raven
  .setConfig({
    appId: '1118',
    i18n: 'us',
    routerMode: 'hash',
  })
  .use(ravenErrorPlugin)
  .use(ravenPageViewPlugin)
  .use(ravenPerformancePlugin)
  .use(ravenBlankObserverPlugin, {
    domElem: 'app',
    waitingTime: 6000,
  })

window.$raven = raven

raven.setAttrs({
  location_country: Storage.getCountry() || '',
  username: Storage.getUsername() || '',
})

export default raven
