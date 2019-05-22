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
  methods: {
    updateValue: function () {
      var ensureNumberRx = new RegExp(
        this.positiveOnly ? '[^0-9\.,]' : '[^0-9\.,-]'
      , 'g');

      this.value = this.value.replace(ensureNumberRx, '');
      this.$emit('_input', this.name, this.value);
    }
  },
  computed: {
    inputType: function () {
      return this.positiveOnly ? 'number' : 'text';
    },
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
        ? '0'
        : ('0.' + _.times(this.decimals - 1, _.constant(0)).join('') + '1');
    }
  }
});
