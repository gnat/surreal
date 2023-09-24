# 🗿 Surreal - mini jQuery alternative for vanilla JS with inline Locality of Behavior

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

## ✨ What will this add to my vanilla javascript?

* ⚡️ [Locality of Behavior (LoB)](https://htmx.org/essays/locality-of-behaviour/) Use `me()` inside `<script>`
  * Get an element without creating a unique name: No **.class** or **#id** needed!
  * `this` but better!
  * Want to use it in your CSS `<style>` tags, too? See our [companion script](https://github.com/gnat/css-scope-inline)
* 🔗 Call chaining, jQuery style.
* ♻️ Functions work seamlessly on one element or arrays of elements!
  * All functions can use: `me()`, `any()`, `NodeList`, `HTMLElement` (..or arrays of these!)
  * Get 1 element: `me()`
  * ..or many elements: `any()`
  * `me()` or `any()` can chain with any Surreal function.
    * `me()` can be used directly as a single element (like `querySelector()` or `$()`)
    * `any()` can use: `for` / `forEach` / `filter` / `map` (like `querySelectorAll()` or `$()`)
* 🌗 No forced style. Use: `class_add` or `classAdd` or `add_class` or `addClass`
  * Use `camelCase` (Javascript) or `snake_case` (Python, Rust, PHP, Ruby, SQL, *CSS*).

### 🤔 Why use `me()` / `any()` instead of `$()`
* 💡 We solve the classic jQuery code bloat problem: Am I getting 1 element or an array of elements?
  * `me()` is guaranteed to return 1 element (or first found, or none).
  * `any()` is guaranteed to return an array (or empty array).
  * No more checks! Write less code! Bonus: Code reads more like self-documenting english.

## 👁️ How does it look?

Do surreal things with [Locality of Behavior](https://htmx.org/essays/locality-of-behaviour/) like:
```html
<label for="file-input" >
  <div class="uploader"></div>
  <script>
    me().on("dragover", ev => { halt(ev); me(ev).classAdd('.hover'); console.log("Files in drop zone.") })
    me().on("dragleave", ev => { halt(ev); me(ev).classAdd('.hover'); console.log("Files left drop zone.") })
    me().on("drop", ev => { halt(ev); me(ev).classRemove('.hover').classAdd('.loading'); me('#file-input').attribute('files', ev.dataTransfer.files); me('#form').trigger('change') })
  </script>
</label>
```

See the [Live Example](https://gnat.github.io/surreal/showcase.html)! Then [view source](https://github.com/gnat/surreal/blob/main/showcase.html).

## 🎁 Install

Surreal is only 320 lines. No build step. No dependencies.

[📥 Download](https://raw.githubusercontent.com/gnat/surreal/main/surreal.js) into your project, and add `<script src="/surreal.js"></script>` in your `<head>`

Or, 🌐 use the CDN: `<script src="https://cdn.jsdelivr.net/gh/gnat/surreal/surreal.js"></script>`

## ➡️ Usage Overview

### <a name="selectors"></a>🔍️ DOM Selection

* Select **one** element: `me(...)`
  * Can be any of:
    * CSS selector: `".button"`, `"#header"`, `"h1"`, `"body > .block"`
    * Variables: `body`, `elt`, `some_element`
    * Events: the `event.target` will be used.
    * Surreal selectors: `me()`,`any()`
    * Adding the `, start=` parameter provides a starting point to select from, default is `document`.
      * Example: `any('button', start='header').classAdd('red')`
  * `me()` Get current element for [Locality of Behavior](https://htmx.org/essays/locality-of-behaviour/) in `<script>` without an explicit **.class** or **#id**
  * `me("body")` Gets `<body>`
  * `me(".button")` Gets the first `<div class="button">...</div>`. To get all of them use `any()`
* Select **one or more** elements as an array: `any(...)`
  * Similar to `me()` but guaranteed to return an array (or empty array). 
  * `any(".button")` Gets all matching elements, example: `<div class="button">...</div>`
  * Feel free to convert between arrays of elements and single elements: `any(me())`, `me(any(".something"))`
 
### ⚙️ DOM Functions

* ♻️ All functions work on single elements or arrays of elements.
* 🔗 Start a chain using `me()` and `any()`
  * 🟢 Style A - 🔗 Chain style
    * `me().classAdd('red')` (⭐ *RECOMMENDED*)
      * Alternative, no conveniences: `$.me().classAdd('red')`
  * 🟠 Style B
    * `classAdd(me(), 'red')`
      * Alternative, no conveniences: `$.classAdd($.me(), 'red')`
* 🌐 Global conveniences help you write less code.
  * `globalsAdd()` will automatically warn about any clobbering issues. If you prefer no conveniences, just delete `globalsAdd()`

See: [Quick Start](#quick-start) and [Reference](#reference) and [No Surreal Needed](#no-surreal)

## <a name="quick-start"></a>🔥 Quick Start

* Add a class
  * `me().classAdd('red')`
  * `any("button").classAdd('red')`
* Events
  * `me().on("click", ev => me(ev).fade_out() )`
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
    // Locality of Behavior
    me().on("click", async ev => {
      me(ev).styles({ "transition": "background 1s" })
      await sleep(1000)
      me(ev).styles({ "background": "red" })
      await sleep(1000)
      me(ev).styles({ "background": "green" })
      await sleep(1000)
      me(ev).styles({ "background": "blue" })
      await sleep(1000)
      me(ev).styles({ "background": "none" })
      await sleep(1000)
      me(ev).remove()
    })
  </script>
</div>
```
```html
<div>I fade out and remove myself.
  <script>
    // Keepin it simple! Locality of Behavior.
    me().on("click", ev => { me(ev).fadeOut() })
  </script>
</div>
```
```html
<div>I change color every second.
<script>
  // Run on load.
  (async (el = me())=>{
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
  })()
</script>
</div>
```
```html
<script>
  // Keepin it simple! Globally!
  (async ()=>{
    any("button").fadeOut()
  })()
</script>
```
#### Array methods
```html
any('button')?.forEach(...)
any('button')?.map(...)
```

## <a name="reference"></a>👁️ Function Reference
Looking for [DOM Selectors](#selectors)?
### 🧭 Legend
* 🔗 Chainable off `me()` and `any()`
* 🌐 Global convenience helper.
* ▶️ Runnable example.
* 🔌 Built-in Plugin
### 👁️ At a glance

* 🔗 `run`
  * It's `forEach` but less wordy and works on single elements, too!
  * ▶️ `me().run(el => { alert(el) })`
  * ▶️ `any('button').run(el => { alert(el) })`
* 🔗 `remove`
  * ▶️ `me().remove()`
  * ▶️ `any('button').remove()`
* 🔗 `classAdd` 🔁 `class_add` 🔁 `addClass` 🔁 `add_class`
  * ▶️ `me().classAdd('active')`
  * Leading `.` is optional for all class functions, to prevent typical syntax errors with `me()` and `any()`.
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
* 🔗 `trigger`
  * ▶️ `me().trigger('hello')`
  * Wraps `dispatchEvent`
* 🔗 `on`
  * ▶️ `me().on('click', ev => { me(ev).styles('background', 'red') })`
  * Wraps `addEventListener`
* 🔗 `off`
  * ▶️ `me().remove('click')`
  * Wraps `removeEventListener`
* 🔗 `offAll`
  * ▶️ `me().offAll()`
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
  * Great to prevent default browser behavior: such as displaying an image vs letting JS handle it.
  * Wrapper for [preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
* 🌐 `createElement` 🔁 `create_element`
  * ▶️ `el_new = createElement("div"); me().prepend(el_new)`
  * Alias of vanilla `document.createElement`
* 🌐 `onloadAdd` 🔁 `onload_add` 🔁 `addOnload` 🔁 `add_onload`
  * ▶️ `onloadAdd(_ => { alert("loaded!"); })`
  * Execute after the DOM is ready. Similar to jquery `ready()`
  * Queues functions onto `window.onload`
  * Why? So you don't overwrite `window.onload`, also predictable sequential loading!

### <a name="plugin-included"></a>🔌 Built-in Plugins

#### Effects
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


### <a name="no-surreal"></a>🔮 No Surreal Needed

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
* ▶️ `me().prepend(el_new)`
* ▶️ `me().appendChild(el_new)`
* ▶️ `me().insertBefore(el_new, el.firstChild)`
* ▶️ `me().insertAdjacentHTML("beforebegin", el_new)`

 ## 💎 Conventions & Tips

* `_` = for temporary or unused variables. Keep it short and sweet!
* `e`, `el`, `elt` = element
* `e`, `ev`, `evt` = event
* `f`, `fn` = function
* Developer ergonomics and simplicity wins.
* Find the layer where the change needs to touch the least places.
* Animations are done with `me().styles(...)` with CSS transitions. Use `await sleep(...)` for timelining.
* Dropdowns can be done in pure HTML / CSS.

## <a name="plugins"></a>🔌 Adding a function

Feel free to modify Surreal for a particular project; but you can use this system to effortlessly merge functions with new versions.

1. Add your function
 ```javascript
 var $thing = {
   test(e, name) {
     console.log(`Hello ${name} from ${e}`)
     return e
   }
 }
 $ = {...$, ...$thing}
 ```
2. Is your function chainable? Add to `sugar()`
 ```javascript
 $.sugars['test'] = (name) => { return $.test($._e, name) }
 ```
3. Your function will be added globally by `globalsAdd()` If you do not want this (ex: name clash), add it to the restricted list.

Refer to an existing function to see how to make your function work with 1 or many elements.

Make an [issue](https://github.com/gnat/surreal/issues) or [pull request](https://github.com/gnat/surreal/pulls) if you think people would like to use it! If it's useful enough we'll want it in core.

## 📚️ Inspired by

* [jQuery](https://jquery.com/) for the chainable syntax we all love.
* [BlingBling.js](https://github.com/argyleink/blingblingjs) for modern minimalism.
* [Bliss.js](https://blissfuljs.com/) for a focus on single elements and extensibility.
* [Hyperscript](https://hyperscript.org) for Locality of Behavior and awesome ergonomics.
* Shout out to [Umbrella](https://umbrellajs.com/), [Cash](https://github.com/fabiospampinato/cash), [Zepto](https://zeptojs.com/)- Not quite as ergonomic. Requires build step to extend.

## 🌘 Future
* Always more `showcase.html` goodies!
* Automated browser testing perhaps with:
  * [Fava](https://github.com/fabiospampinato/fava). See: https://github.com/avajs/ava/issues/24#issuecomment-885949036
  * [Ava](https://github.com/avajs/ava/blob/main/docs/recipes/browser-testing.md)
  * [jsdom](https://github.com/jsdom/jsdom)
    * [jsdom notes](https://github.com/jsdom/jsdom#executing-scripts)
