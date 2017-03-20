Fliplet.FormBuilder.field('select', {
  name: 'Select field',
  props: {
    options: {
      type: Array,
      default: [{ id: '', name: 'Please select one', disabled: true }]
    },
    source: {
      type: String
    },
    value: {
      type: String,
      default: ''
    }
  },
  mounted: function () {
    var $vm = this;

    if ($vm.source === 'dataSources') {
      $vm.options = [{id: '', name: 'Please wait...', disabled: true }];
      Fliplet.DataSources.get().then(function (dataSources) {
        dataSources.unshift({ name: 'Select a data source', value: '', disabled: true });
        $vm.options = dataSources;
      })
    }
  }
});