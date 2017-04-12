Fliplet.FormBuilder.field('checkbox', {
  name: 'Select one or more',
  category: 'Foo',
  props: {
    value: {
      type: Array,
      default: []
    },
    options: {
      type: Array,
      default: [{
          id: 'Option 1'
        },
        {
          id: 'Option 2'
        }
      ]
    }
  }
});
