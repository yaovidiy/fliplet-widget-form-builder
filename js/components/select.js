Fliplet.FormBuilder.field('select', {
  template: [
    '<select v-model="value">',
    '<option v-for="option in options" v-bind:value="option.id">',
    '{{ option.name }}',
    '</option>',
    '</select>'
  ].join(''),
  props: {
    options: {
      type: Array,
      default: [{ id: '', name: 'Sample 1' }, { id: '', name: 'Sample 2' }]
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
      Fliplet.DataSources.get().then(function (dataSources) {
        dataSources.unshift({ name: 'Select a data source', value: '' });
        $vm.options = dataSources;
      })
    }
  }
});