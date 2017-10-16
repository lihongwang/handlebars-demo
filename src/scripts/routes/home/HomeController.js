define([
    "skylarkjs",
    "handlebars",
    "text!scripts/data/items.json",
    "text!scripts/routes/home/home.hbs"
], function(skylarkjs, handlebars, itemsJson, homeTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "HomeController",

        rendering: function(e) {
            var items = JSON.parse(itemsJson),
                selector = $(langx.trim(homeTpl));
            handlebars.registerPartial("item-partial", langx.trim(selector.find("#item-partial").html()).replace(/\{\{&gt;/g, "{{>"));
            handlebars.registerPartial("list-partial", langx.trim(selector.find("#list-partial").html()).replace(/\{\{&gt;/g, "{{>"));
            var tpl = handlebars.compile(langx.trim(selector.find("#main").html()).replace("{{&gt;", "{{>"));
            e.content = tpl({
                items: items
            });
        },

        entered: function() {},
        exited: function() {}
    });
});
