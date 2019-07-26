<template>
  <select @input="e => $emit('input', e.target.value)" :value="value">
    <option v-for="(option, key) in options" :key="key">{{ key }}</option>
  </select>
</template>

<script>
export default {
  name: 'SelectRegister',
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
