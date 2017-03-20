this["Fliplet"] = this["Fliplet"] || {};
this["Fliplet"]["Widget"] = this["Fliplet"]["Widget"] || {};
this["Fliplet"]["Widget"]["Templates"] = this["Fliplet"]["Widget"]["Templates"] || {};

this["Fliplet"]["Widget"]["Templates"]["templates.components.checkbox"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<template v-for=\"(option, index) in options\">\n  <label v-bind:for=\"name + '-' + index\">\n    <input type=\"checkbox\" v-bind:id=\"name + '-' + index\" v-bind:name=\"name\" v-model=\"value\" v-bind:value=\"option.id\"/> {{ option.id }}&nbsp;&nbsp;&nbsp;\n  </label>\n</template>\n<span>Checked names: {{ value }}</span>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.field"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"form-group\">\n  <label class=\"col-sm-12 control-label\" v-bind:for=\"name\">{{ label }}</label>\n  <div class=\"col-sm-12\">\n    "
    + ((stack1 = ((helper = (helper = helpers.template || (depth0 != null ? depth0.template : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"template","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n  </div>\n</div>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.input"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input v-bind:name=\"name\" v-bind:id=\"name\" class=\"form-control\" type=\"text\" v-model=\"value\" v-bind:placeholder=\"placeholder\" />";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.radio"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<template v-for=\"(option, index) in options\">\n  <label v-bind:for=\"name + '-' + index\">\n    <input type=\"radio\" v-bind:id=\"name + '-' + index\" v-bind:name=\"name\" v-model=\"value\" v-bind:value=\"option.id\"/> {{ option.id }}&nbsp;&nbsp;&nbsp;\n  </label>\n</template>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.components.select"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<select class=\"form-control\" v-bind:name=\"name\" v-bind:id=\"name\" v-model=\"value\">\n  <option v-if=\"placeholder\" value=\"\" disabled=\"disabled\">{{ placeholder }}</option>\n  <option v-for=\"option in options\" v-bind:value=\"option.id\" v-bind:disabled=\"option.disabled\">\n    {{ option.name }}\n  </option>\n</select>";
},"useData":true});