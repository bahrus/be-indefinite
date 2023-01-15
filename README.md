# be-indefinite

```html
<template be-gone id=menu-option be-gone be-indefinite='{
    "from": ["type", "open", "index"],
    "derive": ["hyperlinkCss","transitionDelay", "closed", "labelCss"],
    "transform": {
        "aE": {
            "href": "url",
            "className": "hyperlinkCss",
            "disabled": "closed",
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
    <script nomodule be-gone>
        ({type, open, index}) => ({
            hyperlinkCss: `menu-${type}-option`,
            transitionDelay: `${(open ? 200 : 0) + 50*index}ms`,
            closed: !open,
            labelCss: type === 'quick' ? 'tooltip' : 'label'
        })
    </script>
</template>
```