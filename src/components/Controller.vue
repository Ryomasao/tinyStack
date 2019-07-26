<template>
  <div>
    <Mnemonic
      class="mnemonic"
      name="push"
      :registers="registers"
      @exec="push"
    />
    <Mnemonic class="mnemonic" name="pop" :registers="registers" @exec="pop" />
    <Mnemonic class="mnemonic" name="mov" :registers="registers" @exec="mov" />
    <Mnemonic class="mnemonic" name="add" :registers="registers" @exec="add" />
  </div>
</template>

<script>
import Mnemonic from './Mnemonic.vue'

export default {
  props: {
    registers: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Mnemonic
  },
  methods: {
    push(value) {
      this.$emit('push', value)
    },
    pop(value) {
      this.$emit('pop', value)
    },
    mov(value) {
      this.$emit('mov', value)
    },
    add(value) {
      this.$emit('add', value)
    }
  }
}
</script>

<style lang="less" scoped>
.mnemonic {
  margin-bottom: 10px;
}
</style>
