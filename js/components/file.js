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
    }
  },
  computed: {
    selectedFileName: function() {
      var names = [];

      for (var i = 0; i < this.selectedFiles.length; i++) {
        var file = this.selectedFiles.item(i);
        names.push(file.name);
      }

      return names.join(', ');
    }
  },
  methods: {
    updateValue: function() {
      var $vm = this;
      this.selectedFiles = this.$refs.fileInput.files;

      var operations = [];

      for (var i = 0; i < this.selectedFiles.length; i++) {
        var file = this.selectedFiles.item(i);

        operations.push(new Promise(function (resolve, reject) {
          var reader = new FileReader();

          reader.readAsDataURL(file);

          reader.onload = function () {
            resolve(reader.result);
          };

          reader.onerror = reject;
        }));
      }

      Promise.all(operations).then(function (results) {
        $vm.$emit('_input', $vm.name, results);
      }, function (err) {
        console.error(err);
      });
    }
  }
});
