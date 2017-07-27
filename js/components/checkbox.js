Fliplet.FormBuilder.field('checkbox', {
  name: 'Multiple choice',
  category: 'Multiple choice',
  props: {
    value: {
      type: Array,
      default: []
    },
    fieldType: {
      type: String,
      default: 'checkbox'
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
  }
});
