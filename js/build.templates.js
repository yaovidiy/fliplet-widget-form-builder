this["Fliplet"] = this["Fliplet"] || {};
this["Fliplet"]["Widget"] = this["Fliplet"]["Widget"] || {};
this["Fliplet"]["Widget"]["Templates"] = this["Fliplet"]["Widget"]["Templates"] || {};

this["Fliplet"]["Widget"]["Templates"]["templates.components.buttons"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<template v-if=\"showSubmit\">\n<button :type=\"submitType\" class=\"btn btn-primary pull-right\">{{ submitValue }}</button>\n</template>\n<template v-if=\"showClear\">\n<button :type=\"clearType\" class=\"btn btn-secondary pull-right\" @click=\"resetForm()\">{{ clearValue }}</button>\n</template>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.checkbox"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<template>\n    <template v-for=\"(option, index) in options\">\n        <div class=\"checkbox checkbox-icon\">\n            <input\n                    type=\"checkbox\"\n                    :id=\"name + '-' + index\"\n                    :name=\"name\"\n                    v-model=\"value\"\n                    :value=\"option.label || option.id\">\n            <label v-on:click=\"clickHandler(option)\">\n                <span class=\"check\"><i class=\"fa fa-check\"></i></span> {{ option.label || option.id }}\n            </label>\n        </div>\n    </template>\n    <p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\n</template>\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.date"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div v-if=\"isWeb\" class=\"input-group custom-date\">\n  <div class=\"input-group-addon\">\n    <i class=\"fa fa-calendar\"></i>\n  </div>\n\n  <input \n  	type=\"text\"\n  	v-model.lazy=\"value\"\n  	v-on:change=\"updateValue()\"\n  	:name=\"name\"\n  	:id=\"name\"\n  	:placeholder=\"placeholder\"\n  	class=\"date-picker form-control\"\n  />\n</div>\n<div v-else class=\"input-group native-date\">\n  <div class=\"input-group-addon\">\n    <i class=\"fa fa-calendar\"></i>\n  </div>\n\n  <input\n    type=\"date\"\n    v-model.lazy=\"value\"\n    v-on:change=\"updateValue()\"\n    :name=\"name\"\n    :id=\"name\"\n    :placeholder=\"placeholder\"\n    class=\"form-control\"\n  />\n</div>\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.email"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input\n  type=\"text\"\n  class=\"form-control\"\n  v-model.trim.lazy=\"value\"\n  v-on:blur=\"updateValue()\"\n  :name=\"name\"\n  :id=\"name\"\n  :placeholder=\"placeholder\"\n/>\n<p class=\"text-danger\" v-if=\"$v.value.email === false && $v.value.$dirty\">The input is not a valid email address.</p>\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.field"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"form-group row clearfix\" :data-field=\"name\">\n  <div class=\"col-xs-12\" v-if=\"_isFormField\">\n    <label class=\"control-label\" :for=\"name\">\n      {{ label }} <template v-if=\"required\"><span class=\"required-info\">*</span></template>\n    </label>\n  </div>\n  <div class=\"col-xs-12\">\n    "
    + ((stack1 = ((helper = (helper = helpers.template || (depth0 != null ? depth0.template : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"template","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n  </div>\n</div>\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.file"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<label :for=\"name\" class=\"fileUpload btn btn-primary\">\n  <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\n  <span v-if=\"selectedFileName\">Replace file</span>\n  <span v-else>Choose file</span>\n  <input type=\"file\" ref=\"fileInput\" :id=\"name\" :name=\"name\" :data-folder-id=\"mediaFolderId\" class=\"input-file selectfile\" :required=\"required\" v-on:change=\"updateValue()\" multiple>\n</label>\n<template v-if=\"selectedFileName\">\n  <div class=\"file-name-helper\">Chosen file(s): <strong>{{ selectedFileName }}</strong></div>\n<template>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.horizontalRule"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<hr>\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.image"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"fileUpload\">\n  <div class=\"row\">\n    <div class=\"col-xs-4 col-sm-3\" v-for=\"(image, index) in value\">\n      <div class=\"canvas-holder\">\n        <canvas ref=\"canvas\"></canvas>\n        <button class=\"canvas-remove\" type=\"button\" v-on:click=\"removeImage(index)\"></button>\n      </div>\n    </div>\n  </div>\n  <label class=\"btn btn-primary\">\n    <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\n    <span>Choose image</span>\n    <input multiple type=\"file\" ref=\"imageInput\" :id=\"name\" :name=\"name\" class=\"input-file selectfile\" accept=\"image/gif, image/jpg, image/jpeg, image/tiff, image/png\" :data-folder-id=\"mediaFolderId\" v-on:click=\"onFileClick\" v-on:change=\"onFileChange\">\n  </label>\n  <p class=\"text-danger\" v-if=\"hasCorruptedImage\">The uploaded file is not a valid image. Please try again.</p>\n</div>\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.input"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input\n  type=\"text\"\n  class=\"form-control\"\n  v-model.trim.lazy=\"value\"\n  v-on:blur=\"updateValue()\"\n  :name=\"name\"\n  :id=\"name\"\n  :placeholder=\"placeholder\"\n/>\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.number"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input\n  type=\"text\"\n  class=\"form-control\"\n  v-model.trim.lazy=\"value\"\n  v-on:blur=\"updateValue()\"\n  :name=\"name\"\n  :id=\"name\"\n  :placeholder=\"placeholder\"\n/>\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\n<p class=\"text-danger\" v-if=\"$v.value.minValue === false && $v.value.$dirty\">Only positive numbers are allowed.</p>\n<p class=\"text-danger\" v-if=\"$v.value.integer === false && $v.value.$dirty\">Only integer numbers are allowed.</p>\n<p class=\"text-danger\" v-if=\"$v.value.decimal === false && $v.value.$dirty\">Only {{decimals}} number(s) after point are allowed.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.paragraph"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p v-html=\"htmlValue\"></p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.password"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input\n  type=\"password\"\n  class=\"form-control\"\n  :readonly=\"autogenerate\"\n  autocomplete=\"off\"\n  v-on:blur=\"updateValue()\"\n  v-model.lazy=\"value\"\n  :name=\"name\"\n  :id=\"name\"\n  :placeholder=\"fieldPlaceholder\"\n/>\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\n\n<div class=\"form-group row clearfix\" v-if=\"confirm\">\n  <br />\n  <div class=\"col-xs-12\">\n    <label class=\"control-label\" for=\"confirmPassword\">Confirm password\n        <template v-if=\"required\">\n            <span class=\"required-info\">*</span>\n        </template>\n    </label>\n  </div>\n  <div class=\"col-xs-12\">\n    <input\n      type=\"password\"\n      class=\"form-control\"\n      v-model.lazy=\"valueConfirmation\"\n      id=\"confirmPassword\"\n      autocomplete=\"off\"\n      v-on:blur=\"updateConfirmation()\"\n    />\n    <p class=\"text-danger\" v-if=\"$v.valueConfirmation.sameAs === false && $v.valueConfirmation.$dirty\">Password confirmation does not match password.</p>\n  </div>\n</div>\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.radio"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<template>\n    <template v-for=\"(option, index) in options\">\n      <div class=\"radio radio-icon\">\n        <input\n                type=\"radio\"\n                :id=\"name + '-' + index\"\n                :name=\"name\"\n                v-model=\"value\"\n                :value=\"option.label || option.id\">\n        <label v-on:click=\"clickHandler(option)\">\n          <span class=\"check\"><i class=\"fa fa-circle\"></i></span> {{ option.label || option.id }}\n        </label>\n      </div>\n    </template>\n    <p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\n</template>\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.select"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<label :for=\"name\" class=\"select-proxy-display\">\n  <select\n          class=\"form-control hidden-select\"\n          :name=\"name\"\n          :id=\"name\"\n          v-model=\"value\"\n          v-on:change=\"updateValue()\">\n    <option v-if=\"placeholder\" value=\"\">{{ placeholder }}</option>\n    <option v-for=\"option in options\" :value=\"option.id || option.label\" :disabled=\"option.disabled\">\n      {{ option.label || option.id }}\n    </option>\n  </select>\n  <span class=\"icon fa fa-chevron-down\"></span>\n  <span class=\"select-value-proxy\"><template v-if=\"value && value !== ''\">{{ value }}</template><template v-else>{{ placeholder }}</template></span>\n</label>\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.signature"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"field-signature\">\n  <canvas :id=\"name\" ref=\"canvas\"></canvas>\n  <a href=\"#\" v-on:click.prevent=\"clean()\"><i class=\"fa fa-times\"></i> Clear</a>\n</div>\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.starRating"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"inverse-direction\">\n  <template v-for=\"(option, index) in values\">\n    <input\n            class=\"rating-input\"\n            :name=\"name\"\n            type=\"radio\"\n            :id=\"name + '-' + index\"\n            v-model=\"value\"\n            :value=\"option.id\"\n            v-on:change=\"updateValue()\"\n    >\n    <label class=\"rating-star\" :for=\"name + '-' + index\">\n      <i class=\"fa fa-star-o\"></i>\n      <i class=\"fa fa-star\"></i>\n    </label>\n  </template>\n</div>\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.telephone"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input\n  type=\"tel\"\n  class=\"form-control\"\n  v-model.trim.lazy=\"value\"\n  v-on:blur=\"updateValue()\"\n  :name=\"name\"\n  :id=\"name\"\n  :placeholder=\"placeholder\"\n/>\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>\n<p class=\"text-danger\" v-if=\"$v.value.phone === false && $v.value.$dirty\">Phone could contain <b>; , . ( ) - + SPACE * #</b> and numbers.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.textarea"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<textarea\n  class=\"form-control\"\n  v-model.trim.lazy=\"value\"\n  v-on:blur=\"updateValue()\"\n  :name=\"name\"\n  :id=\"name\"\n  :placeholder=\"placeholder\"\n  :rows=\"rows\"\n></textarea>\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.time"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"input-group custom-time\">\n  <div class=\"input-group-addon\">\n    <i class=\"fa fa-clock-o\"></i>\n  </div>\n\n  <input \n    type=\"time\"\n    v-model.lazy=\"value\"\n    v-on:change=\"updateValue()\"\n    :name=\"name\"\n    :id=\"name\"\n    :placeholder=\"placeholder\"\n    class=\"form-control\"\n  />\n</div>\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.title"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h2>{{ value }}</h2>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.url"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input\n  type=\"url\"\n  class=\"form-control\"\n  v-model.trim.lazy=\"value\"\n  v-on:blur=\"updateValue()\"\n  :name=\"name\"\n  :id=\"name\"\n  :placeholder=\"placeholder\"\n/>\n<p class=\"text-danger\" v-if=\"$v.value.url === false && $v.value.$ditry\">The input is not a valid URL.</p>\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.wysiwyg"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<textarea\n  class=\"form-control\"\n  v-model.trim.lazy=\"value\"\n  ref=\"textarea\"\n  :name=\"name\"\n  :id=\"name\"\n></textarea>\n<div\n  class=\"ghost-tinymce\"\n  ref=\"ghost\"\n  v-html=\"value\"\n  v-if=\"isInterface\">\n</div>\n<p class=\"text-danger\" v-if=\"$v.value.required === false && $v.value.$dirty\">Field is required.</p>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.configurations.radio"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"form-group\">\n  <label>Default value <small>(Enter one of the options you entered above)</small></label>\n  <input class=\"form-control\" type=\"text\" v-model.trim=\"value\" placeholder=\"Default value\" />\n</div>\n";
},"useData":true});