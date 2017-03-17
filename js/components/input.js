Fliplet.FormBuilder.field('input', {
  name: 'Text field',
  template: Fliplet.Widget.Templates['templates.components.input'](),
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: 'Sample'
    }
  }
});