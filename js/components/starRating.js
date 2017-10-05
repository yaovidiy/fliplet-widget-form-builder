Fliplet.FormBuilder.field('starRating', {
  name: 'Star rating',
  category: 'Advanced',
  props: {
    values: {
      type: Array,
      default: [{
          id: '5'
        },
        {
          id: '4'
        },
        {
          id: '3'
        },
        {
          id: '2'
        },
        {
          id: '1'
        }
      ]
    }
  }
});
