Fliplet.Navigator.onReady().then(function () {
  Fliplet.Widget.instance('form-builder', function (data) {
    var selector = '[data-form-builder-id="' + data.id + '"]';

    function getFields() {
      return JSON.parse(JSON.stringify(data.fields || []));
    }

    new Vue({
      el: $(selector)[0],
      data: function () {
        return {
          isSent: false,
          isSending: false,
          isConfigured: !!data.dataSourceId && data.fields.length,
          fields: getFields(),
          error: null
        };
      },
      methods: {
        start: function () {
          this.isSent = false;
        },
        reset: function () {
          this.fields = getFields();
          this.isSending = false;
          this.isSent = true;
        },
        onSubmit: function () {
          var $vm = this;
          var formData = new FormData();

          $vm.fields.forEach(function (field) {
            formData.append(field.name, field.value);
          });

          $vm.isSending = true;

          Fliplet.DataSources.connect(data.dataSourceId).then(function (connection) {
            return connection.insert(formData);
          }).then(function () {
            $vm.reset();
          }, function (err) {
            console.error(err);
            $vm.error = err.message || err.description || err;
            $vm.isSending = false;
          });
        }
      },
      mounted: function () {
        $(selector).removeClass('is-loading');
      }
    });
  });
});