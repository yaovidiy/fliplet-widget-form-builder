Fliplet.FormBuilder.field('buttons', {
  name: 'Form buttons',
  category: 'Buttons',
  submit: false,
  props: {
    label: undefined,
    showSubmit: {
      type: Boolean,
      default: true
    },
    showClear: {
      type: Boolean,
      default: true
    },
    submitValue: {
      type: String,
      default: 'Submit'
    },
    clearValue: {
      type: String,
      default: 'Clear'
    },
    submitType: {
      type: String,
      default: 'submit'
    },
    clearType: {
      type: String,
      default: 'reset'
    },
    isOffline: {
      type: Boolean,
      default: false
    }
  },
  mounted: function() {
    var $vm = this;

    Fliplet.Navigator.onOnline(function() {
      $vm.isOffline = false;
    });

    Fliplet.Navigator.onOffline(function() {
      $vm.isOffline = true;
    });
  }
});
