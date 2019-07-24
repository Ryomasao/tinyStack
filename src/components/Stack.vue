<template>
  <ul class="stack">
    <div class="item-header">
      <div class="item-header__address">address</div>
      <div class="item-header__value">value</div>
    </div>
    <li class="item" v-for="(item, index) in items" :key="index">
      <div class="item__address">{{ paddingAddress(index) }}</div>
      <div class="item__value">{{ item }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    paddingAddress(address) {
      return address.toString().padStart(8, '0')
    }
  }
}
</script>

<style lang="less" scoped>
.stack {
  padding: 0;
  margin: 0;
  list-style: none;
  border: 1px solid black;
  width: 100%;
}

.item-header {
  display: flex;
  border-bottom: 1px solid black;

  &__address {
    width: 30%;
    padding-left: 5px;
  }
  &__value {
    width: 70%;
    text-align: center;
  }
}

.item {
  display: flex;
  border-bottom: 1px dashed black;

  &:last-of-type {
    border-bottom: 0;
  }

  &__address {
    width: 30%;
    padding-left: 5px;
  }
  &__value {
    width: 70%;
    text-align: right;
    padding-right: 5px;
  }
}
</style>
