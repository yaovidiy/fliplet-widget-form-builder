Fliplet.FormBuilder.field('image', {
  name: 'Image upload',
  category: 'Files',
  props: {
    accept: {
      type: String,
      default: ''
    }
  },
  computed: {
    selectedFileName: function() {
      return this.value && this.value[0].name;
    }
  },
  methods: {
    updateValue: function() {
      debugger;
      this.value = this.$refs.fileInput.files;
      this.$emit('_input', this.name, this.value);
    }
  }
});
