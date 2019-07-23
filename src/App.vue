<template>
  <div>
    <h1 class="title">
      {{ name }}
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "tarou"
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.title {
  color: red;
}
</style>
