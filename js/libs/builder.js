var data = Fliplet.Widget.getData() || {};

Vue.directive('sortable', {
  inserted: function (el, binding) {
    if (Sortable) {
      new Sortable(el, binding.value || {})
    }
  }
});

function generateFormDefaults(data) {
  return _.assign({
    name: 'New form',
    dataSourceId: '',
    templateId: '',
    submitLabel: 'Submit',
    fields: [],
    resultHtml: Fliplet.Widget.Templates['templates.configurations.form-result']()
  }, data);
}

var selector = '#app';

var app = new Vue({
  el: selector,
  data: function () {
    var formSettings = generateFormDefaults(data);

    return {
      formFields: Fliplet.FormBuilder.fields(),
      fields: formSettings.fields,
      activeFieldId: null,
      activeFieldConfigType: null,
      activeField: {},
      dataSources: [],
      settings: formSettings,
      templates: [],
      chooseTemplate: !formSettings.templateId
    }
  },
  methods: {
    onSort: function (event) {
      this.fields.splice(event.newIndex, 0, this.fields.splice(event.oldIndex, 1)[0]);
      this.$forceUpdate();
    },
    onAdd: function (event) {
      event.item.remove();
      this.addField(event.newIndex, event.oldIndex);
    },
    addField: function (insertAtIndex, componentIndex) {
      var componentName = Fliplet.FormBuilder.fields()[componentIndex];

      var value = Fliplet.FormBuilder.components()[componentName].props.value;

      this.fields.splice(insertAtIndex, 0, {
        _type: componentName,
        name: 'field-' + (this.fields.length + 1),
        value: value.default || value.type()
      });
      this.$forceUpdate();
    },
    deleteField: function (index) {
      this.fields.splice(index, 1);
      this.activeFieldConfigType = null;
    },
    onFieldClick: function (field) {
      this.activeFieldId = field.name;
      this.activeFieldConfigType = field._type.toString() + 'Config';
      this.activeField = field;
      this.$forceUpdate();
    },
    closeEdit: function () {
      this.activeFieldId = null;
      this.activeFieldConfigType = null;
      this.activeField = {};
    },
    onFieldSettingChanged: function (fieldData) {
      var $vm = this;
      Object.keys(fieldData).forEach(function (prop) {
        $vm.activeField[prop] = fieldData[prop];
      });
      this.closeEdit();
    },
    save: function () {
      return Fliplet.Widget.save(this.settings);
    }
  },
  watch: {
    'settings.templateId': function (newId) {
      Fliplet.Widget.toggleSaveButton(!!newId);

      var formTemplate = _.find(this.templates, function (template) {
        return template.id === newId;
      });

      var settings = formTemplate.settings;
      settings.templateId = formTemplate.id;

      Fliplet.Studio.emit('widget-info-label-update', { text: 'Selected template: ' + settings.name });

      this.settings = generateFormDefaults(settings);

      this.save().then(function () {
        Fliplet.Studio.emit('reload-widget-instance', Fliplet.Widget.getDefaultId());
      });
    }
  },
  created: function () {
    var $vm = this;

    Fliplet.FormBuilder.on('field-settings-changed', this.onFieldSettingChanged);

    Fliplet.DataSources.get().then(function (results) {
      $vm.dataSources = results;
      $(selector).removeClass('is-loading');
    });

    Fliplet.FormBuilder.templates().then(function (templates) {
      $vm.templates = templates;
    });
  },
  beforeDestroy: function () {
    Fliplet.FormBuilder.off('field-settings-changed', this.onFieldSettingChanged);
  },
  mounted: function () {
    var $vm = this;

    if (this.chooseTemplate) {
      Fliplet.Studio.emit('widget-save-label-update', { text: 'Next' });
      Fliplet.Widget.toggleSaveButton(false);
    } else {
      Fliplet.Studio.emit('widget-mode-wide');
    }

    Fliplet.Widget.onSaveRequest(function () {
      if ($vm.chooseTemplate) {
        if ($vm.settings.templateId) {
          $vm.chooseTemplate = false;
          Fliplet.Widget.toggleSaveButton(true);
          Fliplet.Studio.emit('widget-save-label-reset');
          Fliplet.Studio.emit('widget-info-label-update');
        }

        return;
      }

      // Save and close
      $vm.save().then(function () {
        Fliplet.Widget.complete();
      });
    });
  }
});