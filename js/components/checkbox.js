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
  created: function () {
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.updateValue(this.name, this.value)
    }
  }
});
