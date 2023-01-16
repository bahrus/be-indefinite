# be-indefinite [TODO]

*be-indefinite* provides the ability to create a "poor man's web component" (but not a fully fledged web component, just something that resembles a web component).

*be-indefinite* is one of the two element decorators that form a tight bond -- the two i's -- *be-indefinite* and [*be-inquiring*](https://github.com/bahrus/be-inquiring).

*be-indefinite* also has something of an antonymous relationship with [*be-definitive*](https://github.com/bahrus/be-definitive).

*be-definitive* provides a way to declaratively define full fledged custom element, complete with support for shadow DOM, constructible stylesheets, form association, etc.  It is meant for scenarios where that custom element can be used in multiple scenarios, across multiple frameworks, server-side or client-side, etc, with a long-term commitment to longevity a significantly desired outcome.

*be-indefinite*, in contrast, has more of a [Polly-annish](https://en.wikipedia.org/wiki/Along_Came_Polly) approach to life.  It is meant to be used in a setting where it is only used within an uber web component, and nowhere else, and is still highly in flux.  As such, opportunities for short-cuts are pursued as far as defining the "component", requiring less tender-loving-care to produce.  

## Syntax (semantics?)

```html
<template id=menu-option be-indefinite='{
    "from": ["type", "open", "index"],
    "derive": ["hyperlinkCss","transitionDelay", "closed", "labelCss"],
    "transform": {
        "aE": {
            "href": "url",
            "className": "hyperlinkCss",
            ".style.transitionDelay": "transitionDelay"
        },
        "iE":{
            "className": "icon"
        },
        "h3E": {
            "textContent": "label",
            "className": "labelCss"
        }
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

Like its antonymous counterpart, *be-definitive*, *be-indefinite* eagerly awaits [inline-binding template instantiation](https://github.com/rniwa/webcomponents/blob/add-dom-parts-proposal/proposals/DOM-Parts.md) syntax being incorporated into the browser, at which point the syntax above can continue to supplement what the built-in binding supports.  For now, only "binding from a distance" is supported.

What this does:  puts the template into a weak map associated with the root node host.

## Referencing.

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

Cross pollinate syntax with obj-ml.

Ends with -e means "expression from host" (by default)

