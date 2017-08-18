var systemTemplates = [{
    id: 1,
    settings: {
      displayName: 'Blank',
      fields: [{
          _type: 'flInput',
          name: 'Question 1',
          label: 'Enter your first question',
          type: 'text'
        },
        {
          _type: 'flButtons',
          name: 'buttons',
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
          name: 'Name',
          label: 'Name',
          type: 'text'
        },
        {
          _type: 'flEmail',
          name: 'Email address',
          label: 'Email address',
          type: 'email'
        },
        {
          _type: 'flSelect',
          name: 'Enquiry type',
          label: 'What is your enquiry about?',
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
          name: 'Message',
          label: 'How can we help you today?'
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
  var organizationId = Fliplet.Env.get('organizationId');

  var operation = Fliplet.Env.get('development') || !organizationId ?
    Promise.resolve([]) :
    Fliplet.API.request({
      url: [
        'v1/widget-instances',
        '?organizationId=' + organizationId,
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
