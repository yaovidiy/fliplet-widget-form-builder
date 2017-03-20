Fliplet.FormBuilder.field('radio', {
  name: 'Choose one',
  props: {
    options: {
      type: Array,
      default: [
        { id: '1', name: 'Option 1', disabled: true },
        { id: '2', name: 'Option 2', disabled: true }
      ]
    }
  }
});