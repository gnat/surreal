# 🗿 Surreal
### Tiny jQuery alternative for plain Javascript with inline [Locality of Behavior](https://htmx.org/essays/locality-of-behaviour/)!

![cover](https://user-images.githubusercontent.com/24665/171092805-b41286b2-be4a-4aab-9ee6-d604699cc507.png)
(Art by [shahabalizadeh](https://www.deviantart.com/shahabalizadeh))
<!--
<a href="https://github.com/gnat/surreal/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Download%20.zip-ff9800?style=for-the-badge&color=%234400e5" alt="Download badge" /></a>

<a href="https://github.com/gnat/surreal"><img src="https://img.shields.io/github/workflow/status/gnat/surreal/ci?label=ci&style=for-the-badge&color=%237d91ce" alt="CI build badge" /></a>
<a href="https://github.com/gnat/surreal/releases"><img src="https://img.shields.io/github/workflow/status/gnat/surreal/release?label=Mini&style=for-the-badge&color=%237d91ce" alt="Mini build badge" /></a>
<a href="https://github.com/gnat/surreal/blob/main/LICENSE"><img src="https://img.shields.io/github/license/gnat/surreal?style=for-the-badge&color=%234400e5" alt="License badge" /></a>-->

## Why does this exist?

For devs who love ergonomics! You may appreciate Surreal if:

* You want to stay as close as possible to Vanilla JS.
* Hate typing `document.querySelector` over.. and over..
* Hate typing `addEventListener` over.. and over..
* Really wish `document.querySelectorAll` had Array functions..
* Really wish `this` would work in any inline `<script>` tag
* Enjoyed using jQuery selector syntax.
* [Animations, timelines, tweens](#-quick-start) with no extra libraries.
* Only 320 lines. No build step. No dependencies.
* Pairs well with [htmx](https://htmx.org)
* Want fewer layers, less complexity. Are aware of the cargo cult. ✈️

## ✨ What does it add to Javascript?

* ⚡️ [Locality of Behavior (LoB)](https://htmx.org/essays/locality-of-behaviour/) Use `me()` inside `<script>`
  * Get an element without creating a unique name: No **.class** or **#id** needed!
  * `this` but better!
  * Want `me` in your CSS `<style>` tags, too? See our [companion script](https://github.com/gnat/css-scope-inline)
* 🔗 Call chaining, jQuery style.
* ♻️ Functions work seamlessly on 1 element or arrays of elements!
  * All functions can use: `me()`, `any()`, `NodeList`, `HTMLElement` (..or arrays of these!)
  * Get 1 element: `me()`
  * ..or many elements: `any()`
  * `me()` or `any()` can chain with any Surreal function.
    * `me()` can be used directly as a single element (like `querySelector()` or `$()`)
    * `any()` can use: `for` / `forEach` / `filter` / `map` (like `querySelectorAll()` or `$()`)
* 🌗 No forced style. Use: `classAdd` or `class_add` or `addClass` or `add_class`
  * Use `camelCase` (Javascript) or `snake_case` (Python, Rust, PHP, Ruby, SQL, *CSS*).

### 🤔 Why use `me()` / `any()` instead of `$()`
* 💡 Solves the classic jQuery bloat problem: Am I getting 1 element or an array of elements?
  * `me()` is guaranteed to return 1 element (or first found, or null).
  * `any()` is guaranteed to return an array (or empty array).
  * No more checks = you write less code. Bonus: Code reads more like self-documenting english.

## 👁️ How does it look?

Do surreal things with [Locality of Behavior](https://htmx.org/essays/locality-of-behaviour/) like:
```html
<label for="file-input" >
  <div class="uploader"></div>
  <script>
    me().on("dragover", ev => { halt(ev); me(ev).classAdd('.hover'); console.log("Files in drop zone.") })
    me().on("dragleave", ev => { halt(ev); me(ev).classAdd('.hover'); console.log("Files left drop zone.") })
    me().on("drop", ev => { halt(ev); me(ev).classRemove('.hover').classAdd('.loading'); me('#file-input').attribute('files', ev.dataTransfer.files); me('#form').send('change') })
  </script>
</label>
```

See the [Live Example](https://gnat.github.io/surreal/example.html)! Then [view source](https://github.com/gnat/surreal/blob/main/example.html).

## 🎁 Install

Surreal is only 320 lines. No build step. No dependencies.

[📥 Download](https://raw.githubusercontent.com/gnat/surreal/main/surreal.js) into your project, and add `<script src="/surreal.js"></script>` in your `<head>`

Or, 🌐 via CDN: `<script src="https://cdn.jsdelivr.net/gh/gnat/surreal@main/surreal.js"></script>`

## ⚡ Usage

### <a name="selectors"></a>🔍️ DOM Selection

* Select **one** element: `me(...)`
  * Can be any of:
    * CSS selector: `".button"`, `"#header"`, `"h1"`, `"body > .block"`
    * Variables: `body`, `e`, `some_element`
    * Events: `event.currentTarget` will be used.
    * Surreal selectors: `me()`,`any()`
    * Choose a start location in the DOM with the 2nd argument. Default is `document`
      * ▶️ `any('button', me('#header')).classAdd('red')`
        * Add `.red` to any `<button>` inside of `#header`
  * `me()` Get current element for [Locality of Behavior](https://htmx.org/essays/locality-of-behaviour/) in `<script>` without an explicit **.class** or **#id**
  * `me("body")` Gets `<body>`
  * `me(".button")` Gets the first `<div class="button">...</div>`. To get all of them use `any()`
* Select **one or more** elements as an array: `any(...)`
  * Similar to `me()` but guaranteed to return an array (or empty array). 
  * `any(".foo")` Gets all matching elements, such as: `<div class="foo">...</div>`
  * Feel free to convert between arrays of elements and single elements: `any(me())`, `me(any(".something"))`
 
### 🔥 DOM Functions

* ♻️ All functions work on single elements or arrays of elements.
* 🔗 Start a chain using `me()` and `any()`
  * 🟢 Style A `me().classAdd('red')` ⭐ Chain style, recommended!
  * 🟠 Style B: `classAdd(me(), 'red')`
* 🌐 Global conveniences help you write less code.
  * `globalsAdd()` will automatically warn about any clobbering issues.
    * If you prefer no conveniences, or are a masochist, delete `globalsAdd()`
      * `me().classAdd('red')` becomes: `surreal.me().classAdd('red')`
      * `classAdd(me(), 'red')` becomes: `surreal.classAdd(surreal.me(), 'red')`

See: [Quick Start](#quick-start) and [Reference](#reference) and [No Surreal Needed](#no-surreal)

## <a name="quick-start"></a>⚡ Quick Start

* Add a class
  * `me().classAdd('red')`
  * `any("button").classAdd('red')`
* Events
  * `me().on("click", ev => me(ev).fadeOut() )`
  * `on(any('button'), 'click', ev => { me(ev).styles('color: red') })`
* Run functions over elements.
  * `any('button').run(_ => { alert(_) })`
* Styles / CSS
  * `me().styles('color: red')`
  * `me().styles({ 'color':'red', 'background':'blue' })`
* Attributes
  * `me().attribute('active', true)`

<a name="timelines"></a>
#### Timeline animations without any libraries.
```html
<div>I change color every second.
  <script>
    // On click, animate something new every second.
    me().on("click", async ev => {
      let el = me(ev) // Save target because async will lose it.
      me(el).styles({ "transition": "background 1s" })
      await sleep(1000)
      me(el).styles({ "background": "red" })
      await sleep(1000)
      me(el).styles({ "background": "green" })
      await sleep(1000)
      me(el).styles({ "background": "blue" })
      await sleep(1000)
      me(el).styles({ "background": "none" })
      await sleep(1000)
      me(el).remove()
    })
  </script>
</div>
```
```html
<div>I fade out and remove myself.
  <script>me().on("click", ev => { me(ev).fadeOut() })</script>
</div>
```
```html
<div>Change color every second.
  <script>
    // Run immediately.
    (async (e = me()) => {
      me(e).styles({ "transition": "background 1s" })
      await sleep(1000)
      me(e).styles({ "background": "red" })
      await sleep(1000)
      me(e).styles({ "background": "green" })
      await sleep(1000)
      me(e).styles({ "background": "blue" })
      await sleep(1000)
      me(e).styles({ "background": "none" })
      await sleep(1000)
      me(e).remove()
    })()
  </script>
</div>
```
```html
<script>
  // Run immediately, for every <button> globally!
  (async () => {
    any("button").fadeOut()
  })()
</script>
```
#### Array methods
```html
any('button')?.forEach(...)
any('button')?.map(...)
```

## <a name="reference"></a>👁️ Functions
Looking for [DOM Selectors](#selectors)?
Looking for stuff [we recommend doing in vanilla JS](#no-surreal)?
### 🧭 Legend
* 🔗 Chainable off `me()` and `any()`
* 🌐 Global shortcut.
* ▶️ Runnable example.
* 🔌 Built-in Plugin
### 👁️ At a glance

* 🔗 `run`
  * It's `forEach` but less wordy and works on single elements, too!
  * ▶️ `me().run(e => { alert(e) })`
  * ▶️ `any('button').run(e => { alert(e) })`
* 🔗 `remove`
  * ▶️ `me().remove()`
  * ▶️ `any('button').remove()`
* 🔗 `classAdd` 🔁 `class_add` 🔁 `addClass` 🔁 `add_class`
  * ▶️ `me().classAdd('active')`
  * Leading `.` is **optional**
    * These are the same: `me().classAdd('active')` 🔁 `me().classAdd('.active')`
* 🔗 `classRemove` 🔁 `class_remove` 🔁 `removeClass` 🔁 `remove_class`
  * ▶️ `me().classRemove('active')`
* 🔗 `classToggle` 🔁 `class_toggle` 🔁 `toggleClass` 🔁 `toggle_class`
  * ▶️ `me().classToggle('active')`
* 🔗 `styles`
  * ▶️ `me().styles('color: red')` Add style.
  * ▶️ `me().styles({ 'color':'red', 'background':'blue' })` Add multiple styles.
  * ▶️ `me().styles({ 'background':null })` Remove style.
* 🔗 `attribute` 🔁 `attributes` 🔁 `attr`
  * Get: ▶️ `me().attribute('data-x')`
    * Get is only for single elements. For many, wrap the call in `any(...).run(...)` or `any(...).forEach(...)`.
  * Set: ▶️`me().attribute('data-x', true)`
  * Set multiple: ▶️ `me().attribute({ 'data-x':'yes', 'data-y':'no' })`
  * Remove: ▶️ `me().attribute('data-x', null)`
  * Remove multiple: ▶️ `me().attribute({ 'data-x': null, 'data-y':null })`
* 🔗 `send` 🔁 `trigger`
  * ▶️ `me().send('change')`
  * ▶️ `me().send('change', {'data':'thing'})`
  * Wraps `dispatchEvent`
* 🔗 `on`
  * ▶️ `me().on('click', ev => { me(ev).styles('background', 'red') })`
  * Wraps `addEventListener`
* 🔗 `off`
  * ▶️ `me().off('click', fn)`
  * Wraps `removeEventListener`
* 🔗 `offAll`
  * ▶️ `me().offAll()`
* 🔗 `disable`
  * ▶️ `me().disable()`
  * Easy alternative to `off()`. Disables click, key, submit events.
* 🔗 `enable`
  * ▶️ `me().enable()`
  * Opposite of `disable()`
* 🌐 `sleep`
  * ▶️ `await sleep(1000, ev => { alert(ev) })`
  * `async` version of `setTimeout`
  * Wonderful for animation timelines.
* 🌐 `tick`
  * ▶️ `await tick()`
  * `await` version of `rAF` / `requestAnimationFrame`.
  * Animation tick. Waits 1 frame.
  * Great if you need to wait for events to propagate.
* 🌐 `rAF`
  * ▶️ `rAF(e => { return e })`
  * Animation tick.  Fires when 1 frame has passed. Alias of [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
  * Great if you need to wait for events to propagate.
* 🌐 `rIC`
  * ▶️ `rIC(e => { return e })`
  * Great time to compute. Fires function when JS is idle. Alias of [requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)
* 🌐 `halt`
  * ▶️ `halt(event)`
  * Prevent default browser behaviors.
  * Wrapper for [preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
* 🌐 `createElement` 🔁 `create_element`
  * ▶️ `e_new = createElement("div"); me().prepend(e_new)`
  * Alias of vanilla `document.createElement`
* 🌐 `onloadAdd` 🔁 `onload_add` 🔁 `addOnload` 🔁 `add_onload`
  * ▶️ `onloadAdd(_ => { alert("loaded!"); })`
  * Execute after the DOM is ready. Similar to jquery `ready()`
  * Queues functions onto `window.onload`
  * Why? So you don't overwrite `window.onload`, also predictable sequential loading!
* 🔌 `fadeOut`
  * See below
* 🔌 `fadeIn`
  * See below

### <a name="plugin-included"></a>🔌 Built-in Plugins

### Effects
Build effects with `me().styles({...})` with timelines using [CSS transitioned `await` or callbacks](#timelines).

Common effects included:

* 🔗 `fadeOut` 🔁 `fade_out`
  * Fade out and remove element.
  * Keep element with `remove=false`.
  * ▶️ `me().fadeOut()`
  * ▶️ `me().fadeOut(ev => { alert("Faded out!") }, 3000)` Over 3 seconds then call function.

* 🔗 `fadeIn` 🔁 `fade_in`
  * Fade in existing element which has `opacity: 0`
  * ▶️ `me().fadeIn()`
  * ▶️ `me().fadeIn(ev => { alert("Faded in!") }, 3000)` Over 3 seconds then call function.


## <a name="no-surreal"></a>🔮 No Surreal Needed

More often than not, Vanilla JS is the easiest way!

Logging
* 🌐 `console.log()` `console.warn()` `console.error()`
* Event logging: ▶️ `monitorEvents(me())` See: [Chrome Blog](https://developer.chrome.com/blog/quickly-monitor-events-from-the-console-panel-2/)

Benchmarking / Time It!
* ▶️ `console.time('name')`
* ▶️ `console.timeEnd('name')`

Text / HTML Content
* ▶️ `me().textContent = "hello world"`
  * XSS Safe! See: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
* ▶️ `me().innerHTML = "<p>hello world</p>"`
* ▶️ `me().innerText = "hello world"`

Children
* ▶️ `me().children`
* ▶️ `me().children.hidden = true`

Append / Prepend elements.
* ▶️ `me().prepend(new_element)`
* ▶️ `me().appendChild(new_element)`
* ▶️ `me().insertBefore(element, other_element.firstChild)`
* ▶️ `me().insertAdjacentHTML("beforebegin", new_element)`

AJAX (replace jQuery `ajax()`)
* Use [htmx](https://htmx.org/) or [htmz](https://leanrada.com/htmz/) or [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or [XMLHttpRequest()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) directly.
* Using `fetch()`
```js
me().on("click", async event => {
  let e = me(event)
  // EXAMPLE 1: Hit an endpoint.
  if((await fetch("/webhook")).ok) console.log("Did the thing.")
  // EXAMPLE 2: Get content and replace me()
  try {
    let response = await fetch('/endpoint')
    if (response.ok) e.innerHTML = await response.text()
    else console.warn('fetch(): Bad response')
  }
  catch (error) { console.warn(`fetch(): ${error}`) }
})
```
* Using `XMLHttpRequest()`
```js
me().on("click", async event => {
  let e = me(event)
  // EXAMPLE 1: Hit an endpoint.
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "/webhook")
  xhr.send()
  // EXAMPLE 2: Get content and replace me()
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "/endpoint")
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) e.innerHTML = xhr.responseText
  }
  xhr.send()
})
```

 ## 💎 Conventions & Tips

* Many ideas can be done in HTML / CSS (ex: dropdowns)
* `_` = for temporary or unused variables. Keep it short and sweet!
* `e`, `el`, `elt` = element
* `e`, `ev`, `evt` = event
* `f`, `fn` = function

#### Scope functions inside `<script>`
  * ⭐ On `me()`
    *  `me().hey = (text) => { alert(text) }`
    *  `me().on('click', (ev) => { me(ev).hey("hi") })`
  * ⭐ Use a block: `{ function hey(text) { alert(text) }; me().on('click', ev => { hey("hi") }) }`
  * ⭐ Use an event: `me().on('click', ev => { /* add and call function here */ })`
  * Use an inline module: `<script type="module">`
    * Note: `me()` will no longer see `parentElement` so explicit selectors are required: `me(".mybutton")`

#### Select a void element like `<input type="text" />`
* Use: `me('-')` or `me('prev')` or `me('previous')`
  * ▶️ `<input type="text" /> <script>me('-').value = "hello"</script>`
  * Shortcut for `me(document.currentScript.previousElementSibling)`
  * Inspired by the CSS sibling combinator `+` but in reverse `-`
* Or, use a relative start.
  * ▶️ `<input type="text" n1 /> <script>me('[n1]', me()).value = "hello"</script>`

#### Ignore call chain when element is missing.
* ▶️ `me("#i_dont_exist")?.classAdd('active')`
* No warnings: ▶️ `me("#i_dont_exist", document, false)?.classAdd('active')`

## <a name="plugins"></a>🔌 Your own plugin

Feel free to modify Surreal for a project any way you like- but you can use plugins to effortlessly merge functions with new versions.

```javascript
function pluginHello(e) {
  function hello(e, name="World") {
    console.log(`Hello ${name} from ${e}`)
    return e // Make chainable.
  }
  // Add sugar
  e.hello = (name) => { return hello(e, name) }
}

surreal.plugins.push(pluginHello)
```

You can now use it like: `me().hello("Internet")`

* See the included `pluginEffects` for a more comprehensive example.
* Your functions will be added globally by `globalsAdd()` If you do not want this, add it to the restricted list.
* Refer to an existing function to see how to make yours work with 1 or many elements.

Make an [issue](https://github.com/gnat/surreal/issues) or [pull request](https://github.com/gnat/surreal/pulls) if you think people would like to use it! If it's useful enough we'll want it in core.

### ⭐ Awesome Surreal examples, plugins, and resources: [awesome-surreal](https://github.com/gnat/awesome-surreal) !

## 📚️ Inspired by

* [jQuery](https://jquery.com/) for the chainable syntax we all love.
* [BlingBling.js](https://github.com/argyleink/blingblingjs) for modern minimalism.
* [Bliss.js](https://blissfuljs.com/) for a focus on single elements and extensibility.
* [Hyperscript](https://hyperscript.org) for Locality of Behavior and awesome ergonomics.
* Shout out to [Umbrella](https://umbrellajs.com/), [Cash](https://github.com/fabiospampinato/cash), [Zepto](https://zeptojs.com/)- Not quite as ergonomic. Requires build step to extend.

## 🌘 Future
* Always more `example.html` goodies!
* Automated browser testing perhaps with:
  * [Fava](https://github.com/fabiospampinato/fava). See: https://github.com/avajs/ava/issues/24#issuecomment-885949036
  * [Ava](https://github.com/avajs/ava/blob/main/docs/recipes/browser-testing.md)
  * [jsdom](https://github.com/jsdom/jsdom)
    * [jsdom notes](https://github.com/jsdom/jsdom#executing-scripts)
