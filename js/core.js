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
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String
        }
      });

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