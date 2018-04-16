Fliplet.FormBuilder.field('radio', {
  name: 'Single select',
  category: 'Multi-select',
  props: {
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
