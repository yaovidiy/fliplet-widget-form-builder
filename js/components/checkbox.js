Fliplet.FormBuilder.field('checkbox', {
  name: 'Multiple choice',
  category: 'Multiple choice',
  props: {
    value: {
      type: Array,
      default: []
    },
    options: {
      type: Array,
      default: [{
          id: 'Option 1'
        },
        {
          id: 'Option 2'
        }
      ]
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
