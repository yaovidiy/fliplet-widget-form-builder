var data = Fliplet.Widget.getData() || {};

function changeSelectText() {
  setTimeout(function() {
    $(".hidden-select:not(.component .hidden-select)").each(function(element) {
      var selectedText = $(this).find('option:selected').text()
      $(this).parents('.select-proxy-display').find('.select-value-proxy').html(selectedText)
    })
  }, 1)
}

function attatchObservers() {
  var $accordion = $('#componentsAccordion')

  var recalculateHeight = function(obj) {
    var $panelHeading = $('.panel-heading')
    var tabsHeight = $panelHeading.outerHeight() * $panelHeading.length
    var borders = $panelHeading.length * 3
    var wrapperHeight = $('.components-list .form-html').innerHeight() - tabsHeight

    obj.children('.panel-body').height(wrapperHeight - borders)
    obj.children('.panel-body').fadeIn(250)
    obj.children('.panel-body').animate({
      scrollTop: 0
    }, 250)
  }

  recalculateHeight($('.panel-collapse'))

  $accordion.on('show.bs.collapse', '.panel-collapse', function() {
    recalculateHeight($(this))
  })

  $accordion.on('hide.bs.collapse', '.panel-collapse', function() {
    $(this).children('.panel-body').fadeOut(250)
  })
}

Vue.directive('sortable', {
  inserted: function(el, binding) {
    if (Sortable) {
      new Sortable(el, binding.value || {})
    }
  }
});

function generateFormDefaults(data) {
  return _.assign({
    name: '',
    dataSourceId: '',
    templateId: '',
    fields: [],
    resultHtml: Fliplet.Widget.Templates['templates.configurations.form-result']()
  }, data);
}

var selector = '#app';

