<template>
  <select
    class="input"
    @input="e => $emit('input', e.target.value)"
    :value="value"
  >
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

<style lang="less" scoped>
.input {
  padding: 1rem;
  font-size: 1.2rem;
  outline: 0;
  background: #222222;
  border: 5px solid #aaaaaa;
  -webkit-appearance: none;
  color: #aaaaaa;
  // TODO 親で指定できたほうがいい
  width: 200px;
}
</style>
