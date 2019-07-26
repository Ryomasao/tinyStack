<template>
  <div>
    <div v-if="hasSrc">
      <div class="radio-wrapper">
        <RadioButton
          :group-name="`mnemonic-${name}`"
          :id="`mnemonic-${name}-data`"
          value="data"
          :checkedValue="form.srcType"
          @change="e => (form.srcType = e.target.value)"
        >
          DATA
        </RadioButton>
      </div>
      <div class="radio-wrapper">
        <RadioButton
          :group-name="`mnemonic-${name}`"
          :id="`mnemonic-${name}-register`"
          value="register"
          :checkedValue="form.srcType"
          @change="e => (form.srcType = e.target.value)"
        >
          REGISTER
        </RadioButton>
      </div>
      <div v-if="form.srcType === 'data'">
        <input
          type="text"
          placeholder="source value"
          maxlength="8"
          v-model="form.srcValue"
        />
      </div>
      <div v-else>
        <SelectRegister
          :options="registers"
          v-model="form.selectedSrcRegister"
        />
      </div>
    </div>
    <div v-if="hasDist">
      <SelectRegister
        :options="registers"
        v-model="form.selectedDistRegister"
      />
    </div>
    <button @click="onClick">{{ name }}</button>
  </div>
</template>

<script>
import SelectRegister from './SelectRegister.vue'
import RadioButton from './RadioButton.vue'

export default {
  name: 'Mnemonic',
  props: {
    // オペランドの名前
    name: {
      type: String,
      default: ''
    },
    // レジスターの種類
    registers: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    SelectRegister,
    RadioButton
  },
  computed: {
    // オペランドの名前から、Srcが必要かどうかを判断する
    hasSrc() {
      return ['mov', 'push'].includes(this.name)
    },
    // オペランドの名前から、Distが必要かどうかを判断する
    hasDist() {
      return ['mov', 'pop'].includes(this.name)
    }
  },
  data() {
    return {
      form: {
        srcType: 'data',
        srcValue: '',
        selectedSrcRegister: 'rax',
        selectedDistRegister: 'rax'
      }
    }
  },
  methods: {
    onClick() {
      this.$emit('exec', this.form)
    }
  }
}
</script>

<style lang="less" scoped>
.radio-wrapper {
  padding: 5px 0;
}
</style>
