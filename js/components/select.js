Fliplet.FormBuilder.field('select', {
  name: 'Select one',
  category: 'Foo',
  props: {
    options: {
      type: Array,
      default: [{
          id: 'Option 1'
        },
        {
          id: 'Option 2'
        }
      ]
    },
    source: {
      type: String
    },
    placeholder: {
      type: String,
      default: '-- Select one'
    }
  },
  mounted: function() {
    var $vm = this;

    if ($vm.source === 'dataSources') {
      Fliplet.DataSources.get().then(function(dataSources) {
        $vm.options = dataSources;
      })
    }
  }
});
