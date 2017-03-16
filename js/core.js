Fliplet.FormBuilder = (function () {
  var fields = [];

  return {
    field: function (componentName, component) {
      // capitalise and add "flForm" prefix
      componentName = 'flForm' + componentName.charAt(0).toUpperCase() + componentName.slice(1);

      Vue.component(componentName, component);
      fields.push(componentName);
    },
    fields: function () {
      return fields;
    }
  }
})();