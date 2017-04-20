Fliplet.FormBuilder.field('submit', {
  name: 'Submit button',
  category: 'Buttons',
  submit: false,
  props: {
    label: undefined,
    value: {
      type: String,
      default: 'Submit'
    },
    buttonType: {
      type: String,
      default: 'submit'
    }
  }
});
