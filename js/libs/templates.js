var systemTemplates = [
  {
    id: 1,
    settings: {
      displayName: 'Sample form 1',
      fields: [
        {
          _type: 'flInput',
          name: 'field-1',
          label: 'Foo'
        }
      ]
    }
  },
  {
    id: 2,
    settings: {
      displayName: 'Sample form 2',
      fields: [
        {
          _type: 'flInput',
          name: 'field-1',
          label: 'Bar'
        },
        {
          _type: 'flSelect',
          name: 'field-2',
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
  var operation = Fliplet.Env.get('development')
    ? Promise.resolve([])
    : Fliplet.API.request({
        url: [
          'v1/widget-instances',
          '?organizationId=' + Fliplet.Env.get('organizationId'),
          '&package=com.fliplet.form-builder',
          '&where=' + encodeURIComponent(JSON.stringify({
            $contains: { template: true },
            name: { $ne: null }
          }))
        ].join('')
      }).then(function (response) {
        response.widgetInstances.forEach(function (instance) {
          instance.settings.displayName = instance.settings.name + ' (Organization template)'
        });
        return Promise.resolve(response.widgetInstances);
      });

  return operation.then(function (organizationTemplates) {
    return Promise.resolve(systemTemplates.concat(organizationTemplates));
  })
};