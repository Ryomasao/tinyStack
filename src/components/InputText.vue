<template>
  <input
    type="text"
    @input="e => $emit('input', e.target.value)"
    :value="value"
    class="input"
    :maxlength="maxlenght"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: 'Input',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.input {
  padding: 1rem 2rem;
  outline: 0;
  background: #222222;
  border: 5px solid #aaaaaa;
  -webkit-appearance: none;
  font-size: 2rem;
  color: #aaaaaa;
}
</style>
