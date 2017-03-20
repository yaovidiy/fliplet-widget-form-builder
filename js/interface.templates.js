this["Fliplet"] = this["Fliplet"] || {};
this["Fliplet"]["Widget"] = this["Fliplet"]["Widget"] || {};
this["Fliplet"]["Widget"]["Templates"] = this["Fliplet"]["Widget"]["Templates"] || {};

this["Fliplet"]["Widget"]["Templates"]["templates.configurations.form"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<form v-on:submit.prevent=\"__onSubmit\">\n  <div class=\"form-group\">\n    <label>Field ID</label>\n    <input class=\"form-control\" type=\"text\" v-model.trim=\"name\" placeholder=\"Field name\" />\n  </div>\n\n  <div class=\"form-group\">\n    <label>Field description</label>\n    <input class=\"form-control\" type=\"text\" v-model.trim=\"label\" placeholder=\"Field description\" />\n  </div>\n\n  "
    + ((stack1 = ((helper = (helper = helpers.template || (depth0 != null ? depth0.template : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"template","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n\n  <button type=\"submit\" class=\"btn btn-primary\">Save changes</button>\n</form>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.configurations.input"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"form-group\">\n  <label>Default value</label>\n  <input class=\"form-control\" type=\"text\" v-model.trim=\"value\" placeholder=\"Default value\" />\n</div>";
},"useData":true});