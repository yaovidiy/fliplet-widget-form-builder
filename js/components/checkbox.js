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
  }
});
