Fliplet.FormBuilder.field('select', {
  template: [
    '<select v-model="value">',
    '<option v-for="option in options" v-bind:value="option.id" v-bind:disabled="option.disabled">',
    '{{ option.name }}',
    '</option>',
    '</select>'
  ].join(''),
  props: {
    options: {
      type: Array,
      default: [{ id: '', name: 'Sample value', disabled: true }]
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