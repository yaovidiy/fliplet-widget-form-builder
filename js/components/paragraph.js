Fliplet.FormBuilder.field('paragraph', {
  name: 'Paragraph',
  props: {
    label: undefined,
    value: {
      type: String,
      default: 'Paragraph of text'
    }
  },
  computed: {
    htmlValue: function () {
      return this.value.replace(/\r?\n/g, '<br />');
    }
  }
});