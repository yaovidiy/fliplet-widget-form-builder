this["Fliplet"] = this["Fliplet"] || {};
this["Fliplet"]["Widget"] = this["Fliplet"]["Widget"] || {};
this["Fliplet"]["Widget"]["Templates"] = this["Fliplet"]["Widget"]["Templates"] || {};

this["Fliplet"]["Widget"]["Templates"]["templates.configurations.form"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"form-group\">\n      <label>Options (one per line)</label>\n      <textarea v-on:input=\"_setOptions($event.target.value)\" class=\"form-control\" v-model=\"_options\"></textarea>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", buffer = 
  "<form v-on:submit.prevent=\"onSubmit\">\n  <div class=\"form-group\">\n    <label>Field ID</label>\n    <input class=\"form-control\" type=\"text\" v-model.trim=\"name\" placeholder=\"Field name\" />\n  </div>\n\n  <div class=\"form-group\">\n    <label>Field description</label>\n    <input class=\"form-control\" type=\"text\" v-model.trim=\"label\" placeholder=\"Field description\" />\n  </div>\n\n  <div class=\"form-group\">\n    <label>Is this field required?</label>\n    <select v-model=\"required\">\n      <option value=\"true\">Yes</option>\n      <option value=\"false\">No</option>\n    </select>\n  </div>\n\n";
  stack1 = ((helper = (helper = helpers.hasOptions || (depth0 != null ? depth0.hasOptions : depth0)) != null ? helper : alias2),(options={"name":"hasOptions","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.hasOptions) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n  "
    + ((stack1 = ((helper = (helper = helpers.template || (depth0 != null ? depth0.template : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"template","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n\n  <button type=\"submit\" class=\"btn btn-primary\">Save changes</button>\n</form>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.configurations.input"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"form-group\">\n  <label>Default value</label>\n  <input class=\"form-control\" type=\"text\" v-model.trim=\"value\" placeholder=\"Default value\" />\n</div>\n<div class=\"form-group\">\n  <label>Placeholder</label>\n  <input class=\"form-control\" type=\"text\" v-model.trim=\"placeholder\" placeholder=\"Placeholder\" />\n</div>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.configurations.select"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"form-group\">\n  <label>Option placeholder</label>\n  <input class=\"form-control\" type=\"text\" v-model.trim=\"placeholder\" placeholder=\"Placeholder\" />\n</div>";
},"useData":true});