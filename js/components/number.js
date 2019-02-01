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
    },
    decimals: {
      type: Number,
      default: 0
    }
  },
  computed: {
    pattern: function () {
      if (this.positiveOnly) {
        return '\\d*';
      }
    },
    min: function () {
      return this.positiveOnly ? '0' : '';
    },
    step: function () {
      return !this.decimals
        ? 'any'
        : ('0.' + _.times(this.decimals - 1, _.constant(0)).join('') + '1');
    }
  }
});
