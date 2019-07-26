<template>
  <div>
    <input
      type="radio"
      class="input"
      :id="id"
      :name="groupName"
      :value="value"
      :checked="value === checkedValue"
      @change="e => $emit('change', e)"
    />
    <label class="circle-button" :for="id">
      <div class="circle">
        <div class="inner-circle" />
      </div>
      <span class="title"> <slot /></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'RadioButton',
  props: {
    groupName: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    checkedValue: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.input {
  display: none;
}

input[type='radio']:checked + .circle-button {
  .circle {
    color: #0dff92;
    border-color: #0dff92;
  }

  .inner-circle {
    color: #0dff92;
    background: #0dff92;
  }
}

.circle-button {
  display: flex;
  align-items: center;
  transition: all 0.3s;

  :hover {
    transition: all 0.3s;
    border-color: #ffffff;
  }
}

.circle {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid;
  border-radius: 50%;
  width: 25px;
  height: 25px;

  border-color: #aaaaaa;
  background: #222222;
}

.inner-circle {
  border-radius: 50%;
  width: 15px;
  height: 15px;
  color: #0dff92;
  background: #222222;

  transition: all 0.3s;
}

.title {
  margin-left: 5px;
}
</style>
