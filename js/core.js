Fliplet.FormBuilder = (function () {
  var fields = [];
  var components = {};

  var templates = Fliplet.Widget.Templates;

  function name(component) {
    return 'fl' + component.charAt(0).toUpperCase() + component.slice(1);
  }

  return {
    field: function (componentName, component) {
      component.template = templates['templates.components.field']({
        template: templates['templates.components.' + componentName]()
      });

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

      Vue.component(componentName, component);
    },
    fields: function () {
      return Object.keys(components);
    },
    configuration: function (componentName, component) {
      if (!component) {
        component = {};
      }

      component.template = templates['templates.configurations.' + componentName]();
      componentName = name(componentName);

      // Extend from base component
      component = _.assign({}, _.pick(components[componentName], [
        'props'
      ]), component);

      Vue.component(componentName + 'Config', component);
    }
  };
})();