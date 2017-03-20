var data = Fliplet.Widget.getData() || {};

var fields = data.fields || [];

Vue.directive('sortable', {
  inserted: function (el, binding) {
    if (Sortable) {
      new Sortable(el, binding.value || {})
    }
  }
});

var formSettings = _.assign({
  name: 'New form',
  dataSourceId: ''
}, _.omit(data, 'fields'));

var app = new Vue({
  el: '#app',
  data: function () {
    return {
      formFields: Fliplet.FormBuilder.fields(),
      fields: fields,
      activeFieldId: null,
      activeFieldConfigType: null,
      activeField: {},
      dataSources: [],
      settings: formSettings
    }
  },
  methods: {
    onSort: function (event) {
      this.fields.splice(event.newIndex, 0, this.fields.splice(event.oldIndex, 1)[0]);
      this.$forceUpdate();
    },
    onAdd: function (event) {
      event.item.remove();
      this.fields.splice(event.newIndex, 0, {
        name: 'field-' + (this.fields.length + 1),
        type: Fliplet.FormBuilder.fields()[event.oldIndex],
        value: ''
      });
      this.$forceUpdate();
    },
    deleteField: function (index) {
      this.fields.splice(index, 1);
      this.activeFieldConfigType = null;
    },
    onFieldClick: function (field) {
      this.activeFieldId = field.name;
      this.activeFieldConfigType = field.type.toString() + 'Config';
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
    }
  },
  created: function () {
    var $vm = this;

    Fliplet.FormBuilder.on('field-settings-changed', this.onFieldSettingChanged);

    Fliplet.DataSources.get().then(function (results) {
      $vm.dataSources = results;
    })
  },
  beforeDestroy: function () {
    Fliplet.FormBuilder.off('field-settings-changed', this.onFieldSettingChanged);
  },
  mounted: function () {
    var $vm = this;

    Fliplet.Widget.onSaveRequest(function () {
      formSettings.fields = $vm.fields;

      Fliplet.Widget.save(formSettings).then(function () {
        Fliplet.Widget.complete();
      });
    });
  }
});