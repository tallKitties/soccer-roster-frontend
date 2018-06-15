<template>
  <b-form-group :id="getGroupId">
    <b-form-input :id="getInputId"
                  type="text"
                  :required="required"
                  :placeholder="getPlaceholder"
                  :aria-label="label"
                  :name="getModelName"
                  :data-vv-as="label"
                  v-validate="'required'"
                  :value="value"
                  @input.native="$emit('input', $event.target.value)">
    </b-form-input>
    <span
      v-show="errors.has(this.getModelName)"
      class="text-danger">

      {{ errors.first(this.getModelName) }}
    </span>
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
    },

    vValidateParams: {
      type: String,
      default: "'required'"
    }
  },

  computed: {
    labelLC: function () {
      return this.label.toLowerCase()
    },

    getPlaceholder: function () {
      let ph = this.placeholder
      return ph ? ph : this.labelLC
    },

    getLowerCaseId: function () {
      return (this.labelLC.replace(/\s+/g, '-'))
    },

    getGroupId: function () {
      if (this.groupId) {
        return this.groupId
      }
      let groupId = this.getLowerCaseId
      return (groupId + '-' + 'group')
    },

    getInputId: function () {
      if (this.inputId) {
        return this.inputId
      }
      let inputId = this.getLowerCaseId
      return (inputId + '-' + 'input')
    },

    getModelName: function () {
      return (this.labelLC.replace(/\s+/g, '_'))
    }
  }
}
</script>

<style scoped>

</style>
