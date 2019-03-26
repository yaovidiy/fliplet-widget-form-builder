var confirmationErrorMessage = 'The confirmation password does not match';

Fliplet.FormBuilder.field('password', {
  name: 'Password input',
  category: 'Text inputs',
  props: {
    placeholder: {
      type: String
    },
    hash: {
      type: Boolean,
      default: false
    },
    autogenerate: {
      type: Boolean,
      default: false
    },
    autogenerateLength: {
      type: Number,
      default: 10
    },
    confirm: {
      type: Boolean,
      default: false
    },
    valueConfirmation: {
      type: String
    },
    hasConfirmationError: {
      type: Boolean,
      default: false
    },
    saveProgress: {
      type: Boolean,
      default: false
    },
    populateOnUpdate: {
      type: Boolean,
      default: false
    },
    submitWhenFalsy: {
      type: Boolean,
      default: false
    }
  },
  created: function() {
    this.checkPasswordConfirmation();
  },
  mounted: function () {
    if (this.autogenerate && !this.value) {
      this.value = this.generateRandomPassword(this.autogenerateLength);
      this.updateValue();
    }
  },
  methods: {
    updateValue: function() {
      this.$emit('_input', this.name, this.value);
      this.checkPasswordConfirmation();
    },
    generateRandomPassword: function (length) {
      var alphabet = 'abcdefghijklmnopqrstuvwxyz!#$%&*-ABCDEFGHIJKLMNOP1234567890';
      var password = '';

      for (var x = 0; x < length; x++) {
        password += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      }

      return password;
    },
    checkPasswordConfirmation: function() {
      this.hasConfirmationError = this.confirm && (this.value || this.valueConfirmation) && this.valueConfirmation !== this.value;

      this.$emit('_error', this.name, this.hasConfirmationError ? confirmationErrorMessage : null);

      if (this.$refs.confirmPassword) {
        this.$refs.confirmPassword.setCustomValidity(this.hasConfirmationError ? confirmationErrorMessage : '');
      }
    }
  }
});
