<template>
  <div class="main" data-testid="app">
    <div class="controller">
      <!--
      <div>
        <textarea v-model="code" />
        <button @click="exec">exec</button>
      </div>
      -->
      <div>
        <Mnemonic name="push" :registers="registers" @exec="push" />
        <Mnemonic name="pop" :registers="registers" @exec="pop" />
        <Mnemonic name="mov" :registers="registers" @exec="mov" />
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
import SelectRegister from './components/SelectRegister.vue'
import Mnemonic from './components/Mnemonic.vue'

// stmt = operand dist, src || push|pop src
// src = number|RAX, RDI

export default {
  components: {
    Stack,
    Register,
    SelectRegister,
    Mnemonic
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
    push(value) {
      this.$store.dispatch('push', value)
    },
    pop(value) {
      this.$store.dispatch('pop', value)
    },
    mov(value) {
      this.$store.dispatch('mov', value)
    },
    add() {}
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
  flex-wrap: wrap;
}
</style>
