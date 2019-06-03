Fliplet.FormBuilder.field('file', {
  name: 'Attach a file',
  category: 'Files',
  props: {
    accept: {
      type: String,
      default: ''
    },
    selectedFileName: {
      type: String,
      default: ''
    },
    selectedFiles: {
      type: Array,
      default: []
    },
    saveProgress: {
      type: Boolean,
      default: false
    },
    mediaFolderId: {
      type: Number,
      default: null
    },
    mediaFolderData: {
      type: Object,
      default: {}
    },
    mediaFolderNavStack: {
      type: Array,
      default: []
    },
    value: {
      type: Array,
      default: []
    }
  },
  computed: {
    selectedFileName: function() {
      return _.map(this.selectedFiles, 'name').join(', ');
    }
  },
  methods: {
    updateValue: function() {
      var $vm = this;

      this.selectedFiles.splice(0, this.selectedFiles.length);

      var operations = [];

      for (var i = 0; i < this.$refs.fileInput.files.length; i++) {
        var file = this.$refs.fileInput.files.item(i);
        this.selectedFiles.push(file);
      }

      $vm.$emit('_input', $vm.name, this.selectedFiles);
    }
  }
});
