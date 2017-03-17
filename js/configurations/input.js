Fliplet.FormBuilder.configuration('input', {
  template: [
    '<div>',
    'Name: <input type="text" v-model="name" placeholder="Field name" /><br />',
    'Default value: <input type="text" v-model="value" placeholder="Default value" />',
    '<div>'
  ].join('')
});