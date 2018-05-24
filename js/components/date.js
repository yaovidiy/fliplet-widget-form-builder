var DATE_FORMAT = 'DD MMMM YYYY';

Fliplet.FormBuilder.field('date', {
  name: 'Date picker',
  category: 'Text inputs',
  props: {
    placeholder: {
      type: String
    }
  },
  computed: {
    isWeb: function() {
      return Fliplet.Env.get('platform') === 'web'
    }
  },
  methods: {
    updateValue: function(value) {
      if (value) {
        this.value = value;
      }
      this.$emit('_input', this.name, this.value);
    }
  },
  mounted: function() {
    var $vm = this;

    if (Fliplet.Env.get('platform') === 'web') {
      var $el = $(this.$el).find('input.date-picker').datepicker({
        format: "MM dd yyyy",
        todayHighlight: true,
        autoclose: true
      }).on('changeDate', function(e) {
        var value = moment(e.date).format(DATE_FORMAT);
        $vm.updateValue(value);
      });

      $el.datepicker('setDate', this.value || new Date());
    }

    if (!this.value) {
      // HTML5 date field wants YYYY-MM-DD format
      $vm.updateValue(moment().format('YYYY-MM-DD'));
    }
  }
});
