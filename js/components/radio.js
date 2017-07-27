Fliplet.FormBuilder.field('radio', {
  name: 'Single choice',
  category: 'Multiple choice',
  props: {
    fieldType: {
      type: String,
      default: 'radio'
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
