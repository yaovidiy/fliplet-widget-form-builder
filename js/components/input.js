Fliplet.FormBuilder.field('input', {
  name: 'Text field',
  template: '<input class="form-control" type="text" v-model="value" v-bind:placeholder="placeholder" />',
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