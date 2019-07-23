Fliplet.FormBuilder.field('newRadio', {
    name: 'Cool Radios!',
    category: 'Multiple options',
    props: {
      options: {
        type: Array,
        default: [
          {
            label: 'New Option 1'
          },
          {
            label: 'New Option 2'
          },
          {
            label: 'New Option 3'
          }
        ]
      }
    },
    validations: function () {
      var rules = {
        value: {}
      };
  
      if (this.required) {
        rules.value.required = window.validators.required;
      }
      return rules;
    },
    methods: {
      clickHandler: function (option) {
        this.value = option.label || option.id;
        this.updateValue();
      }
    },
    mounted: function () {
        const varArr = ['New Option 1', 'New Option 2', 'New Option 3'];

        const int = Math.floor(Math.random() * Math.floor(3));

        this.value = varArr[int];

        this.updateValue();
    },
    beforeUpdate: function () {
        if ( this.value === 'New Option 1' ) {
            this.value = 'New Option 3';
        }
    }
  });
  