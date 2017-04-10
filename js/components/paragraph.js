Fliplet.FormBuilder.field('paragraph', {
  name: 'Paragraph',
  props: {
    label: undefined,
    value: {
      type: String,
      default: 'Paragraph'
    }
  },
  computed: {
    htmlValue: function() {
      return this.value.replace(/\r?\n/g, '<br />');
    }
  }
});
