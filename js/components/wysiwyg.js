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
  computed: {
    isInterface: function () {
      return Fliplet.Env.get('interface');
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
    },
    onBeforeSubmit: function(data) {
      if (this.required && !this.value.length) {
        Fliplet.Navigate.popup({
          popupTitle: 'The following field is required',
          popupMessage: this.name
        });

        return Promise.reject('The following field is required: ' + this.name);
      }
    }
  },
  mounted: function () {
    var $vm = this;

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

          if ($vm.isInterface) {
            // iFrames don't work with the form builder's Sortable feature
            // Instead, the iFrame is swapped with a <div></div> of the same dimensions
            var $el = $($vm.$refs.ghost);
            $el.height(editor.iframeElement.style.height);
            $(editor.iframeElement).replaceWith($el);
          }
        });

        editor.on('change', function(e) {
          $vm.$emit('_input', $vm.name, editor.getContent());
        });
      }
    });

    Fliplet.Hooks.on('beforeFormSubmit', this.onBeforeSubmit);
    Fliplet.Hooks.on('afterFormSubmit', this.onSubmit);
    Fliplet.FormBuilder.on('reset', this.onReset);
  },
  destroyed: function() {
    Fliplet.FormBuilder.off('reset', this.onReset);
  }
});