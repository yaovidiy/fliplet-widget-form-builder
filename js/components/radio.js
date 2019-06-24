Fliplet.FormBuilder.field('radio', {
  name: 'Radios (single-select)',
  category: 'Multiple options',
  props: {
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
  }
});
