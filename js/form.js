Fliplet.Widget.instance('form-builder', function (data) {
  var build = new Vue({
    el: '#build',
    data: function () {
      return {
        fields: data.fields || []
      };
    },
    methods: {
      onSubmit: function () {
        console.log(JSON.stringify(this.fields, null, 2))
        alert('submit');
      }
    }
  });
});