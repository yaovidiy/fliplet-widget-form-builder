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
  watch: {
    value: function (val) {
      // This happens when the value is updated programmatically via the FormBuilder field().val() method
      if (this.editor && val !== this.editor.getContent()) {
        return this.editor.setContent(val);
      }

      if (val !== this.value) {
        this.value = val;
      }
    }
  },
  methods: {
    onReset: function() {
      if (this.editor) {
        try {
          return this.editor.setContent('');
        } catch (e) {}
      }

      this.value = '';
    },
    onSubmit: function () {
      if (this.editor) {
        this.editor.destroy();
        this.editor = null;
      }
    }
  },
  mounted: function () {
    var $vm = this;

    tinymce.init({
      target: this.$refs.textarea,
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap hr',
        'searchreplace insertdatetime table textcolor colorpicker',
        'autoresize fullscreen code emoticons paste textcolor colorpicker imagetools'
      ].join(' '),
      toolbar: [
        'undo redo | formatselect | fontsizeselect | bold italic underline strikethrough',
        'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
        'link image | blockquote subscript superscript | table charmap hr | forecolor backcolor',
        'removeformat code fullscreen'
      ].join(' | '),
      image_advtab: true,
      menubar: false,
      statusbar: true,
      inline: false,
      resize: true,
      autoresize_bottom_margin: 50,
      autoresize_max_height: 500,
      autoresize_min_height: 20 * this.rows,
      branding: false,
      setup: function (editor) {
        editor.on('init', function () {
          $vm.editor = editor;

          // Default font size
          editor.execCommand('fontSize', false, '10pt');
        });

        editor.on('change', function(e) {
          $vm.$emit('_input', $vm.name, editor.getContent());
        });
      }
    });

    Fliplet.Hooks.on('afterFormSubmit', this.onSubmit);
    Fliplet.FormBuilder.on('reset', this.onReset);
  },
  destroyed: function() {
    Fliplet.FormBuilder.off('reset', this.onReset);
  }
});