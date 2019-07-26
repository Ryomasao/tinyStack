<template>
  <span
    tabindex="0"
    role="button"
    class="button"
    @click="e => $emit('click', e)"
    ><slot
  /></span>
</template>

<style lang="less" scoped>
.button {
  padding: 1rem;
  border: 5px solid #0dff92;
  color: #0dff92;
  opacity: 0.8;
  border-radius: 10%;

  &:hover {
    opacity: 1;
  }
}
</style>
