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
    verifyInput: function(event) {
      if (!event) {
        return;
      }

      var code = event.which ? event.which : event.keyCode;

      // Do not allow dot/comma characters if settings are not allowing decimals
      if ([188, 190].indexOf(code) !== -1) {
        if (parseInt(this.decimals, 10) === 0 || this.value.match(/\.,/)) {
          event.preventDefault();
        }

        return;
      }

      // Allow minus sign only as first character given the input
      // is allowing negative numbers.
      if (code === 189) {
        if (this.positiveOnly || this.value.length) {
          event.preventDefault();
        }

        return;
      }

      // Allow 0-9 numbers
      if (code >= 48 && code <= 57) {
        return true;
      }

      // Allow modifiers keys, delete, return and arrows
      if ([13, 16, 17, 18, 8, 37, 38, 39, 40, 91].indexOf(code) !== -1) {
        return;
      }

      // Don't allow other inputs
      event.preventDefault();
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
        ? '0'
        : ('0.' + _.times(this.decimals - 1, _.constant(0)).join('') + '1');
    }
  }
});
