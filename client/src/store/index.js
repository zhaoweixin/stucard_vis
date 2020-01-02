import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    costmatrix: null,
    hallcondition: 'hall_weekday', // 食堂情况 hall_weekday hall_weekend
    frequentpattern: null,
    cluster: null,
    patterncluster: null, // all -1 监听频繁模式中的种类
    major_sex: 0,
    nowmajor: null, 
    items: 1, // 1, 2, 3 监听频繁模式的item
    countsum: null, // 食堂情况 1 count 2 sum
    
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
    },
    items(state, msg){
      // 1, 2, 3
      //console.log('commit items', msg)
      state.items = msg
    },
    patterncluster(state, msg){
      state.patterncluster = msg
    },
    countsum(state, msg){
      state.countsum = msg
    }
  },
  actions: {
  },
  modules: {
  }
})
