<template>
  <b-form-group :id="groupId">
    <b-form-input :id="inputId"
                  type="number"
                  :placeholder="placeholder"
                  :aria-label="label"
                  :name="modelName"
                  :data-vv-as="label"
                  v-validate="'required|between:1,100'"
                  :class="isInvalid"
                  :value="value"
                  @input.native="$emit('input', $event.target.value)">
    </b-form-input>
    <p
      v-show="hasError"
      class="text-danger">

      {{ errors.first(this.modelName) }}
    </p>
  </b-form-group>
</template>

<script>
export default {
  name: 'form-number-input',
  inject: ['$validator'],
  props: {

    groupId: {
      type: String,
      default: null
    },

    inputId: {
      type: String,
      default: null
    },

    modelName: {
      type: String,
      default: null
    },

    placeholder: {
      type: String,
      default: null
    },

    value: {
      required: true
    },

    label: {
      type: String,
      required: true
    }
  },

  methods: {
    labelLC () {
      return this.label.toLowerCase()
    },

    setPlaceholder () {
      if (!this.placeholder) this.placeholder = this.labelLC
    },

    getLowerCaseId () {
      return (this.labelLC.replace(/\s+/g, '-'))
    },

    setGroupId () {
      if (!this.groupId) {
        this.groupId = this.getLowerCaseId + '-' + 'group'
      }
    },

    setInputId () {
      if (!this.inputId) {
        this.inputId = this.getLowerCaseId + '-' + 'input'
      }
    },

    setModelName () {
      if (!this.modelName) {
        this.modelName = this.labelLC.replace(/\s+/g, '_')
      }
    }
  },

  computed: {
    hasError () {
      return this.errors.has(this.modelName)
    },

    isInvalid () {
      if (this.hasError) return 'is-invalid'
    }
  },

  created () {
    this.setPlaceholder()
    this.setGroupId()
    this.setInputId()
    this.setModelName()
  }
}
</script>

<style scoped>

</style>
