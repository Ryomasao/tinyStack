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
    registers
  },
  mutations: {
    push: ({ stack }, value) => stack.push(value),
    pop: ({ stack, registers }, name) => {
      registers[name] = stack.pop()
    }
  },
  actions: {},
  getters: {}
})
