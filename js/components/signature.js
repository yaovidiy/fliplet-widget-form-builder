Fliplet.FormBuilder.field('signature', {
  name: 'Signature',
  category: 'Advanced',
  props: {
    placeholder: {
      type: String
    },
    height: {
      type: Number,
      default: 150
    },
    previousClientWidth: {
      type: Number,
      default: 0
    }
  },
  computed: {
    borderColor: function () {
      return Fliplet.Themes && Fliplet.Themes.Current.get('bodyTextColor') || '#e5e5e5';
    }
  },
  mounted: function () {
    var canvas = this.$refs.canvas;
    canvas.style.width = '100%';
    canvas.style.height = parseInt(this.height, 10) + 'px';
    canvas.style.userSelect = 'none';
    canvas.style.borderBottom = '1px solid ' + this.borderColor;

    this.pad = new SignaturePad(canvas);

    Fliplet.FormBuilder.on('reset', this.onReset);
    Fliplet.Hooks.on('beforeFormSubmit', this.onBeforeSubmit);
    
    $(window).on('resize', this.onResize);
    this.onResize();
  },
  destroyed: function() {
    this.isDestroyed = true;
    $(window).off('resize', this.onResize);
    Fliplet.FormBuilder.off('reset', this.onReset);
  },
  methods: {
    onResize: function() {
      var canvas = this.$refs.canvas;
      
      if (this.previousClientWidth !== canvas.clientWidth) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        this.onReset();
        this.previousClientWidth = canvas.width;
      }
    },
    onReset: function() {
      if (this.pad) {
        this.pad.clear();
      }
    },
    onBeforeSubmit: function(data) {
      if (!this.pad || this.isDestroyed) {
        return;
      }

      if (this.required && this.pad.isEmpty()) {
        Fliplet.Navigate.popup({
          popupTitle: 'The following field is required',
          popupMessage: this.name
        });

        return Promise.reject('The following field is required: ' + this.name);
      }

      // Get signature as base 64 string
      data[this.name] = this.pad.toDataURL('image/png');
    }
  }
});
