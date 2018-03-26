Fliplet.FormBuilder.field('time', {
  name: 'Time picker',
  category: 'Text inputs',
  props: {
    placeholder: {
      type: String
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
    if (!this.value) {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();

      if(hours < 10) {
        hours = '0' + hours;
      }

      if(minutes < 10) {
        minutes = '0' + minutes;
      }

      this.updateValue(hours + ':' + minutes);
    }
  }
});
