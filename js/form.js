Fliplet.Widget.instance('form-builder', function (data) {
  new Vue({
    el: $('[data-form-builder-id="' + data.id + '"]')[0],
    data: function () {
      return {
        fields: data.fields || []
      };
    },
    methods: {
      onSubmit: function () {
        console.log(JSON.stringify(this.fields, null, 2))
        alert('Done! check the console');
      }
    }
  });
});