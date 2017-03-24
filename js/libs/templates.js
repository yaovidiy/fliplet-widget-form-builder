var systemTemplates = [
  {
    id: 1,
    settings: {
      name: 'Sample form 1',
      fields: [
        {
          _type: 'flInput',
          label: 'Foo'
        }
      ]
    }
  },
  {
    id: 2,
    settings: {
      name: 'Sample form 2',
      fields: [
        {
          _type: 'flInput',
          label: 'Bar'
        },
        {
          _type: 'flSelect',
          options: [
            { id: 'Option 1' },
            { id: 'Option 2' }
          ]
        }
      ]
    }
  }
];

Fliplet.FormBuilder.templates = function () {
  return Promise.resolve(systemTemplates);
};