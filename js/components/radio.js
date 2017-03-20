Fliplet.FormBuilder.field('radio', {
  name: 'Choose one',
  props: {
    options: {
      type: Array,
      default: [
        { id: 'Option 1' },
        { id: 'Option 2' }
      ]
    }
  }
});