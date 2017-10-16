# handlebars-demo
using template engine [handlebars](http://handlebarsjs.com/) in [skylarkjs](http://skylarkjs.org)

### start
    $ npm install skylarkjs -g
    $ git clone https://github.com/lihongwang/handlebars-demo.git
    $ cd handlebars-demo; npm run build; npm run deploy; npm run serve

### results 
[http://localhost:8086](http://localhost:8086)
### documents
[http://skylarkjs.insidekb.cn/doku.php/66/handlebars](http://skylarkjs.insidekb.cn/doku.php/66/handlebars)
### main file
scripts/routes/home/HomeController.js
```javascript
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
```

scripts/home/home.hbs
```html
<div>
    <script id="main" type="text/x-handlebars-template">
        <div class="container">
            <ul class="items">
                {{> list-partial}}
            </ul>
        </div>
    </script>
    <script id="list-partial" type="text/x-handlebars-template">
        {{#each items}}
            {{> item-partial}}
        {{/each}}
    </script>
    <script id="item-partial" type="text/x-handlebars-template">
        <li>{{name}}</li>
    </script>
</div>

```
