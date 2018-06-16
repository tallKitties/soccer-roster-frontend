<template>
  <b-form-group :id="getGroupId">
    <b-form-input :id="getInputId"
                  type="text"
                  :placeholder="getPlaceholder"
                  :aria-label="label"
                  :name="getModelName"
                  :data-vv-as="label"
                  v-validate="'required'"
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
  name: 'form-text-input',
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
      type: String,
      required: true
    },

    label: {
      type: String,
      required: true
    },

    required: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    hasError () {
      return this.errors.has(this.getModelName)
    },

    isInvalid () {
      if (this.hasError) return 'is-invalid'
    },

    labelLC () {
      return this.label.toLowerCase()
    },

    getPlaceholder () {
      let ph = this.placeholder
      return !ph ? this.labelLC : ph
    },

    getLowerCaseId () {
      return (this.labelLC.replace(/\s+/g, '-'))
    },

    getGroupId () {
      if (this.groupId) {
        return this.groupId
      }
      let groupId = this.getLowerCaseId
      return (groupId + '-' + 'group')
    },

    getInputId () {
      if (this.inputId) {
        return this.inputId
      }
      let inputId = this.getLowerCaseId
      return (inputId + '-' + 'input')
    },

    getModelName () {
      return (this.labelLC.replace(/\s+/g, '_'))
    }
  }
}
</script>

<style scoped>

</style>
