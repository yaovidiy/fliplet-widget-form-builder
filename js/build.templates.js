this["Fliplet"] = this["Fliplet"] || {};
this["Fliplet"]["Widget"] = this["Fliplet"]["Widget"] || {};
this["Fliplet"]["Widget"]["Templates"] = this["Fliplet"]["Widget"]["Templates"] || {};

this["Fliplet"]["Widget"]["Templates"]["templates.components.buttons"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<template v-if=\"showSubmit\">\r\n<button :type=\"submitType\" class=\"btn btn-primary pull-right\">{{ submitValue }}</button>\r\n</template>\r\n<template v-if=\"showClear\">\r\n<button :type=\"clearType\" class=\"btn btn-secondary pull-right\" @click=\"resetForm()\">{{ clearValue }}</button>\r\n</template>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.checkbox"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<template>\r\n    <template v-for=\"(option, index) in options\">\r\n        <div class=\"checkbox checkbox-icon\">\r\n            <input\r\n                    type=\"checkbox\"\r\n                    :id=\"name + '-' + index\"\r\n                    :name=\"name\"\r\n                    v-model=\"value\"\r\n                    :value=\"option.label || option.id\">\r\n            <label v-on:click=\"clickHandler(option)\">\r\n                <span class=\"check\"><i class=\"fa fa-check\"></i></span> {{ option.label || option.id }}\r\n            </label>\r\n        </div>\r\n    </template>\r\n    <p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\r\n</template>\r\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.date"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div v-if=\"isWeb\" class=\"input-group custom-date\">\r\n  <div class=\"input-group-addon\">\r\n    <i class=\"fa fa-calendar\"></i>\r\n  </div>\r\n\r\n  <input \r\n  	type=\"text\"\r\n  	v-model.lazy=\"value\"\r\n  	v-on:change=\"updateValue()\"\r\n  	:name=\"name\"\r\n  	:id=\"name\"\r\n  	:placeholder=\"placeholder\"\r\n  	class=\"date-picker form-control\"\r\n  />\r\n</div>\r\n<div v-else class=\"input-group native-date\">\r\n  <div class=\"input-group-addon\">\r\n    <i class=\"fa fa-calendar\"></i>\r\n  </div>\r\n\r\n  <input\r\n    type=\"date\"\r\n    v-model.lazy=\"value\"\r\n    v-on:change=\"updateValue()\"\r\n    :name=\"name\"\r\n    :id=\"name\"\r\n    :placeholder=\"placeholder\"\r\n    class=\"form-control\"\r\n  />\r\n</div>\r\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.email"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input\r\n  type=\"text\"\r\n  class=\"form-control\"\r\n  v-model.trim.lazy=\"value\"\r\n  v-on:blur=\"updateValue()\"\r\n  :name=\"name\"\r\n  :id=\"name\"\r\n  :placeholder=\"placeholder\"\r\n/>\r\n<p class=\"text-danger\" v-if=\"$v.value.email === false && $v.value.$dirty\">The input is not a valid email address.</p>\r\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.field"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"form-group row clearfix\" :data-field=\"name\">\r\n  <div class=\"col-xs-12\" v-if=\"_isFormField\">\r\n    <label class=\"control-label\" :for=\"name\">\r\n      {{ label }} <template v-if=\"required\"><span class=\"required-info\">*</span></template>\r\n    </label>\r\n  </div>\r\n  <div class=\"col-xs-12\">\r\n    "
    + ((stack1 = ((helper = (helper = helpers.template || (depth0 != null ? depth0.template : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"template","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n  </div>\r\n</div>\r\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.file"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<label :for=\"name\" class=\"fileUpload btn btn-primary\">\r\n  <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\r\n  <span v-if=\"selectedFileName\">Replace file</span>\r\n  <span v-else>Choose file</span>\r\n  <input type=\"file\" ref=\"fileInput\" :id=\"name\" :name=\"name\" :data-folder-id=\"mediaFolderId\" class=\"input-file selectfile\" :required=\"required\" v-on:change=\"updateValue()\" multiple>\r\n</label>\r\n<template v-if=\"selectedFileName\">\r\n  <div class=\"file-name-helper\">Chosen file(s): <strong>{{ selectedFileName }}</strong></div>\r\n<template>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.horizontalRule"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<hr>\r\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.image"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"fileUpload\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xs-4 col-sm-3\" v-for=\"(image, index) in value\">\r\n      <div class=\"canvas-holder\">\r\n        <canvas ref=\"canvas\"></canvas>\r\n        <button class=\"canvas-remove\" type=\"button\" v-on:click=\"removeImage(index)\"></button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <label class=\"btn btn-primary\">\r\n    <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\r\n    <span>Choose image</span>\r\n    <input multiple type=\"file\" ref=\"imageInput\" :id=\"name\" :name=\"name\" class=\"input-file selectfile\" accept=\"image/gif, image/jpg, image/jpeg, image/tiff, image/png\" :data-folder-id=\"mediaFolderId\" v-on:click=\"onFileClick\" v-on:change=\"onFileChange\">\r\n  </label>\r\n  <p class=\"text-danger\" v-if=\"hasCorruptedImage\">The uploaded file is not a valid image. Please try again.</p>\r\n</div>\r\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.input"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input\r\n  type=\"text\"\r\n  class=\"form-control\"\r\n  v-model.trim.lazy=\"value\"\r\n  v-on:blur=\"updateValue()\"\r\n  :name=\"name\"\r\n  :id=\"name\"\r\n  :placeholder=\"placeholder\"\r\n/>\r\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.newRadio"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<template>\r\n    <template v-for=\"(option, index) in options\">\r\n      <div class=\"radio radio-icon\">\r\n        <input\r\n                type=\"radio\"\r\n                :id=\"name + '-' + index\"\r\n                :name=\"name\"\r\n                v-model=\"value\"\r\n                :value=\"option.label || option.id\">\r\n        <label v-on:click=\"clickHandler(option)\">\r\n          <span class=\"check\"><i class=\"fa fa-circle\"></i></span> {{ option.label || option.id }}\r\n        </label>\r\n      </div>\r\n    </template>\r\n    <p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\r\n</template>\r\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.number"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input\r\n  type=\"text\"\r\n  class=\"form-control\"\r\n  v-model.trim.lazy=\"value\"\r\n  v-on:blur=\"updateValue()\"\r\n  :name=\"name\"\r\n  :id=\"name\"\r\n  :placeholder=\"placeholder\"\r\n/>\r\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\r\n<p class=\"text-danger\" v-if=\"$v.value.minValue === false && $v.value.$dirty\">Only positive numbers are allowed.</p>\r\n<p class=\"text-danger\" v-if=\"$v.value.integer === false && $v.value.$dirty\">Only integer numbers are allowed.</p>\r\n<p class=\"text-danger\" v-if=\"$v.value.decimal === false && $v.value.$dirty\">Only {{decimals}} number(s) after point are allowed.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.paragraph"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p v-html=\"htmlValue\"></p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.password"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input\r\n  type=\"password\"\r\n  class=\"form-control\"\r\n  :readonly=\"autogenerate\"\r\n  autocomplete=\"off\"\r\n  v-on:blur=\"updateValue()\"\r\n  v-model.lazy=\"value\"\r\n  :name=\"name\"\r\n  :id=\"name\"\r\n  :placeholder=\"fieldPlaceholder\"\r\n/>\r\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\r\n\r\n<div class=\"form-group row clearfix\" v-if=\"confirm\">\r\n  <br />\r\n  <div class=\"col-xs-12\">\r\n    <label class=\"control-label\" for=\"confirmPassword\">Confirm password\r\n        <template v-if=\"required\">\r\n            <span class=\"required-info\">*</span>\r\n        </template>\r\n    </label>\r\n  </div>\r\n  <div class=\"col-xs-12\">\r\n    <input\r\n      type=\"password\"\r\n      class=\"form-control\"\r\n      v-model.lazy=\"valueConfirmation\"\r\n      id=\"confirmPassword\"\r\n      autocomplete=\"off\"\r\n      v-on:blur=\"updateConfirmation()\"\r\n    />\r\n    <p class=\"text-danger\" v-if=\"$v.valueConfirmation.sameAs === false && $v.valueConfirmation.$dirty\">Password confirmation does not match password.</p>\r\n  </div>\r\n</div>\r\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.radio"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<template>\r\n    <template v-for=\"(option, index) in options\">\r\n      <div class=\"radio radio-icon\">\r\n        <input\r\n                type=\"radio\"\r\n                :id=\"name + '-' + index\"\r\n                :name=\"name\"\r\n                v-model=\"value\"\r\n                :value=\"option.label || option.id\">\r\n        <label v-on:click=\"clickHandler(option)\">\r\n          <span class=\"check\"><i class=\"fa fa-circle\"></i></span> {{ option.label || option.id }}\r\n        </label>\r\n      </div>\r\n    </template>\r\n    <p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\r\n</template>\r\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.select"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<label :for=\"name\" class=\"select-proxy-display\">\r\n  <select\r\n          class=\"form-control hidden-select\"\r\n          :name=\"name\"\r\n          :id=\"name\"\r\n          v-model=\"value\"\r\n          v-on:change=\"updateValue()\">\r\n    <option v-if=\"placeholder\" value=\"\">{{ placeholder }}</option>\r\n    <option v-for=\"option in options\" :value=\"option.id || option.label\" :disabled=\"option.disabled\">\r\n      {{ option.label || option.id }}\r\n    </option>\r\n  </select>\r\n  <span class=\"icon fa fa-chevron-down\"></span>\r\n  <span class=\"select-value-proxy\"><template v-if=\"value && value !== ''\">{{ value }}</template><template v-else>{{ placeholder }}</template></span>\r\n</label>\r\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\r\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.signature"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"field-signature\">\r\n  <canvas :id=\"name\" ref=\"canvas\"></canvas>\r\n  <a href=\"#\" v-on:click.prevent=\"clean()\"><i class=\"fa fa-times\"></i> Clear</a>\r\n</div>\r\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.starRating"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"inverse-direction\">\r\n  <template v-for=\"(option, index) in values\">\r\n    <input\r\n            class=\"rating-input\"\r\n            :name=\"name\"\r\n            type=\"radio\"\r\n            :id=\"name + '-' + index\"\r\n            v-model=\"value\"\r\n            :value=\"option.id\"\r\n            v-on:change=\"updateValue()\"\r\n    >\r\n    <label class=\"rating-star\" :for=\"name + '-' + index\">\r\n      <i class=\"fa fa-star-o\"></i>\r\n      <i class=\"fa fa-star\"></i>\r\n    </label>\r\n  </template>\r\n</div>\r\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\r\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.telephone"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input\r\n  type=\"tel\"\r\n  class=\"form-control\"\r\n  v-model.trim.lazy=\"value\"\r\n  v-on:blur=\"updateValue()\"\r\n  :name=\"name\"\r\n  :id=\"name\"\r\n  :placeholder=\"placeholder\"\r\n/>\r\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\r\n<p class=\"text-danger\" v-if=\"$v.value.phone === false && $v.value.$dirty\">Phone could contain <b>; , . ( ) - + SPACE * #</b> and numbers.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.textarea"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<textarea\r\n  class=\"form-control\"\r\n  v-model.trim.lazy=\"value\"\r\n  v-on:blur=\"updateValue()\"\r\n  :name=\"name\"\r\n  :id=\"name\"\r\n  :placeholder=\"placeholder\"\r\n  :rows=\"rows\"\r\n></textarea>\r\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.time"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"input-group custom-time\">\r\n  <div class=\"input-group-addon\">\r\n    <i class=\"fa fa-clock-o\"></i>\r\n  </div>\r\n\r\n  <input \r\n    type=\"time\"\r\n    v-model.lazy=\"value\"\r\n    v-on:change=\"updateValue()\"\r\n    :name=\"name\"\r\n    :id=\"name\"\r\n    :placeholder=\"placeholder\"\r\n    class=\"form-control\"\r\n  />\r\n</div>\r\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.title"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h2>{{ value }}</h2>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.url"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input\r\n  type=\"url\"\r\n  class=\"form-control\"\r\n  v-model.trim.lazy=\"value\"\r\n  v-on:blur=\"updateValue()\"\r\n  :name=\"name\"\r\n  :id=\"name\"\r\n  :placeholder=\"placeholder\"\r\n/>\r\n<p class=\"text-danger\" v-if=\"$v.value.url === false && $v.value.$ditry\">The input is not a valid URL.</p>\r\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.wysiwyg"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<textarea\r\n  class=\"form-control\"\r\n  v-model.trim.lazy=\"value\"\r\n  ref=\"textarea\"\r\n  :name=\"name\"\r\n  :id=\"name\"\r\n></textarea>\r\n<div\r\n  class=\"ghost-tinymce\"\r\n  ref=\"ghost\"\r\n  v-html=\"value\"\r\n  v-if=\"isInterface\">\r\n</div>\r\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.configurations.radio"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"form-group\">\r\n  <label>Default value <small>(Enter one of the options you entered above)</small></label>\r\n  <input class=\"form-control\" type=\"text\" v-model.trim=\"value\" placeholder=\"Default value\" />\r\n</div>\r\n";
},"useData":true});