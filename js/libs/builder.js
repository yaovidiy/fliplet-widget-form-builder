var widgetId = Fliplet.Widget.getDefaultId();
var data = Fliplet.Widget.getData(widgetId) || {};

// Cleanup
if (data.fields) {
  data.fields = _.compact(data.fields);
}

function changeSelectText() {
  setTimeout(function() {
    $('.hidden-select:not(.component .hidden-select)').each(function() {
      var selectedText = $(this).find('option:selected').text()
      if (selectedText !== '') {
        $(this).parents('.select-proxy-display').find('.select-value-proxy').html(selectedText)
      } else {
        $(this).parents('.select-proxy-display').find('.select-value-proxy').html('Select a data source')
      }
    })
  }, 1)
}

function attachObservers() {
  var $accordion = $('#componentsAccordion')

  var recalculateHeight = function(obj) {
    var $panelHeading = $('.panel-heading')
    var tabsHeight = $panelHeading.outerHeight() * $panelHeading.length
    var borders = $panelHeading.length * 3
    var wrapperHeight = $('.components-list .form-html').innerHeight() - tabsHeight

    obj.children('.panel-body').css('height', wrapperHeight - borders)
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
    offline: true,
    redirect: false,
    onSubmit: ['dataSource'],
    saveProgress: true,
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
      newTemplate: '',
      redirect: formSettings.redirect,
      toggleTemplatedEmail: formSettings.onSubmit.indexOf('templatedEmail') > -1,
      toggleGenerateEmail: formSettings.onSubmit.indexOf('generateEmail') > -1,
      showDataSource: formSettings.onSubmit.indexOf('templatedEmail') > -1 || formSettings.onSubmit.indexOf('dataSource') > -1,
      userData: {},
      defaultEmailSettings: {
        subject: '',
        html: '',
        to: []
      },
      defaultEmailSettingsForCompose: {
        subject: '',
        html: '',
        to: []
      },
      emailTemplate: undefined,
      generateEmailTemplate: undefined
    }
  },
  methods: {
    setupCodeEditor: function() {
      this.resultEditor = CodeMirror.fromTextArea(this.$refs.resulthtml, {
        mode: 'htmlmixed',
        lineNumbers: true,
        autoRefresh: true,
        lineWrapping: true,
        viewportMargin: Infinity
      });

      this.resultEditor.on('change', function() {
        this.settings.resultHtml = this.resultEditor.getValue();
      });
    },
    onSort: function(event) {
      this.fields.splice(event.newIndex, 0, this.fields.splice(event.oldIndex, 1)[0]);
    },
    onAdd: function(event) {
      var componentName;
      var component;
      var value;

      if (event.item.parentElement.className !== 'panel-body') {
        componentName = event.item.dataset.field;
        component = Fliplet.FormBuilder.components()[componentName];
        value = component.props.value;

        event.item.remove();

        this.fields.splice(event.newIndex, 0, {
          _type: componentName,
          _submit: typeof component.submit !== 'undefined' ? component.submit : true,
          name: 'field-' + (this.fields.length + 1),
          label: component.name,
          value: value.default || value.type()
        });
      }
    },
    deleteField: function(index) {
      this.fields.splice(index, 1);
      this.activeFieldConfigType = null;
    },
    onFieldClick: function(field) {
      this.activeFieldConfigType = field._type.toString() + 'Config';
      this.activeFieldName = Fliplet.FormBuilder.components()[field._type].name;
      this.activeField = field;
      changeSelectText();
      Fliplet.Studio.emit('widget-save-label-update');
      this.$forceUpdate();
    },
    closeEdit: function() {
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

      changeSelectText();
    },
    goBack: function() {
      var $vm = this;
      this.toChangeTemplate = false;
      Fliplet.Studio.emit('widget-save-label-reset');
      Fliplet.Widget.toggleSaveButton(true);

      if (this.isAddingFields) {
        Fliplet.Studio.emit('widget-mode', 'wide');
      }

      setTimeout(function() {
        $vm.setupCodeEditor();
      }, 1);
    },
    createDataSource: function() {
      var $vm = this;
      var name = prompt('Please type a name for your data source:');

      if (!name) {
        return;
      }

      Fliplet.DataSources.create({
        name: name,
        organizationId: Fliplet.Env.get('organizationId')
      }).then(function(ds) {
        $vm.dataSources.push(ds);
        $vm.settings.dataSourceId = ds.id;
      });
    },
    save: function() {
      if (this.settings.onSubmit.indexOf('templatedEmail') > -1) {
        this.settings.emailTemplate = this.emailTemplate || this.defaultEmailSettings;
      }
      if (this.settings.onSubmit.indexOf('generateEmail') > -1) {
        this.settings.generateEmailTemplate = this.generateEmailTemplate || this.defaultEmailSettingsForCompose;
      }

      // Cleanup
      this.settings.fields = _.compact(this.fields);

      return Fliplet.Widget.save(this.settings);
    },
    createDefaultBodyTemplate: function(fields) {
      // Creates default email template
      var defaultEmailTemplate = '<h1>' + this.settings.name + '</h1><p>A form submission has been received.</p>';
      defaultEmailTemplate += '<ul>';

      fields.forEach(function(field) {
        if (typeof field._submit === 'undefined' || field._submit) {
          defaultEmailTemplate += '<li style="line-height: 24px;">' + field.label + ': {{' + field.name + '}}</li>';
        }
      });
      defaultEmailTemplate += '</ul>';

      return defaultEmailTemplate;
    },
    configureEmailTemplate: function() {
      var $vm = this;
      var emailProviderData = ($vm.settings && $vm.settings.emailTemplate) || $vm.defaultEmailSettings;

      emailProviderData.options = {
        usage: {
          'field-x': 'Insert the value entered in the form field.<br><i>To see the ID of each form field, click to edit the field and the ID can be seen at the top right corner.</i>',
          appName: 'Insert your app name',
          organisationName: 'Insert your organisation name'
        }
      };

      window.emailTemplateProvider = Fliplet.Widget.open('com.fliplet.email-provider', {
        data: emailProviderData
      });

      window.emailTemplateProvider.then(function onForwardEmailProvider(result) {
        window.emailTemplateProvider = null;
        $vm.emailTemplate = result.data;

        if ($vm.settings.onSubmit.indexOf('dataSource') > -1 || $vm.settings.dataSourceId) {
          var newHook = {
            widgetInstanceId: $vm.settings.id,
            runOn: ['insert', 'update'],
            type: 'email',
            payload: $vm.settings.emailTemplate
          };

          Fliplet.DataSources.getById($vm.settings.dataSourceId).then(function(dataSource) {
            if (dataSource.hooks.length) {
              // Update existing hook
              var currentHook = _.find(dataSource.hooks, function(o) {
                return o.widgetInstanceId == $vm.settings.id;
              });

              currentHook.payload = $vm.settings.emailTemplate;

              var index = _.findIndex(dataSource.hooks, function(o) {
                return o.widgetInstanceId == $vm.settings.id;
              });
              dataSource.hooks.splice(index, 1, currentHook);

              Fliplet.DataSources.update($vm.settings.dataSourceId, {
                hooks: dataSource.hooks
              });
            } else {
              // Add new hook
              dataSource.hooks.push(newHook);
              Fliplet.DataSources.update($vm.settings.dataSourceId, {
                hooks: dataSource.hooks
              });
            }
          });
        }

        $vm.save().then(function() {
          Fliplet.Studio.emit('reload-widget-instance', Fliplet.Widget.getDefaultId());
        });
        Fliplet.Widget.autosize();
      });
    },
    configureEmailTemplateForCompose: function() {
      var $vm = this;
      var emailProviderData = ($vm.settings && $vm.settings.generateEmailTemplate) || $vm.defaultEmailSettingsForCompose;

      emailProviderData.options = {
        usage: {
          'field-x': 'Insert the value entered in the form field.<br><i>To see the ID of each form field, click to edit the field and the ID can be seen at the top right corner.</i>',
          appName: 'Insert your app name',
          organisationName: 'Insert your organisation name'
        }
      };

      window.generateEmailProvider = Fliplet.Widget.open('com.fliplet.email-provider', {
        data: emailProviderData
      });

      window.generateEmailProvider.then(function onForwardEmailProvider(result) {
        window.generateEmailProvider = null;
        $vm.generateEmailTemplate = result.data;
        $vm.save().then(function() {
          Fliplet.Studio.emit('reload-widget-instance', Fliplet.Widget.getDefaultId());
        });
        Fliplet.Widget.autosize();
      });
    },
    checkEmailTemplate: function() {
      if (!this.settings.emailTemplate) {
        this.defaultEmailSettings.subject = 'Form entries from "' + this.settings.name + '" form';
        this.defaultEmailSettings.html = this.createDefaultBodyTemplate(this.fields);
      }
    },
    checkGenerateEmailTemplate: function() {
      if (!this.settings.generateEmailTemplate) {
        this.defaultEmailSettingsForCompose.subject = 'Form entries from "' + this.settings.name + '" form';
        this.defaultEmailSettingsForCompose.html = this.createDefaultBodyTemplate(this.fields);
      }
    }
  },
  watch: {
    'dataSources': function(newVal) {
      changeSelectText();
    },
    'permissionToChange': function(newVal) {
      Fliplet.Widget.toggleSaveButton(newVal);
    },
    'isAddingFields': function(newVal) {
      if (newVal) {
        Fliplet.Studio.emit('widget-mode', 'wide');
        setTimeout(function() {
          attachObservers();
        }, 1);
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
      var $vm = this;
      if (value === 'settings') {
        changeSelectText();

        if (!this.resultEditor) {
          setTimeout(function() {
            $vm.setupCodeEditor();
          }, 1);
        } else {
          setTimeout(function() {
            $vm.resultEditor.refresh();
          }, 1);
        }

      }
    },
    'settings.redirect': function(value) {
      var $vm = this;
      if (!value) {
        if (!$vm.resultEditor) {
          setTimeout(function() {
            $vm.setupCodeEditor();
          }, 1);
        } else {
          setTimeout(function() {
            $vm.resultEditor.refresh();
          }, 1);
        }
      }
    },
    'settings.onSubmit': function(array) {
      var $vm = this;
      this.showDataSource = array.indexOf('dataSource') > -1;

      if (array.indexOf('generateEmail') > -1) {
        this.toggleGenerateEmail = true
        this.checkGenerateEmailTemplate();
      } else {
        this.toggleGenerateEmail = false
      }

      if (array.indexOf('templatedEmail') > -1) {
        this.toggleTemplatedEmail = true;
        this.checkEmailTemplate();
      } else {
        this.toggleTemplatedEmail = false;
        // Remove hook
        if ($vm.settings.dataSourceId && $vm.settings.dataSourceId !== '') {
          Fliplet.DataSources.getById($vm.settings.dataSourceId).then(function(dataSource) {
            if (dataSource.hooks.length) {
              var index = _.findIndex(dataSource.hooks, function(o) {
                return o.widgetInstanceId == $vm.settings.id
              });
              dataSource.hooks.splice(index, 1);

              Fliplet.DataSources.update($vm.settings.dataSourceId, {
                hooks: dataSource.hooks
              });
            }
          });
        }
      }
    },
    'userData': function(data) {
      this.defaultEmailSettings.to.push({
        email: data.email,
        type: 'to'
      });
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

    Fliplet.DataSources.get({
      type: null
    }).then(function(results) {
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
    window.emailTemplateProvider = null;
    window.generateEmailProvider = null;
    var $vm = this;
    $vm.settings.name = $vm.settings.name || 'Untitled form';

    if (this.chooseTemplate) {
      Fliplet.Studio.emit('widget-save-label-update', {
        text: 'Next'
      });
      Fliplet.Widget.toggleSaveButton(false);
    }

    var linkProvider = Fliplet.Widget.open('com.fliplet.link', {
      selector: '#linkAction',
      data: $vm.settings && $vm.settings.linkAction
    });

    linkProvider.then(function onLinkAction(result) {
      if (result && result.data && result.data.action) {
        $vm.settings.linkAction = result.data;
      }

      linkProvider = null;
      triggerSave();
    });

    Fliplet.Widget.onSaveRequest(function() {
      if (window.emailTemplateProvider) {
        return window.emailTemplateProvider.forwardSaveRequest();
      }

      if (window.generateEmailProvider) {
        return window.generateEmailProvider.forwardSaveRequest();
      }

      if (window.currentProvider) {
        return window.currentProvider.forwardSaveRequest();
      }

      if (linkProvider) {
        return linkProvider.forwardSaveRequest();
      }

      triggerSave();
    });

    function triggerSave() {
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
          $vm.isAddingFields = false;
          $vm.toChangeTemplate = false;
          $vm.permissionToChange = false;
          $vm.settings.templateId = $vm.newTemplate;
          Fliplet.Studio.emit('widget-save-label-reset');
          Fliplet.Studio.emit('widget-info-label-update');
          setTimeout(function() {
            $vm.setupCodeEditor();
          }, 1);
        }

        return;
      }

      // Save and close
      $vm.save().then(function() {
        Fliplet.Widget.complete();
        Fliplet.Studio.emit('reload-page-preview');
      });
    }

    Fliplet.API.request('v1/user').then(function(response) {
      $vm.userData = response.user;
    });
  }
});
