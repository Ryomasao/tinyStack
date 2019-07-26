<template>
  <div>
    <div v-if="hasSrc">
      <label>
        <input
          type="radio"
          :name="`src-type-${name}`"
          value="data"
          v-model="form.srcType"
        />
        data
      </label>
      <label>
        <input
          type="radio"
          :name="`src-type-${name}`"
          value="register"
          v-model="form.srcType"
        />
        regsiter
      </label>
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
    SelectRegister
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
