<template>
  <div class="main" data-testid="app">
    <div class="controller">
      <div class="row">
        <textarea v-model="code" />
        <button @click="exec">exec</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="source value"
          maxlength="8"
          v-model="pushValue"
        />
        <button @click="push">push</button>
        <button @click="pop">pop</button>
        <button @click="mov">mov</button>
        <select @change="changeDist" :value="dist">
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
import { mapState } from 'vuex'

import Stack from './components/Stack.vue'
import Register from './components/Register.vue'

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
      pushValue: ''
    }
  },
  computed: {
    ...mapState(['stack', 'registers', 'dist'])
  },
  methods: {
    exec() {
      //const lines = this.code.split('\n')
    },
    push() {
      this.$store.commit('push', this.pushValue)
    },
    pop() {
      this.$store.commit('pop')
    },
    changeDist(e) {
      this.$store.commit('changeDist', e.target.value)
    },
    mov() {
      this.$store.commit('mov', this.pushValue)
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
