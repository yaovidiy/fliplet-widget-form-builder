Fliplet.FormBuilder = (function() {
  var fields = [];
  var components = {};
  var eventHub = new Vue();

  var templates = Fliplet.Widget.Templates;

  function name(component) {
    return 'fl' + component.charAt(0).toUpperCase() + component.slice(1);
  }

  return {
    on: function(eventName, fn) {
      eventHub.$on(eventName, fn);
    },
    off: function(eventName, fn) {
      eventHub.$off(eventName, fn);
    },
    emit: function(eventName, data) {
      eventHub.$emit(eventName, data);
    },
    components() {
      return components;
    },
    categories() {
      var categories = [];

      _.forIn(components, function(component, componentName) {
        var categoryName = component.category || 'Generic';
        var category = _.find(categories, {
          name: categoryName
        });
        var isExisting = !!category;

        if (!isExisting) {
          category = {
            name: categoryName,
            fields: []
          };
        }

        category.fields.push(componentName);

        if (!isExisting) {
          categories.push(category);
        }
      });

      return categories;
    },
    field: function(componentName, component) {
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
        component.methods.updateValue = function() {
          this.$emit('_input', this.name, this.value);
        }
      }

      // Define method to trigger the form reset from a children
      if (!component.methods.resetForm) {
        component.methods.resetForm = function() {
          this.$emit('_reset');
        }
      }

      if (!component.computed) {
        component.computed = {};
      }

      component.computed._isFormField = function() {
        return this.label !== undefined;
      };

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
          type: String,
          default: ''
        },
        required: {
          type: Boolean,
          default: false
        }
      }, component.props);

      Vue.component(componentName, component);
    },
    fields: function() {
      return Object.keys(components);
    },
    configuration: function(componentName, component) {
      if (!component) {
        component = {};
      }

      var template = templates['templates.configurations.' + componentName];

      componentName = name(componentName);

      // Extend from base component
      component = _.assign({
        computed: {},
        methods: {},
        props: {}
      }, _.pick(components[componentName], [
        'props', 'computed'
      ]), component);

      // On submit event
      component.methods._onSubmit = function() {
        var $vm = this;
        var data = {};

        Object.keys($vm.$props).forEach(function(prop) {
          data[prop] = $vm[prop];
        });

        eventHub.$emit('field-settings-changed', data);
      }

      if (!component.methods.onSubmit) {
        component.methods.onSubmit = component.methods._onSubmit;
      }

      component.methods._openFilePicker = function() {
        var $vm = this;

        var config = {
          selectedFiles: {},
          selectMultiple: false,
          type: 'folder'
        };

        window.currentProvider = Fliplet.Widget.open('com.fliplet.file-picker', {
          data: config,
          onEvent: function(e, data) {
            switch (e) {
              case 'widget-rendered':
                break;
              case 'widget-set-info':
                Fliplet.Studio.emit('widget-save-label-reset');
                Fliplet.Studio.emit('widget-save-label-update', {
                  text: 'Select'
                });
                Fliplet.Widget.toggleSaveButton(!!data.length);
                var msg = data.length ? data.length + ' folder selected' : 'no selected folders';
                Fliplet.Widget.info(msg);
                break;
              default:
                break;
            }
          }
        });

        window.currentProvider.then(function(result) {
          console.log(result);
          Fliplet.Widget.info('');
          Fliplet.Studio.emit('widget-save-label-update');
          $vm.mediaFolderId = result.data[0].id;
          window.currentProvider = null;
        });
      }

      if (!component.methods.openFilePicker) {
        component.methods.openFilePicker = component.methods._openFilePicker;
      }

      var hasOptions = component.props.options && Array.isArray(component.props.options.type());

      // If options is an array, automatically deal with options
      if (hasOptions) {
        component.computed._options = function generateOptions() {
          return this.options.map(function(option) {
            return option.id;
          }).join('\r\n');
        };

        component.methods._setOptions = function setOptions(str) {
          this.options = _.compact(str.split(/\r?\n/).map(function(s) {
            return {
              id: s.trim()
            };
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
