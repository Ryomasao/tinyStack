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
    pop: ({ stack, registers, dist }) => {
      registers[dist] = stack.pop()
    },
    mov: ({ registers, dist }, payload) => (registers[dist] = payload),
    changeDist: (state, payload) => (state.dist = payload)
  },
  actions: {},
  getters: {}
})
