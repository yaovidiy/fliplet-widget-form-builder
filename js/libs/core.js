Fliplet.FormBuilder = (function () {
  var fields = [];
  var components = {};
  var eventHub = new Vue();

  var templates = Fliplet.Widget.Templates;

  function name(component) {
    return 'fl' + component.charAt(0).toUpperCase() + component.slice(1);
  }

  return {
    on: function (eventName, fn) {
      eventHub.$on(eventName, fn);
    },
    off: function (eventName, fn) {
      eventHub.$off(eventName, fn);
    },
    field: function (componentName, component) {
      if (!component.name) {
        throw new Error('The component name is required');
      }

      var template = templates['templates.components.' + componentName];

      if (!template) {
        throw new Error('A template for the ' + componentName + ' component has not been found');
      }

      if (!component.methods) {
        component.methods = {};
      }

      // Define method to emit the new input value on change
      if (!component.methods.updateValue) {
        component.methods.updateValue = function (value) {
          this.$emit('input', value);
        }
      }

      component.template = templates['templates.components.field']({
        template: template()
      });

      componentName = name(componentName);
      components[componentName] = component;

      // All fields have these properties
      component.props = _.assign({
        name: {
          type: String,
          required: true
        },
        label: {
          type: String,
          default: component.name || 'Label text'
        },
        value: {
          type: String
        },
        required: {
          type: Boolean,
          default: false
        }
      }, component.props);

      Vue.component(componentName, component);
    },
    fields: function () {
      return Object.keys(components);
    },
    configuration: function (componentName, component) {
      if (!component) {
        component = {};
      }

      var template = templates['templates.configurations.' + componentName];

      componentName = name(componentName);

      // Extend from base component
      component = _.assign({
        computed: {},
        methods: {}
      }, _.pick(components[componentName], [
        'props'
      ]), component);

      // On submit event
      component.methods._onSubmit = function () {
        var $vm = this;
        var data = {};

        Object.keys($vm.$props).forEach(function (prop) {
          data[prop] = $vm[prop];
        });

        eventHub.$emit('field-settings-changed', data);
      }

      if (!component.methods.onSubmit) {
        component.methods.onSubmit = component.methods._onSubmit;
      }

      var hasOptions = component.props.options && Array.isArray(component.props.options.type());

      // If options is an array, automatically deal with options
      if (hasOptions) {
        component.computed._options = function generateOptions () {
          return this.options.map(function (option) {
            return option.id;
          }).join('\r\n');
        };

        component.methods._setOptions = function setOptions (str) {
          this.options = _.compact(str.split(/\r?\n/).map(function (s) {
            return { id: s.trim() };
          }));
        };
      }

      component.template = templates['templates.configurations.form']({
        template: template && template() || '',
        hasOptions: hasOptions
      });

      Vue.component(componentName + 'Config', component);
    }
  };
})();