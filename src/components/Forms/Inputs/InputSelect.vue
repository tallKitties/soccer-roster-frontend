<template>
  <b-form-group :id="getGroupId">
    <b-form-select  :id="getInputId"
                    :options="options"
                    :placeholder="getPlaceholder"
                    :aria-label="label"
                    :name="getModelName"
                    :data-vv-as="label"
                    v-validate="rules"
                    :clas="isInvalid"
                    :value="value"
                    @input.native="$emit('input', $event.target.value)">
    </b-form-select>
    <p  v-show="hasError"
        class="text-danger">

        {{ errors.first(this.getModelName) }}
    </p>
  </b-form-group>
</template>

<script>
export default {
  name: 'form-select-field',
  data () {
    return {
      rules: this.getValidRules()
    }
  },

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

    options: {
      type: Array,
      required: true
    },

    label: {
      type: String,
      required: true
    },

    validations: {
      type: Object,
      default: null
    }
  },

  methods: {
    getValidRules () {
      let rules = this.validations || {}
      rules.required = true
      return rules
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
      return this.placeholder || this.labelLC
    },

    getLowerCaseId () {
      return this.labelLC.replace(/\s+/g, '-')
    },

    getGroupId () {
      return this.groupId || this.getLowerCaseId + '-' + 'group'
    },

    getInputId () {
      return this.inputId || this.getLowerCaseId + '-' + 'input'
    },

    getModelName () {
      return this.modelName || this.labelLC.replace(/\s+/g, '_')
    }
  }
}
</script>

<style scoped>

</style>
