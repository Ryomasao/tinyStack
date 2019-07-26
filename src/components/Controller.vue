<template>
  <div>
    <Mnemonic name="push" :registers="registers" @exec="push" />
    <Mnemonic name="pop" :registers="registers" @exec="pop" />
    <Mnemonic name="mov" :registers="registers" @exec="mov" />
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
    add() {}
  }
}
</script>
