Fliplet.FormBuilder.field('clear', {
  name: 'Clear button',
  category: 'Buttons',
  submit: false,
  props: {
    label: undefined,
    value: {
      type: String,
      default: 'Clear'
    },
    buttonType: {
      type: String,
      default: 'reset'
    }
  }
});
