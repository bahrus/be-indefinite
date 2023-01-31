# be-indefinite [WIP]

*be-indefinite* provides the ability to create a "poor man's web component".  It *can* be (lazily) turned into a web component by the external consumer of this decorator, but it doesn't make sense in some cases to do so. 

<!--*be-indefinite* is one of the two element decorators that form a tight bond -- the two i's -- *be-indefinite* and [*be-inquiring*](https://github.com/bahrus/be-inquiring).-->

*be-indefinite* has something of an antonymous relationship with [*be-definitive*](https://github.com/bahrus/be-definitive).

*be-definitive* provides a way to declaratively define a full fledged custom element, complete with support for shadow DOM, constructible stylesheets, form association, etc.  It is meant for scenarios where that custom element can be used in multiple scenarios, across multiple frameworks, server-side or client-side, etc, with longevity a significantly desired outcome.  

*be-indefinite*, in contrast, often has more of a [Polly-annish](https://en.wikipedia.org/wiki/Along_Came_Polly) approach to life.  It is meant to be used in a setting where it is only used within a containing web component, and nowhere else, and is still highly in flux as far as naming / functionality.  Use of TypeScript, for example, seems like overkill.  As such, opportunities for short-cuts are pursued as far as defining the "component", requiring less tender-loving-care to produce.  It might make much more sense to make *be-indefinite* adorned elements into web components once [scoped custom elements](https://chromestatus.com/feature/5090435261792256) is a thing.  

But even then, there may be scenarios where we really don't want to devote a nesting tag in the final output to define some custom-element like behavior (for example, within a [table](https://reactjs.org/docs/fragments.html) or ul/li markup). <!--or utility tag services like for-each-->. 

## Lingo

```html
<template id=menu-option be-indefinite>
    <a target="_blank">
        <i></i>
        <h3></h3>
    </a>
    <script transform='{
        "a": {
            "href": "url",
            "className": "hyperlinkCss",
            ".style.transitionDelay": "transitionDelay"
        },
        "i":{
            "className": "icon"
        },
        "h3": {
            "textContent": "label",
            "className": "labelCss"
        }
    }'>
        ({type, open, index}) => ({
            hyperlinkCss: `menu-${type}-option`,
            transitionDelay: `${(open ? 200 : 0) + 50*index}ms`,
            closed: !open,
            labelCss: type === 'quick' ? 'tooltip' : 'label'
        })
    </script>
</template>
```

Shorthand for:

```html
<script nomodule>
    export const islet = ({type, open, index}) => ({
        hyperlinkCss: `menu-${type}-option`,
        transitionDelay: `${(open ? 200 : 0) + 50*index}ms`,
        closed: !open,
        labelCss: type === 'quick' ? 'tooltip' : 'label'
    })
</script>
```


Like its antonymous counterpart, *be-definitive*, *be-indefinite* eagerly awaits [inline-binding template instantiation](https://github.com/rniwa/webcomponents/blob/add-dom-parts-proposal/proposals/DOM-Parts.md) syntax being incorporated into the browser, at which point the syntax above can continue to supplement what the built-in binding supports.  For now, only "binding from a distance" is supported.

What this does:  puts the template into a weak map associated with the root node host.

<!--## Referencing.

During template instantiation, and only during instantiation (or after an XSLT Transformation, before adding to the live DOM tree):

```html
<menu-option index-n=5 type-e="type" icon-e="options@index.icon" be-inquiring></menu-option>
```

gets replaced with:

```html
<template data-cnt=2 data-spawn-of=menu-option></template>
<a href=... class=... style="transition-delay:..." target="_blank">
    <i class=...></i>
    <h3 class=...>...</h3>
</a>
```

...with the values passed in from the host:  host.type, host.options[5].icon, etc.  The template tag provides a gateway for passing in new values (optional)

Cross pollinate syntax with obj-ml.

Ends with -e means "expression from host" (by default)

Synergies with be-inclusive (birtualize)-->

