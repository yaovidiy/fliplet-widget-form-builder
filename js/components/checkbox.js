Fliplet.FormBuilder.field('checkbox', {
  name: 'Checkboxes (multi-select)',
  category: 'Multiple options',
  props: {
    value: {
      type: Array,
      default: []
    },
    options: {
      type: Array,
      default: [
        {
          label: 'Option 1'
        },
        {
          label: 'Option 2'
        }
      ]
    }
  },
  methods: {
    updateValue: function () {
      var $vm = this;

      // Sort selected options by their index as a checkbox input option
      var ordered = _.sortBy(this.value, function (val) {
        return _.findIndex($vm.options, function (option) {
          return option.id === val;
        });
      });

      this.$emit('_input', this.name, ordered);
    }
  },
  computed: {
    isRequired: function () {
      return this.required && !this.value.length;
    }
  },
  created: function () {
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.updateValue(this.name, this.value);
    }
  }
});
