Fliplet.FormBuilder.field('input', {
  template: '<input type="text" v-model="value"/>',
  props: {
    value: {
      type: String,
      default: 'Sample'
    }
  }
});