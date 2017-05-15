Fliplet.FormBuilder.field('image', {
  name: 'Image upload',
  category: 'Files',
  props: {
    accept: {
      type: String,
      default: ''
    },
    selectedImages: {
      type: Array,
      default: []
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
  methods: {
    loadImage: function(file) {
      var $vm = this;

      this.value.push(file);
      this.$emit('_input', this.name, this.value);

      loadImage.parseMetaData(file, function(data) {
        loadImage(
          file,
          function(img) {
            onSelectedPicture($vm, img.toDataURL('image/jpeg', 80));
            $vm.selectedImages.push(img);
            $vm.$refs.imageInput.append(img);
          }, {
            canvas: true,
            maxWidth: this.customWidth,
            maxHeight: this.customHeight,
            orientation: data.exif ? data.exif.get('Orientation') : true
          });
      });
    },
    updateValue: function() {
      var $vm = this;

      // Cleanup if the user adds new images
      $vm.selectedImages = [];
      $vm.$refs.imageInput.innerHTML = '';

      // Web
      if (Fliplet.Env.is('web') || !navigator.camera) {
        for (var i = 0; i < this.$refs.imageInput.files.length; i++) {
          this.loadImage(this.$refs.imageInput.files.item(i));
        }

        return;
      }

      // Native
      requestPicture(this.$refs.imageInput).then(function onRequestedPicture(options) {
        if ($vm.customWidth) {
          options.width = parseInt($vm.customWidth);
        }

        if ($vm.customHeight) {
          options.height = parseInt($vm.customHeight);
        }

        return getPicture(options);
      }).then(function(imageURI) {
        $vm.loadImage(imageURI);
      });
    }
  }
});

function requestPicture(fileInput) {
  var boundingRect = fileInput.getBoundingClientRect();

  while (boundingRect.width === 0 || boundingRect.height === 0) {
    if (!fileInput.parentNode) {
      break;
    }

    fileInput = fileInput.parentNode;
    boundingRect = fileInput.getBoundingClientRect();
  }

  return new Promise(function(resolve, reject) {
    var cameraOptions = {
      boundingRect: fileInput.getBoundingClientRect()
    };

    navigator.notification.confirm(
      'How do you want to choose your image?',
      function onSelectedImageMethod(button) {
        document.body.focus();
        switch (button) {
          case 1:
            cameraOptions.source = Camera.PictureSourceType.CAMERA;
            return resolve(cameraOptions);
          case 2:
            cameraOptions.source = Camera.PictureSourceType.PHOTOLIBRARY;
            return resolve(cameraOptions);
          case 3:
            return;
          default:
            return reject('Not implemented');
        }
      },
      'Choose Image', ['Take Photo', 'Choose Existing Photo', 'Cancel']
    );
  });
}

function getPicture(options) {
  var boundingRect;
  var popoverOptions = {
    arrowDir: Camera.PopoverArrowDirection.ARROW_ANY
  };

  if (typeof options.boundingRect === 'object') {
    boundingRect = options.boundingRect;
    popoverOptions.x = boundingRect.left;
    popoverOptions.y = boundingRect.top;
    popoverOptions.width = boundingRect.width;
    popoverOptions.height = boundingRect.height;
  }

  return new Promise(function(resolve, reject) {
    navigator.camera.getPicture(onSelectedPicture, resolve, reject, {
      quality: 80,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: (options.source) ? options.source : Camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: (options.width) ? options.width : 1024,
      targetHeight: (options.height) ? options.height : 1024,
      popoverOptions: popoverOptions,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      correctOrientation: true // Corrects Android orientation quirks
    });
  });
}

function onSelectedPicture(vm, imageURI) {
  var $vm = vm;
  var fileImages = {};
  imageURI = (imageURI.indexOf('base64') > -1) ? imageURI : 'data:image/jpeg;base64,' + imageURI;

  fileImages[$vm.$refs.imageInput.name] = {
    base64: imageURI
  };

  $('canvas[data-file-name="' + $vm.$refs.imageInput.name + '"]').each(function forEachCanvas() {
    var canvas = this;
    var imgSrc = imageURI;
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
    img.src = imgSrc;
  });
}

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
