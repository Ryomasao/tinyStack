<template>
  <div class="mnemonic">
    <div class="src" v-if="hasSrc">
      <div class="select-src">
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
      </div>
      <div class="input-src">
        <InputText
          placeholder="Input Value..."
          maxlength="8"
          v-model="form.srcValue"
          v-if="form.srcType === 'data'"
        />
        <SelectRegister
          :options="registers"
          v-model="form.selectedSrcRegister"
          v-else
        />
      </div>
    </div>
    <div class="dist" v-if="hasDist">
      <SelectRegister
        :options="registers"
        v-model="form.selectedDistRegister"
      />
    </div>
    <div class="exec">
      <Button @click="onClick">{{ name }}</Button>
    </div>
  </div>
</template>

<script>
import SelectRegister from './SelectRegister.vue'
import RadioButton from './RadioButton.vue'
import InputText from './InputText.vue'
import Button from './Button.vue'

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
    RadioButton,
    InputText,
    Button
  },
  computed: {
    // オペランドの名前から、Srcが必要かどうかを判断する
    hasSrc() {
      return ['mov', 'push', 'add'].includes(this.name)
    },
    // オペランドの名前から、Distが必要かどうかを判断する
    hasDist() {
      return ['mov', 'pop', 'add'].includes(this.name)
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
.mnemonic {
  display: flex;
  align-items: center;
}

.src {
  display: flex;
  align-items: center;
}

.select-src {
}

.input-src {
  margin-left: 10px;
}

.radio-wrapper {
  padding: 5px 0;
}

.dist {
  margin-left: 10px;
}

.exec {
  margin-left: 10px;
}
</style>
