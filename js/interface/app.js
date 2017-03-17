var data = Fliplet.Widget.getData() || {};

var fields = data.fields || [
  {
    type: 'flFormInput',
    value: 'Foo'
  },
  {
    type: 'flFormSelect',
    source: 'dataSources',
    value: 1
  },
  {
    type: 'flFormSelect',
    options: [{id: 1, name: 'foo'}, {id: 2, name: 'bar'}],
    value: 2
  }
];

Vue.directive('sortable', {
  inserted: function (el, binding) {
    if (Sortable) {
      new Sortable(el, binding.value || {})
    }
  }
});

var app = new Vue({
  el: '#app',
  data: function () {
    return {
      formFields: Fliplet.FormBuilder.fields(),
      fields: fields
    }
  },
  methods: {
    onSubmit: function () {
      console.log(JSON.stringify(this.fields, null, 2))
    },
    onSort: function (event) {
      this.fields.splice(event.newIndex, 0, this.fields.splice(event.oldIndex, 1)[0]);
      this.$forceUpdate();
    },
    onAdd: function (event) {
      event.item.remove();
      this.fields.splice(event.newIndex, 0, {
        type: Fliplet.FormBuilder.fields()[event.oldIndex]
      });
      this.$forceUpdate();
    },
    deleteField: function (index) {
      this.fields.splice(index, 1);
    }
  },
  mounted: function () {
    var $vm = this;

    Fliplet.Widget.onSaveRequest(function () {
      Fliplet.Widget.save({ fields: $vm.fields }).then(function () {
        Fliplet.Widget.complete();
      });
    });
  }
});