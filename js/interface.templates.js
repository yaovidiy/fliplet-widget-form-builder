this["Fliplet"] = this["Fliplet"] || {};
this["Fliplet"]["Widget"] = this["Fliplet"]["Widget"] || {};
this["Fliplet"]["Widget"]["Templates"] = this["Fliplet"]["Widget"]["Templates"] || {};

this["Fliplet"]["Widget"]["Templates"]["templates.configurations.input"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\n  <div class=\"form-group\">\n    <label>Field name</label>\n    <input class=\"form-control\" type=\"text\" v-model.lazy.trim=\"name\" placeholder=\"Field name\" />\n  </div>\n  <div class=\"form-group\">\n    <label>Default value</label>\n    <input class=\"form-control\" type=\"text\" v-model.lazy.trim=\"val\" placeholder=\"Default value\" />\n  </div>\n<div>";
},"useData":true});