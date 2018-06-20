<template>
  <b-form-group :id="groupId">
    <b-form-input :id="inputId"
                  type="email"
                  :placeholder="placeholder"
                  :aria-label="label"
                  :name="modelName"
                  :data-vv-as="label"
                  v-validate="'required|email'"
                  :class="isInvalid"
                  :value="value"
                  @input.native="$emit('input', $event.target.value)">
    </b-form-input>
    <p
      v-show="hasError"
      class="text-danger">

      {{ errors.first(this.getModelName) }}
    </p>
  </b-form-group>
</template>

<script>
export default {
  name: 'form-email-input',
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

    getPlaceholder () {
      if (!this.placeholder) this.placeholder = this.labelLC
    },

    getLowerCaseId () {
      return (this.labelLC.replace(/\s+/g, '-'))
    },

    getGroupId () {
      if (!this.groupId) {
        this.groupId = this.getLowerCaseId + '-' + 'group'
      }
    },

    getInputId () {
      if (!this.inputId) {
        this.inputId = this.getLowerCaseId + '-' + 'input'
      }
    },

    getModelName () {
      if (!this.modelName) {
        this.modelName = this.labelLC.replace(/\s+/g, '_')
      }
    }
  },

  computed: {
    hasError () {
      return this.errors.has(this.getModelName)
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
