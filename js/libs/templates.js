var systemTemplates = [{
    id: 1,
    settings: {
      displayName: 'Blank',
      fields: [{
          _type: 'flInput',
          name: 'field-1',
          label: 'Text input'
        },
        {
          _type: 'flButtons',
          name: 'field-2',
          _submit: false
        }
      ]
    }
  },
  {
    id: 2,
    settings: {
      displayName: 'Enquiry',
      fields: [{
          _type: 'flInput',
          name: 'field-1',
          label: 'Name'
        },
        {
          _type: 'flEmail',
          name: 'field-2',
          label: 'Email address'
        },
        {
          _type: 'flSelect',
          name: 'field-3',
          label: 'Type of Enquiry',
          options: [{
              id: 'Support'
            },
            {
              id: 'Feedback'
            }
          ]
        },
        {
          _type: 'flTextarea',
          name: 'field-4',
          label: 'Message'
        },
        {
          _type: 'flButtons',
          name: 'field-5',
          _submit: false
        }
      ]
    }
  }
];

Fliplet.FormBuilder.templates = function() {
  var operation = Fliplet.Env.get('development') ?
    Promise.resolve([]) :
    Fliplet.API.request({
      url: [
        'v1/widget-instances',
        '?organizationId=' + Fliplet.Env.get('organizationId'),
        '&package=com.fliplet.form-builder',
        '&where=' + encodeURIComponent(JSON.stringify({
          $contains: {
            template: true
          },
          name: {
            $ne: null
          }
        }))
      ].join('')
    }).then(function(response) {
      response.widgetInstances.forEach(function(instance) {
        instance.settings.displayName = instance.settings.name + ' (Organization template)'
      });
      return Promise.resolve(response.widgetInstances);
    });

  return operation.then(function(organizationTemplates) {
    return Promise.resolve(systemTemplates.concat(organizationTemplates));
  })
};
