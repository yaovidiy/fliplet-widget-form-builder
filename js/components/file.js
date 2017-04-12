Fliplet.FormBuilder.field('file', {
  name: 'Attach a file',
  category: 'Foo',
  props: {
    accept: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue: function () {
      this.value = this.$refs.fileInput.files;
      this.$emit('input', this.value);
    }
  }
});