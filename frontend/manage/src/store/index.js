import { createStore } from 'vuex'

export default createStore({
  state: {
    logState:false,
    administrator:'',
  },
  getters: {
  },
  mutations: {
    changeLogState(state,data){
      state.logState = data
    },
    setAdministrator(state,data){
      state.administrator = data
    }
  },
  actions: {
  },
  modules: {
  }
})
