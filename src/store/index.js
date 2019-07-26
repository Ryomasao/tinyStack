import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const registers = ['rax', 'rdi', 'rbp', 'rsp'].reduce((result, current) => {
  result[current] = ''
  return result
}, {})

export default new Vuex.Store({
  state: {
    stack: [],
    dist: 'rax',
    registers
  },
  mutations: {
    push: ({ stack }, value) => stack.push(value),
    pop: ({ stack, registers }, registerName) =>
      (registers[registerName] = stack.pop()),
    mov: ({ registers }, payload) => (registers[payload.dist] = payload.src)
  },
  // コンポーネントからmutationに直接commitは発行できるみたい。ただ、非同期処理が入ると厄介なので
  // component→actions→mutationsという流れにしとく
  actions: {
    push({ commit, getters }, value) {
      // push 1 のパターン
      if (value.srcType == 'data') {
        commit('push', value.srcValue)
        return
      }
      // push rax のパターン
      commit('push', getters.getRegisterValue(value.registerName))
    },
    pop({ commit }, value) {
      // pop rax のパターン
      commit('pop', value.selectedDistRegister)
    },
    mov({ commit, getters }, value) {
      // mov rax, 1 のパターン
      if (value.srcType == 'data') {
        commit('mov', {
          src: value.srcValue,
          dist: value.selectedDistRegister
        })
        return
      }
      // push rax, rdi のパターン
      commit('mov', {
        src: getters.getRegisterValue(value.selectedSrcRegister),
        dist: value.selectedDistRegister
      })
    }
  },
  getters: {
    getRegisterValue: state => registerName => state.registers[registerName]
  }
})
