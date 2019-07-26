<template>
  <div>
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
</template>

<script>
import Stack from './Stack.vue'
import Register from './Register.vue'

export default {
  props: {
    registers: {
      type: Object,
      default: () => ({})
    },
    stack: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Stack,
    Register
  }
}
</script>

<style lang="less" scoped>
.registers {
  display: flex;
  flex-wrap: wrap;
}
</style>
