import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    costmatrix: null,
    hallcondition: null,
    frequentpattern: null,
    cluster: null,
    major_sex: 0,
    nowmajor: null
  },
  mutations: {
    costmatrix(state, msg){
      state.costmatrix = msg
    },
    hallcondition(state, msg){
      state.hallcondition = msg
    },
    frequentpattern(state, msg){
      state.frequentpattern = msg
    },
    cluster(state, msg){
      state.cluster = msg
    },
    major_sex(state, msg){
      state.major_sex = msg
    },
    nowmajor(state, msg){
      state.nowmajor = msg
    }
  },
  actions: {
  },
  modules: {
  }
})
