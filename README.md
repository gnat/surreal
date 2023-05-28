# 🗿 Surreal - Hyper minimalist jQuery alternative

![cover](https://user-images.githubusercontent.com/24665/171092805-b41286b2-be4a-4aab-9ee6-d604699cc507.png)
(Art by [shahabalizadeh](https://www.deviantart.com/shahabalizadeh))
<!--
<a href="https://github.com/gnat/surreal/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Download%20.zip-ff9800?style=for-the-badge&color=%234400e5" alt="Download badge" /></a>

<a href="https://github.com/gnat/surreal"><img src="https://img.shields.io/github/workflow/status/gnat/surreal/ci?label=ci&style=for-the-badge&color=%237d91ce" alt="CI build badge" /></a>
<a href="https://github.com/gnat/surreal/releases"><img src="https://img.shields.io/github/workflow/status/gnat/surreal/release?label=Mini&style=for-the-badge&color=%237d91ce" alt="Mini build badge" /></a>
<a href="https://github.com/gnat/surreal/blob/main/LICENSE"><img src="https://img.shields.io/github/license/gnat/surreal?style=for-the-badge&color=%234400e5" alt="License badge" /></a>-->

## Why does this exist?

For devs who love ergonomics!

If you agree with any of the following, you may appreciate Surreal:

* Want to stay close to Vanilla JS.
* Hate typing `document.querySelector` over.. and over..
* Hate typing `addEventListener` over.. and over..
* Really wish `document.querySelectorAll` had Array functions..
* Really wish `this` would work in child `<script>` tags.
* Enjoyed using jQuery selector syntax.
* Want it dependency-free with **no build step**.
* [Zero depedencies to do async animations, timelining, tweens](#-quick-start)
* Want fewer layers, less complexity, crazy speed.
* Pairs well with [htmx](https://htmx.org)
* Are aware of the cargo cult. ✈️

## ✨ What advantages does it bring to the table?

* 🔗 Call chaining, jQuery style.
* ⚡️ [Locality of Behavior (LoB)](https://htmx.org/essays/locality-of-behaviour/) Use `me()` inside `<script>` to get an element without a unique id.
  * No **.class** or **#id** needed!
  * `this` but better.
* ♻️ Seamlessly use individual elements and/or arrays of elements.
  * Use any of: `me()`, `any()`, `HTMLElement`, `NodeList`, `Array` of `HTMLElement`
  * Explicitly get one element: `me()` or many elements: `any()`
    * `me()` or `any()` can chain with any Surreal function.
      * `me()` can be used directly as a single element (like `querySelector()`)
      * `any()` can be used with: `for` / `forEach` / `filter` / `map` (like `querySelectorAll()` or `$()`)
* 🌗 No forced style: `class_add` is just an alias of `classAdd`
  * Use `camelCase` (Javascript) or `snake_case` (Python, Rust, PHP, Ruby, SQL, *CSS*).

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

## 👁️ Live Example

Get a taste- see the [Showcase](https://gnat.github.io/surreal/showcase.html)! Then [view source](https://github.com/gnat/surreal/blob/main/showcase.html).

## 🎁 Installation

Surreal is a dependency-free, browser-oriented javascript library with zero build steps.

[Download Surreal](https://github.com/gnat/surreal/archive/refs/heads/main.zip) and drag `surreal.js` into a directory of your project. Add `<script>` to your `<head>`.
```html
<script src="surreal.js"></script>
```

## 🤔 Why choose `me()` and `any()` over `$()` and `$$()`
* Fewer needed sanity checks: unlike jQuery where `$()` returns different things depending on context.
* Readability. Reads more like English, can be self describing.
* Convenience of using elements directly instead of an "Array of elements" all the time.

## 📚️ Inspired by

* [jQuery](https://jquery.com/) for the chainable syntax we all love.
* [BlingBling.js](https://github.com/argyleink/blingblingjs) for modern minimalism.
* [Bliss.js](https://blissfuljs.com/) for a focus on single elements and extensibility.
* [Hyperscript](https://hyperscript.org) for Locality of Behavior and awesome ergonomics.
* Shout out to [Umbrella](https://umbrellajs.com/), [Cash](https://github.com/fabiospampinato/cash), [Zepto](https://zeptojs.com/)- Not quite as ergonomic or extensible.

## 🔥 Usage Overview

### <a name="selectors"></a>🔍️ DOM Selection

Select **one** element directly.
* `me(...)`
  * `me()` Get the current element.
     * Provides [Locality of Behavior](https://htmx.org/essays/locality-of-behaviour/) in `<script>` without a unique identifier (no **class**, no **id**).
  * `me(body)` Get only one element.
  * `me("button")` If more than one match, get only the first one.


Select **one or more** elements as an Array.
* `any(...)`

Convert between a direct single element and an Array of elements using `any(me())`, `me(any(".thing"))`

### `...` can be any of:
* CSS selector string: `"#header"`, `"button"`, `".red_label"`, `"body > .block"`
* Variables: `body`, `elt`, `some_element`
* Events: `event.target` will be used.
* Themselves: `me()`,`any()`
* `start=` parameter provides a starting point to select from, default is `document`.
  * `any('button', start='header').classAdd('red')`

### ⚙️ DOM Functions

* ♻️ All can use either single elements or arrays of elements transparently!
* 🔗 Chaining off `me()` and `any()` and many others supported.
* 🌐 Global conveniences can be turned off if desired by removing `globalsAdd()`
  * `globalsAdd()` will automatically warn about any clobbering issues.

#### 🟢 Style A (🔗 Chaining 😎 *RECOMMENDED STYLE*)

* 🔥 `me().classAdd('red')`
* No convenience globals: `$.me().classAdd('red')`

#### 🟠 Style B (Classic)
* 🔥 `classAdd(me(), 'red')`
* No convenience globals: `$.classAdd($.me(), 'red')`

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
* 🔥 Runnable example.
* 🔌 Built-in Plugin
### 👁️ At a glance

* 🔗 `run`
  * 🔥 `me().run(el => { alert(el) })`
  * 🔥 `any('button').run(el => { alert(el) })`
  * It's `forEach` but less wordy and works on single elements.
* 🔗 `remove`
  * 🔥 `me().remove()`
  * 🔥 `any('button').remove()`
* 🔗 `classAdd` or `class_add`
  * 🔥 `me().classAdd('active')`
  * Leading `.` is optional for all class functions, to prevent typical syntax errors with `me()` and `any()`.
    * `me().classAdd('active')` and `me().classAdd('.active')` are equivalent.
* 🔗 `classRemove` or `class_remove`
  * 🔥 `me().classRemove('active')`
* 🔗 `classToggle` or `class_toggle`
  * 🔥 `me().classToggle('active')`
* 🔗 `styles`
  * 🔥 `me().styles('color: red')` Add style.
  * 🔥 `me().styles({ 'color':'red', 'background':'blue' })` Add multiple styles.
  * 🔥 `me().styles({ 'background':null })` Remove style.
* 🔗 `attribute` or `attributes` or `attr`
  * Get: 🔥 `me().attribute('data-x')`
    * Get is only for single elements. For many, wrap the call in `any(...).run(...)` or `any(...).forEach(...)`.
  * Set: 🔥 `me().attribute('data-x', true)`
  * Set multiple: 🔥 `me().attribute({ 'data-x':'yes', 'data-y':'no' })`
  * Remove: 🔥 `me().attribute('data-x', null)`
  * Remove multiple: 🔥 `me().attribute({ 'data-x': null, 'data-y':null })`
* 🔗 `trigger`
  * 🔥 `me().trigger('hello')`
  * Wraps `dispatchEvent`
* 🔗 `on`
  * 🔥 `me().on('click', ev => { me(ev).styles('background', 'red') })`
  * Wraps `addEventListener`
* 🔗 `off`
  * 🔥 `me().remove('click')`
  * Wraps `removeEventListener`
* 🔗 `offAll`
  * 🔥 `me().offAll()`
* 🌐 `sleep`
  * 🔥 `await sleep(1000, ev => { alert(ev) })`
  * `async` version of `setTimeout`
  * Wonderful for animation timelines.
* 🌐 `tick`
  * 🔥 `await tick()`
  * `await` version of `rAF` / `requestAnimationFrame`.
  * Animation tick. Waits 1 frame.
  * Great if you need to wait for events to propagate.
* 🌐 `rAF`
  * 🔥 `rAF(e => { return e })`
  * Animation tick.  Fires when 1 frame has passed. Alias of [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
  * Great if you need to wait for events to propagate.
* 🌐 `rIC`
  * 🔥 `rIC(e => { return e })`
  * Great time to compute. Fires function when JS is idle. Alias of [requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)
* 🌐 `halt`
  * 🔥 `halt(event)`
  * Great to prevent default browser behavior: such as displaying an image vs letting JS handle it.
  * Wrapper for [preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
* 🌐 `createElement` or `create_element`
  * 🔥 `el_new = createElement("div"); me().prepend(el_new)`
  * Alias of `document.createElement`
* 🌐 `onloadAdd` or `onload_add`
  * 🔥 `onloadAdd(_ => { alert("loaded!"); })`
  * Execute after the DOM is ready. Similar to jquery `ready()`
  * Queues functions onto `window.onload`
  * Why? So you don't overwrite `window.onload`, also predictable sequential loading!

### <a name="plugin-included"></a>🔌 Built-in Plugins

#### Effects
Build your own effects with `me().styles({...})` then timelining with [CSS transitions using `await` or callbacks](#timelines). We ship some common effects:

* 🔗 `fadeOut` or `fade_out`
  * Fade out and remove element.
  * Keep element with `remove=false`.
  * 🔥 `me().fadeOut()`
  * 🔥 `me().fadeOut(ev => { alert("Faded out!") }, 3000)` Over 3 seconds then call function.

* 🔗 `fadeIn` or `fade_in`
  * Fade in existing element which has `opacity: 0`
  * 🔥 `me().fadeIn()`
  * 🔥 `me().fadeIn(ev => { alert("Faded in!") }, 3000)` Over 3 seconds then call function.


### <a name="no-surreal"></a>🔮 No Surreal Needed

More often than not, Vanilla JS is the easiest way!

Logging
* 🌐 `console.log()` `console.warn()` `console.error()`
* Event logging: 🔥 `monitorEvents(me())` See: [Chrome Blog](https://developer.chrome.com/blog/quickly-monitor-events-from-the-console-panel-2/)

Text / HTML Content
* 🔥 `me().textContent = "hello world"`
  * XSS Safe! See: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
* 🔥 `me().innerHTML = "<p>hello world</p>"`
* 🔥 `me().innerText = "hello world"`

Children
* 🔥 `me().children`
* 🔥 `me().children.hidden = true`

Append / Prepend elements.
* 🔥 `me().prepend(el_new)`
* 🔥 `me().appendChild(el_new)`
* 🔥 `me().insertBefore(el_new, el.firstChild)`
* 🔥 `me().insertAdjacentHTML("beforebegin", el_new)`

 ## 💎 Conventions & Tips

* `_` = for temporary or unused variables. Keep it short and sweet!
* `e`, `el`, `elt` = element
* `e`, `ev`, `evt` = event
* `f`, `fn` = function
* Developer ergonomics and simplicity wins.
* Find the layer where the change needs to touch the least places.
* Animations are done with `me().styles(...)` with CSS transitions. Use `await sleep(...)` for timelining.
* Dropdowns can be done in pure HTML / CSS.

## <a name="plugins"></a>🔌 Extending Surreal

Surreal is tiny enough to be modified for a particular use-case; but there is a system if you prefer to effortlessly merge with new versions.

1. Add your function to Surreal
 ```javascript
 var $thing = {
   test(e, name) {
     console.log(`Hello ${name} from ${e}`)
     return e
   }
 }
 $ = {...$, ...$thing}
 ```
2. Is your function chainable? Add it to Surreal sugar()
 ```javascript
 $.sugars['test'] = (name) => { return $.test($._e, name) }
 ```
3. Your function will automatically will be added globally by `globalsAdd()`
    If you do not want this (ex: Naming clash), add it to the restricted list in `globalsAdd()`

Should your function work with both single elements and arrays of elements? Refer to an existing function to see how to make this work.

Make an [issue](https://github.com/gnat/surreal/issues) or [pull request](https://github.com/gnat/surreal/pulls) if you think people would like to use it! If it's useful enough we may want it in the core!

## 🌘 Future
* Always more `showcase.html` goodies!
* Automated browser testing perhaps with:
  * [Fava](https://github.com/fabiospampinato/fava). See: https://github.com/avajs/ava/issues/24#issuecomment-885949036
  * [Ava](https://github.com/avajs/ava/blob/main/docs/recipes/browser-testing.md)
  * [jsdom](https://github.com/jsdom/jsdom)
    * [jsdom notes](https://github.com/jsdom/jsdom#executing-scripts)
