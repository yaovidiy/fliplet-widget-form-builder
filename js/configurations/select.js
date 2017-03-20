Fliplet.FormBuilder.configuration('select', {
  data: function () {
    return {
      optionsString: this.options.map(function (option) {
        return option.id || option.name;
      }).join('\r\n')
    }
  },
  methods: {
    setOptions: function (str) {
      this.options = str.split(/\r?\n/).map(function (s) {
        return { id: s.trim(), name: s };
      });

      console.log(this.options);
    }
  }
});