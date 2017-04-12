Fliplet.FormBuilder.field('textarea', {
  name: 'Multi-line text',
  category: 'Foo',
  props: {
    placeholder: {
      type: String
    },
    rows: {
      type: Number,
      default: 2
    }
  }
});