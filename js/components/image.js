var fileImages = {};

$(document).on('click', 'input[type="file"][data-file-image]', function onClickedImageUpload(e) {
  console.log('HELLO!!!')
  if (Fliplet.Env.get('platform') === 'web') {
    return;
  }
  e.preventDefault();

  if (typeof navigator.camera === 'undefined') {
    return Fliplet.Navigate.popup({
      popupTitle: 'Sorry',
      popupMessage: 'It looks like your app does not support file upload. Please contact the support team for more information.'
    });
  }

  var fileInput = event.target;
  var customWidth = $(fileInput).attr('data-width');
  var customHeight = $(fileInput).attr('data-height');
  requestPicture(fileInput)
    .then(function onRequestedPicture(options) {
      if (customWidth) {
        options.width = parseInt(customWidth);
      }
      if (customHeight) {
        options.height = parseInt(customHeight);
      }
      getPicture(options);
    });
});

$(document).on('change', 'input[type="file"][data-file-image]', function onImageUploadChanged(e) {
  console.log('HELLO')
  var files = e.target.files;
  selectedFileInputName = e.target.name;
  var maxWidth = $(e.target).attr('data-width') || 1024;
  var maxHeight = $(e.target).attr('data-height') || 1024;
  var file;
  for (var i = 0, l = files.length; i < l; i++) {
    if (i > 0) {
      // Restrict support to only 1 file at the moment
      return;
    }

    file = files[i];
    // Prevent any non-image file type from being read.
    if (!file.type.match(/image.*/)) {
      return console.warn("File is not an image: ", file.type);
    }

    processWebSelectedImage(file, maxWidth, maxHeight);
  }
});

function processWebSelectedImage(file, maxWidth, maxHeight) {
  // Parse meta data for EXIF
  loadImage.parseMetaData(
    file,
    function(data) {
      loadImage(
        file,
        function(canvas) {
          onSelectedPicture(canvas.toDataURL('image/jpeg', 80));
        }, {
          canvas: true,
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          // Use EXIF data to adjust rotation
          orientation: (data.exif) ? data.exif.get('Orientation') : true,
        }
      );
    }
  );
}

function requestPicture(fileInput) {
  selectedFileInputName = fileInput.name;
  var boundingClientRectTarget = fileInput;
  var boundingRect = boundingClientRectTarget.getBoundingClientRect();
  while (boundingRect.width === 0 || boundingRect.height === 0) {
    if (!boundingClientRectTarget.parentNode) {
      break;
    }
    boundingClientRectTarget = boundingClientRectTarget.parentNode;
    boundingRect = boundingClientRectTarget.getBoundingClientRect();
  }

  return new Promise(function(resolve, reject) {
    var cameraOptions = {
      boundingRect: boundingRect
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
  options = options || {};
  if (Fliplet.Env.get('platform') === 'web') {
    return;
  }

  if (typeof navigator.camera === 'undefined') {
    return Fliplet.Navigate.popup({
      popupTitle: 'Sorry',
      popupMessage: 'It looks like your app does not support file upload. Please contact the support team for more information.'
    });
  }

  var popoverOptions = {
    arrowDir: Camera.PopoverArrowDirection.ARROW_ANY
  };
  if (typeof options.boundingRect === 'object') {
    var boundingRect = options.boundingRect;
    popoverOptions.x = boundingRect.left;
    popoverOptions.y = boundingRect.top;
    popoverOptions.width = boundingRect.width;
    popoverOptions.height = boundingRect.height;
  }

  navigator.camera.getPicture(onSelectedPicture, function getPictureSuccess(message) {
    console.error('Error getting picture with navigator.camera.getPicture');
  }, {
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
}

function onSelectedPicture(imageURI) {
  imageURI = (imageURI.indexOf('base64') > -1) ? imageURI : 'data:image/jpeg;base64,' + imageURI;

  fileImages[selectedFileInputName] = {
    base64: imageURI
  };

  $('canvas[data-file-name="' + selectedFileInputName + '"]').each(function forEachCanvas() {
    console.log('canvas');
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

function resetImages() {
  fileImages = {};
  selectedFileInputName = null;
  $('canvas[data-file-name]').each(function() {
    this.getContext('2d').clearRect(0, 0, this.width, this.height);
  });
}

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