var app = new Vue({
  el: selector,
  data: function() {
    var formSettings = generateFormDefaults(data);

    return {
      categories: Fliplet.FormBuilder.categories(),
      fields: formSettings.fields,
      activeFieldId: null,
      activeFieldConfigType: null,
      activeField: {},
      activeFieldName: '',
      isAddingFields: false,
      dataSources: [],
      section: 'form', // form or settings
      settings: formSettings,
      templates: [],
      chooseTemplate: !formSettings.templateId,
      toChangeTemplate: false,
      permissionToChange: false,
      newTemplate: ''
    }
  },
  methods: {
    setupCodeEditor() {
      this.resultEditor = CodeMirror.fromTextArea(this.$refs.resulthtml, {
        mode: 'htmlmixed',
        lineNumbers: true,
        autoRefresh: true,
        lineWrapping: true,
        viewportMargin: Infinity
      })

      this.resultEditor.on('change', () => {
        this.settings.resultHtml = this.resultEditor.getValue()
      })
    },
    onSort: function(event) {
      this.fields.splice(event.newIndex, 0, this.fields.splice(event.oldIndex, 1)[0]);
    },
    onAdd: function(event) {
      if (event.item.parentElement.className !== 'panel-body') {
        event.item.remove();
        this.addField(event.newIndex, event.oldIndex);
      }
    },
    addField: function(insertAtIndex, componentIndex) {
      var componentName = Fliplet.FormBuilder.fields()[componentIndex];

      var value = Fliplet.FormBuilder.components()[componentName].props.value;

      this.fields.splice(insertAtIndex, 0, {
        _type: componentName,
        name: 'field-' + (this.fields.length + 1),
        value: value.default || value.type()
      });
    },
    deleteField: function(index) {
      this.fields.splice(index, 1);
      this.activeFieldConfigType = null;
    },
    onFieldClick: function(field) {
      this.activeFieldId = field.name;
      this.activeFieldConfigType = field._type.toString() + 'Config';
      this.activeFieldName = Fliplet.FormBuilder.components()[field._type].name;
      this.activeField = field;
      changeSelectText()
      Fliplet.Studio.emit('widget-save-label-update');
      this.$forceUpdate();
    },
    closeEdit: function() {
      this.activeFieldId = null;
      this.activeFieldConfigType = null;
      this.activeField = {};
      Fliplet.Studio.emit('widget-save-label-reset');
    },
    onFieldSettingChanged: function(fieldData) {
      var $vm = this;
      Object.keys(fieldData).forEach(function(prop) {
        $vm.activeField[prop] = fieldData[prop];
      });
      this.closeEdit();
    },
    changeTemplate: function() {
      this.toChangeTemplate = true;
      Fliplet.Studio.emit('widget-mode', 'normal');

      if (this.toChangeTemplate) {
        Fliplet.Studio.emit('widget-save-label-update', {
          text: 'Update form template'
        });
        Fliplet.Widget.toggleSaveButton(false);
      }

      changeSelectText()
    },
    goBack: function() {
      this.toChangeTemplate = false;
      Fliplet.Studio.emit('widget-save-label-reset');
      Fliplet.Widget.toggleSaveButton(true);

      if (this.isAddingFields) {
        Fliplet.Studio.emit('widget-mode', 'wide');
      }

      setTimeout(() => {
        this.setupCodeEditor()
      }, 1)
    },
    createDataSource: function() {
      var $vm = this
      var name = prompt('Please type a name for your data source:');

      if (!name) {
        return;
      }

      Fliplet.DataSources.create({
        name: name,
        organizationId: Fliplet.Env.get('organizationId')
      }).then(function(d) {
        $vm.settings.dataSourceId = d.id
        changeSelectText()
      });
    },
    save: function() {
      return Fliplet.Widget.save(this.settings);
    }
  },
  watch: {
    'permissionToChange': function(newVal) {
      Fliplet.Widget.toggleSaveButton(newVal);
    },
    'isAddingFields': function(newVal) {
      if (newVal) {
        Fliplet.Studio.emit('widget-mode', 'wide');
        setTimeout(() => {
          attatchObservers()
        }, 1)
      } else {
        Fliplet.Studio.emit('widget-mode', 'normal');
      }
    },
    'settings.templateId': function(newId) {
      Fliplet.Widget.toggleSaveButton(!!newId);

      if (!newId) {
        return;
      }

      var formTemplate = _.find(this.templates, function(template) {
        return template.id === newId;
      });

      var settings = formTemplate.settings;
      settings.templateId = formTemplate.id;
      settings.name = this.settings.name;

      if (this.chooseTemplate) {
        Fliplet.Studio.emit('widget-info-label-update', {
          text: 'Previewing ' + settings.displayName
        });
      }

      this.settings = generateFormDefaults(settings);
      this.fields = this.settings.fields;

      this.save().then(function() {
        Fliplet.Studio.emit('reload-widget-instance', Fliplet.Widget.getDefaultId());
      });
    },
    'section': function(value) {
      if (value === 'settings') {
        changeSelectText()

        if (!this.resultEditor) {
          setTimeout(() => {
            this.setupCodeEditor()
          }, 1)
        } else {
          setTimeout(() => {
            this.resultEditor.refresh()
          }, 1)
        }

      }
    }
  },
  computed: {
    hasRequiredFields: function() {
      return this.fields.some(function(el) {
        return !!el.required;
      });
    }
  },
  created: function() {
    var $vm = this;

    Fliplet.FormBuilder.on('field-settings-changed', this.onFieldSettingChanged);

    Fliplet.DataSources.get().then(function(results) {
      $vm.dataSources = results;
      $(selector).removeClass('is-loading');
    });

    Fliplet.FormBuilder.templates().then(function(templates) {
      $vm.templates = templates;
    });
  },
  beforeDestroy: function() {
    Fliplet.FormBuilder.off('field-settings-changed', this.onFieldSettingChanged);
  },
  mounted: function() {
    var $vm = this;
    $vm.settings.name = $vm.settings.name || 'Untitled form';

    if (this.chooseTemplate) {
      Fliplet.Studio.emit('widget-save-label-update', {
        text: 'Next'
      });
      Fliplet.Widget.toggleSaveButton(false);
    }

    Fliplet.Widget.onSaveRequest(function() {
      if ($vm.chooseTemplate) {
        if ($vm.settings.templateId) {
          $vm.chooseTemplate = false;
          Fliplet.Widget.toggleSaveButton(true);
          Fliplet.Studio.emit('widget-save-label-reset');
          Fliplet.Studio.emit('widget-info-label-update');
        }

        return;
      }

      if ($vm.toChangeTemplate) {
        if ($vm.newTemplate) {
          $vm.toChangeTemplate = false;
          $vm.permissionToChange = false;
          $vm.settings.templateId = $vm.newTemplate;
          Fliplet.Studio.emit('widget-save-label-reset');
          Fliplet.Studio.emit('widget-info-label-update');
          setTimeout(() => {
            $vm.setupCodeEditor()
          }, 1)
        }

        return;
      }

      // Save and close
      $vm.save().then(function() {
        Fliplet.Widget.complete();
      });
    });
  }
});
