import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  actions: {
    incrementAsync(context) {
      context.commit('increment')
    }
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  },
  getters: {
    getCountWithPadding: state => state.count.toString().padStart(8, '0')
  }
})
