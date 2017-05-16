Fliplet.FormBuilder.field('image', {
  name: 'Image upload',
  category: 'Files',
  props: {
    accept: {
      type: String,
      default: ''
    },
    customWidth: {
      type: Number,
      default: 1024
    },
    customHeight: {
      type: Number,
      default: 768
    },
    value: {
      type: Array,
      default: []
    }
  },
  created: function () {
    Fliplet.FormBuilder.on('reset', this.onReset);
  },
  destroyed: function () {
    Fliplet.FormBuilder.off('reset', this.onReset);
  },
  methods: {
    onReset: function () {
      var canvas = this.$refs.canvas;
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    },
    processImage: function(file, addThumbnail) {
      var $vm = this;

      loadImage.parseMetaData(file, function(data) {
        loadImage(
          file,
          function(img) {
            var imgBase64Url = img.toDataURL('image/jpeg', 80);
            if (addThumbnail) {
              $vm.addThumbnailToCanvas(imgBase64Url);
            }
            $vm.value.push(imgBase64Url);
            $vm.$emit('_input', $vm.name, $vm.value);
          }, {
            canvas: true,
            maxWidth: $vm.customWidth,
            maxHeight: $vm.customHeight,
            orientation: data.exif
              ? data.exif.get('Orientation')
              : true
          });
      });
    },
    updateValue: function() {
      // Cleanup if the user adds new images
      this.value = [];

      for (var i = 0; i < this.$refs.imageInput.files.length; i++) {
        this.processImage(this.$refs.imageInput.files.item(i), i === 0);
      }
    },
    addThumbnailToCanvas: function(imageURI) {
      imageURI = (imageURI.indexOf('base64') > -1) ?
        imageURI :
        'data:image/jpeg;base64,' + imageURI;

      var canvas = this.$refs.canvas;
      var canvasWidth = canvas.clientWidth;
      var canvasHeight = canvas.clientHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      var canvasRatio = canvasWidth / canvasHeight;
      var context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);

      var img = new Image();
      img.onload = function imageLoadedFromURI() {
        drawImageOnCanvas(this, canvas);
      };
      img.src = imageURI;
    }
  }
});

function drawImageOnCanvas(img, canvas) {
  var imgWidth = img.width;
  var imgHeight = img.height;
  var imgRatio = imgWidth / imgHeight;
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var canvasRatio = canvasWidth / canvasHeight;
  var context = canvas.getContext('2d');

  // Re-interpolate image draw dimensions based to CONTAIN within canvas
  if (imgRatio < canvasRatio) {
    // IMAGE RATIO is slimmer than CANVAS RATIO, i.e. margin on the left & right
    if (imgHeight > canvasHeight) {
      // Image is taller. Resize image to fit height in canvas first.
      imgHeight = canvasHeight;
      imgWidth = imgHeight * imgRatio;
    }
  } else {
    // IMAGE RATIO is wider than CANVAS RATIO, i.e. margin on the top & bottom
    if (imgWidth > canvasWidth) {
      // Image is wider. Resize image to fit width in canvas first.
      imgWidth = canvasWidth;
      imgHeight = imgWidth / imgRatio;
    }
  }

  var drawX = (canvasWidth > imgWidth) ? (canvasWidth - imgWidth) / 2 : 0;
  var drawY = (canvasHeight > imgHeight) ? (canvasHeight - imgHeight) / 2 : 0;

  context.drawImage(img, drawX, drawY, imgWidth, imgHeight);
}
