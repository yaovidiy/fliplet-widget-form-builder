Fliplet.FormBuilder = (function () {
  var fields = [];
  var components = {};

  function name(component) {
    return 'fl' + component.charAt(0).toUpperCase() + component.slice(1);
  }

  return {
    field: function (componentName, component) {
      componentName = name(componentName);
      components[componentName] = component;

      _.extend(component.props, {
        name: {
          type: String,
          required: true
        },
        label: {
          type: String,
          default: component.name || 'Label text'
        }
      });

      component.template = [
        '<div class="form-group">',
          '<label class="col-sm-12 control-label" v-bind:for="name">{{ label }}</label>',
          '<div class="col-sm-12">',
            component.template,
          '</div>',
        '</div>'
      ].join('');

      Vue.component(componentName, component);
    },
    fields: function () {
      return Object.keys(components);
    },
    configuration: function (componentName, configurationComponent) {
      componentName = name(componentName);
      var component = components[componentName];

      Vue.component(componentName + 'Config', _.assign({}, _.pick(component, [
        'props'
      ]), configurationComponent));
    }
  };
})();