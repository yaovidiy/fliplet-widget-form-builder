Fliplet.FormBuilder.field('date', {
  name: 'Date picker',
  category: 'Text inputs',
  props: {
    fieldType: {
      type: String,
      default: 'date'
    },
    placeholder: {
      type: String
    }
  },
  mounted: function() {
    this.$el.find('input.date-picker').datepicker({
      format: "dd/mm/yyyy",
      todayBtn: "linked",
      keyboardNavigation: true,
      calendarWeeks: true,
      autoclose: true,
      todayHighlight: true
    });
  }
});
