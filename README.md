# be-indefinite

```html
<template be-gone id=menu-option be-indefinite='{
    "from": ["type", "open", "index"],
    "derive": ["hyperlinkCss","transitionDelay", "closed", "labelCss"],
    "transform": {
        "aE": {
            "href": "url",
            "className": "hyperlinkCss",
            ".style.transitionDelay": "transitionDelay",
        },
        "iE":{
            "className": "icon"
        },
        "h3E": {
            "textContent": "label",
            "className": "labelCss",
        },
    }
}'>
    <a target="_blank">
        <i></i>
        <h3></h3>
    </a>
    <script nomodule>
        ({type, open, index}) => ({
            hyperlinkCss: `menu-${type}-option`,
            transitionDelay: `${(open ? 200 : 0) + 50*index}ms`,
            closed: !open,
            labelCss: type === 'quick' ? 'tooltip' : 'label'
        })
    </script>
</template>
```

What this does:  puts the template into a weak map associated with the root node host.

## referencing.

During template instantiation, and only during instantiation (or after an XSLT Transformation, before adding to the live DOM tree):

```html
<menu-option index-n=5 type-e="type" icon-e="options@index.icon" be-inquiring></menu-option >
```

gets replaced with:

```html
<template data-cnt=2></template>
<a href=... class=... style="transition-delay:..." target="_blank">
    <i class=...></i>
    <h3 class=...>...</h3>
</a>
```

...with the values passed in from the host:  host.type, host.options[5].icon, etc.  The template tag provides a gateway for passing in new values (optional)

Cross pollinate syntax ith obj-ml.

Ends with -e means expression from host (by default)

