var systemTemplates = [{
    id: 1,
    settings: {
      displayName: 'Blank',
      fields: [{
          _type: 'flInput',
          name: 'text-input',
          label: 'Text input',
          type: 'text'
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
          name: 'name',
          label: 'Name',
          type: 'text'
        },
        {
          _type: 'flEmail',
          name: 'email-address',
          label: 'Email address',
          type: 'email'
        },
        {
          _type: 'flSelect',
          name: 'type-of-enquiry',
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
          name: 'message',
          label: 'Message'
        },
        {
          _type: 'flButtons',
          name: 'buttons',
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
