Fliplet.FormBuilder.field('textarea', {
  name: 'Multi-line text',
  category: 'Text inputs',
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
