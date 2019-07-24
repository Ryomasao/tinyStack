<template>
  <div class="register">
    <p>{{ name }}</p>
    <div class="box">
      <span>{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  text-align: center;
  padding: 10px;

  p {
    margin: 0;
    padding: 0;
  }
}

.box {
  border: 1px solid black;
  width: 100px;
  height: 30px;
}
</style>
