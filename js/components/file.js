Fliplet.FormBuilder.field('file', {
  name: 'Attach a file',
  category: 'Files',
  props: {
    accept: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue: function() {
      this.value = this.$refs.fileInput.files;
      this.$emit('input', this.value);
    }
  }
});
