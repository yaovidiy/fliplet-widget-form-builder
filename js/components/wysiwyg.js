Fliplet.FormBuilder.field('wysiwyg', {
  name: 'Rich text',
  category: 'Text inputs',
  props: {
    placeholder: {
      type: String
    },
    rows: {
      type: Number,
      default: 5
    }
  },
  computed: {
    isInterface: function () {
      return Fliplet.Env.get('interface');
    }
  },
  watch: {
    value: function (val) {
      // This happens when the value is updated programmatically via the FormBuilder field().val() method
      if (this.editor && val !== this.editor.getContent()) {
        return this.editor.setContent(val, { format : 'raw' });
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
    onBeforeSubmit: function(data) {
      var value = data[this.name];
      $(this.$refs.textarea).parents('.form-group').removeClass('has-error');
      if (this.required && (!value || !value.length)) {
        $(this.$refs.textarea).parents('.form-group').addClass('has-error');
        return Promise.reject('Please fill in required fields.');
      }
    }
  },
  mounted: function () {
    var $vm = this;
    var lineHeight = 40;

    tinymce.init({
      target: this.$refs.textarea,
      theme: 'modern',
      mobile: {
        theme: 'mobile',
        plugins: [ 'autosave', 'lists', 'autolink' ],
        toolbar: [ 'bold', 'italic', 'underline', 'bullist', 'numlist', 'removeformat' ]
      },
      plugins: [
        'advlist autolink lists link directionality',
        'autoresize fullscreen code paste'
      ].join(' '),
      toolbar: [
        'bold italic underline',
        'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
        'ltr rtl | link | removeformat code fullscreen'
      ].join(' | '),
      image_advtab: true,
      menubar: false,
      statusbar: false,
      inline: false,
      resize: false,
      autoresize_bottom_margin: 0,
      autoresize_max_height: lineHeight * this.rows,
      autoresize_min_height: lineHeight * this.rows,
      autofocus: false,
      branding: false,
      paste_as_text: true,
      setup: function (editor) {
        editor.on('init', function () {
          $vm.editor = editor;

          // initialise value if it was set prior to initialisation
          if ($vm.value) {
            editor.setContent($vm.value, { format : 'raw' });
          }

          if ($vm.isInterface) {
            // iFrames don't work with the form builder's Sortable feature
            // Instead, the iFrame is swapped with a <div></div> of the same dimensions
            var $el = $($vm.$refs.ghost);
            $el.width(editor.iframeElement.style.width).height(editor.iframeElement.style.height);
            $(editor.iframeElement).replaceWith($el);
          }
        });

        editor.on('change', function(e) {
          $vm.$emit('_input', $vm.name, editor.getContent());
        });
      }
    });

    Fliplet.Hooks.on('beforeFormSubmit', this.onBeforeSubmit);
    Fliplet.FormBuilder.on('reset', this.onReset);
  },
  destroyed: function() {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }

    Fliplet.FormBuilder.off('reset', this.onReset);
  }
});
