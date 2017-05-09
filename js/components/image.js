Fliplet.FormBuilder.field('image', {
  name: 'Image upload',
  category: 'Files',
  props: {
    accept: {
      type: String,
      default: ''
    },
    selectedImage: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue: function() {
      var $vm = this;
      var reader = new FileReader();

      reader.onload = function(e) {
        $vm.selectedImage = e.target.result;
      };

      reader.readAsDataURL(this.$refs.imageInput.files[0]);

      this.value = this.$refs.imageInput.files;
      this.$emit('_input', this.name, this.value);
    }
  }
});
