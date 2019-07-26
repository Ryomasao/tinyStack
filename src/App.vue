<template>
  <div class="main" data-testid="app">
    <div class="controller">
      <Controller
        :registers="registers"
        @push="value => push(value)"
        @pop="value => pop(value)"
        @mov="value => mov(value)"
        @add="value => add(value)"
      />
    </div>
    <div class="viewer">
      <Viewer :stack="stack" :registers="registers" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Controller from './components/Controller.vue'
import Viewer from './components/Viewer.vue'

// stmt = operand dist, src || push|pop src
// src = number|RAX, RDI

export default {
  components: {
    Controller,
    Viewer
  },
  computed: mapState(['stack', 'registers']),
  methods: mapActions(['push', 'pop', 'mov', 'add'])
}
</script>

<style lang="less">
body {
  font-family: 'IBM Plex Sans', sans-serif;
  background: #222222;
  //color: #0dff92;
  color: #aaaaaa;

  // reset defaut style
  p {
    margin: 0;
    padding: 0;
  }
}
</style>

<style lang="less" scoped>
.main {
  padding: 10px;
  display: flex;
}

.controller {
  width: 50%;
  font-size: 1.2rem;
}

.viewer {
  width: 50%;
}

.registers {
  display: flex;
  flex-wrap: wrap;
}
</style>
