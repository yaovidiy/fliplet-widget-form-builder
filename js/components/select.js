Fliplet.FormBuilder.field('select', {
  name: 'Select one',
  props: {
    options: {
      type: Array,
      default: []
    },
    source: {
      type: String
    },
    placeholder: {
      type: String,
      default: 'Select one'
    }
  },
  mounted: function () {
    var $vm = this;

    if ($vm.source === 'dataSources') {
      Fliplet.DataSources.get().then(function (dataSources) {
        $vm.options = dataSources;
      })
    }
  }
});