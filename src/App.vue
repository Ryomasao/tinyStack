<template>
  <div class="main" data-testid="app">
    <div class="controller">
      <div class="row">
        <textarea v-model="code" />
        <button @click="exec">exec</button>
      </div>
      <div>
        <button @click="push">push</button>
        <input
          type="text"
          v-model="pushValue"
          placeholder="enter value to push stack "
          maxlength="8"
        />
        <button @click="pop">pop</button>
        <select v-model="popTo">
          <option v-for="(value, key) in registers" :key="key">{{
            key
          }}</option>
        </select>
      </div>
    </div>
    <div class="viewer">
      <div class="registers">
        <Register
          v-for="(value, key) in registers"
          :key="key"
          :name="key"
          :value="value"
        />
      </div>
      <Stack :items="stack" />
    </div>
  </div>
</template>

<script>
import Stack from './components/Stack.vue'
import Register from './components/Register.vue'

const registers = ['rax', 'rdi', 'rbp', 'rsp'].reduce((result, current) => {
  result[current] = ''
  return result
}, {})

// stmt = operand dist, src || push|pop src
// src = number|RAX, RDI

export default {
  components: {
    Stack,
    Register
  },
  data() {
    return {
      code: '',
      stack: ['100', '200'],
      pushValue: '',
      popTo: 'rax',
      registers
    }
  },
  methods: {
    exec() {
      //const lines = this.code.split('\n')
    },
    push() {
      this.stack.push(this.pushValue)
    },
    pop() {
      this.registers[this.popTo] = this.stack.pop()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  padding: 10px;
  display: flex;
}

.controller {
  width: 50%;
}

.viewer {
  width: 50%;
}

.registers {
  display: flex;
}
</style>
