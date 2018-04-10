Fliplet.FormBuilder.field('number', {
  name: 'Number input',
  category: 'Text inputs',
  props: {
    placeholder: {
      type: String
    },
    positiveOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pattern: function () {
      if (this.positiveOnly) {
        return '\\d*';
      }
    }
  }
});
