var UPLOADS_FOLDER_NAME = 'Uploaded from Form';

Fliplet.FormBuilder.field('wysiwyg', {
  name: 'WYSIWYG Editor',
  category: 'Advanced',
  props: {
    placeholder: {
      type: String
    },
    rows: {
      type: Number,
      default: 8
    }
  },
  mounted: function () {
    var uploadsFolder;

    var $el = $(this.$refs.textarea).summernote({
      placeholder: this.placeholder,
      tabsize: 2,
      height: this.rows * 25,
      callbacks: {
        onImageUpload: function(files) {
          var toast;

          Fliplet.UI.Toast({
            message: 'Uploading file...',
            progress: true
          }).then(function () {
            toast = this;

            if (uploadsFolder) {
              return;
            }

            return Fliplet.Media.Folders.get().then(function (folders) {
              uploadsFolder = _.find(folders, { name: UPLOADS_FOLDER_NAME });

              if (uploadsFolder) {
                return;
              }

              return Fliplet.Media.Folders.create({ name: UPLOADS_FOLDER_NAME }).then(function (folder) {
                uploadsFolder = folder;
              });
            });
          }).then(function () {
            var data = new FormData();
            data.append('images', files);

            return Fliplet.Media.Files.upload({
              data: FormData,
              folderId: uploadsFolder.id
            }).then(function (files) {
              console.log(files);
              toast.dismiss();
            });
          }).catch(function (err) {
            console.error(err);
          });
        }
      }
    });
  },
  destroyed: function() {
    $(this.$refs.textarea).summernote('destroy');
  }
});
