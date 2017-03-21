Fliplet.Navigator.onReady().then(function () {
  Fliplet.Widget.instance('form-builder', function (data) {
    var selector = '[data-form-builder-id="' + data.id + '"]';

    new Vue({
      el: $(selector)[0],
      data: function () {
        return {
          isSent: false,
          isSending: false,
          isConfigured: !!data.dataSourceId && data.fields.length,
          fields: data.fields || []
        };
      },
      methods: {
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
            $vm.isSending = false;
            $vm.isSent = true;
          }, function (err) {
            console.error(err);
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