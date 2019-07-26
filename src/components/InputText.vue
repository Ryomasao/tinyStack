<template>
  <input
    type="text"
    @input="e => $emit('input', e.target.value)"
    :value="value"
    class="input"
    :maxlength="maxlength"
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
  padding: 1rem;
  outline: 0;
  background: #222222;
  border: 5px solid #aaaaaa;
  -webkit-appearance: none;
  font-size: 1.2rem;
  color: #aaaaaa;
  // TODO 親で指定できたほうがいい
  width: 200px;
}
</style>
