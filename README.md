![cover](https://user-images.githubusercontent.com/24665/171092805-b41286b2-be4a-4aab-9ee6-d604699cc507.png)
(Art by [shahabalizadeh](https://www.deviantart.com/shahabalizadeh))

# Surreal - Hyper minimalist jQuery alternative
![Builds](https://img.shields.io/github/workflow/status/gnat/surreal/ci?label=ci&style=for-the-badge&color=%237d91ce)
![Builds](https://img.shields.io/github/workflow/status/gnat/surreal/release?label=Mini&style=for-the-badge&color=%237d91ce)
![License](https://img.shields.io/github/license/gnat/surreal?style=for-the-badge&color=%234400e5)

## 💙 Why does this exist?

For devs who love ergonomics!

If you agree with any of the following, you may appreciate Surreal:

* Love staying as close to Vanilla JS.
* Hate typing `document.querySelector` over.. and over..
* Hate typing `addEventListener` over.. and over..
* Really wish `document.querySelectorAll` had Array functions..
* Really wish `this` would work in child `<script>` tags.
* Love having **no build step** to speak of.
* Love fewer layers, and a snappy UI.
* Enjoyed using jQuery selector syntax.
* Are aware of the cargo cult. ✈️

## ✨ What advantages does it bring to the table?

* 🔗 Call chaining.
* ♻️ Seamlessly handle an individual element  **OR** arrays of elements.
  * **Surreal** functions operate agnostically on `HTMLElement` or `NodeList` (or `Array` of `HTMLElement`).
  * For your own functions, select one element directly: `me()` or many elements: `any()`
    * Both `me()` and `any()` can chain with any **Surreal** function.
  * Elements from `me()` can be accessed directly as a single element (a better `querySelector()` or `$`)
  * Elements from `any()` can use any of these: `forEach` / `filter` / `map` / `reduce` (a better `querySelectorAll()` or `$$`)
* ❤️‍🔥 Choose `camelCase` (standard, jQuery) **OR** `snake_case` (Python, Rust, PHP, Ruby, SQL, *CSS*, templates).
  * No more forcing of styles you may not want: `class_add` is just an alias of `classAdd`
* ⚡️ [Locality of Behavior (LoB)](https://htmx.org/essays/locality-of-behaviour/) is fully supported. `me()` can be used inside `<script>` tags to get the current element without a unique identifier -- no **class**, no **id** needed! We drastically upgraded your `this`!

Do surreal things with [Locality of Behavior](https://htmx.org/essays/locality-of-behaviour/) like:
```html
<label for="file-input" >
  <div class="uploader"></div>
  <script>
    me().on("dragover", ev => { halt(ev); me(ev).classAdd('.hover'); log("Files in drop zone.") })
    me().on("dragleave", ev => { halt(ev); me(ev).classAdd('.hover'); log("Files left drop zone.") })
    me().on("drop", ev => { halt(ev); me(ev).classRemove('.hover').classAdd('.loading'); me('#file-input').attribute('files', ev.dataTransfer.files); me('#form').trigger('change') })
  </script>
</label>
```

## 👁️ Live Example

Get a taste- see the [Showcase](https://gnat.github.io/surreal/showcase.html)! Then [view source](https://github.com/gnat/surreal/blob/main/showcase.html).

## 🎁 Installation

Surreal is a dependency-free, browser-oriented javascript library. [Download Surreal](https://github.com/gnat/surreal/archive/refs/heads/main.zip) and drag `surreal.js` into the appropriate directory of your project. Using it is as simple as adding a `<script>` tag to your document head. No need for complicated build steps or systems.
```html
<script src="surreal.js"></script>
```

## 🤔 Why choose `me()` and `any()` over `$` and `$$`
* No ambiguity unlike jQuery's approach of `$` for both single elements and Arrays. Less need for sanity checks.
* Readability. English-like and self documenting.
* Same verbbage as [Hyperscript](https://hyperscript.org) making this an excellent transitional library.
* It can be far less wordy to work with elements directly instead of an Array.

## 📚️ Inspired by

* [jQuery](https://jquery.com/) for the chainable syntax we all love.
* [BlingBling.js](https://github.com/argyleink/blingblingjs) for modern minimalism.
* [Bliss.js](https://blissfuljs.com/) for a focus on single elements and extensibility.
* [Hyperscript](https://hyperscript.org) for Locality of Behavior and awesome ergonomics.
* Shout out to [Umbrella](https://umbrellajs.com/), [Cash](https://github.com/fabiospampinato/cash), [Zepto](https://zeptojs.com/)- Not quite as ergonomic or extensible.

## 🔥 Usage Overview

### <a name="selectors"></a>🔍️ DOM Selection

You want **one** element directly.
* `me(...)`
  * `me()` Get the current element.
     * Provides [Locality of Behavior](https://htmx.org/essays/locality-of-behaviour/) in `<script>` without a unique identifier (no **class**, no **id**).
  * `me(body)` Get only one element.
  * `me("button")` If more than one match, get only the first one.


You want **one or more** elements as an Array.
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

#### 🟢 Style A (🔗 Chaining)

* 🔥 `me().classAdd('red')` 😎 *RECOMMENDED STYLE*
* No convenience globals: `$.me().classAdd('red')`

#### 🟠 Style B (Classic)
* 🔥 `classAdd(me(), 'red')`
* No convenience globals: `$.classAdd($.me(), 'red')`

Great? See: [Quick Start](#quick-start) and [Reference](#reference) and [No Surreal Needed](#no-surreal)

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
* ❤️‍🔥 Alias.
### 👁️ At a glance

* 🔗 `run`
  * 🔥 `me().run(el => { alert(el) })`
  * 🔥 `any('button').run(el => { alert(el) })`
  * It's `forEach` but less wordy and works on single elements.
* 🔗 `remove`
  * 🔥 `me().remove()`
  * 🔥 `any('button').remove()`
* 🔗 `classAdd` ❤️‍🔥 `class_add`
  * 🔥 `me().classAdd('active')`
* 🔗 `classRemove` ❤️‍🔥 `class_remove`
  * 🔥 `me().classRemove('active')`
* 🔗 `classToggle` ❤️‍🔥 `class_toggle`
  * 🔥 `me().classToggle('active')`
* 🔗 `styles`
  * 🔥 `me().styles('color: red')`
  * 🔥 `me().styles({ 'color':'red', 'background':'blue' })`
* 🔗 `attribute` ❤️‍🔥 `attributes` ❤️‍🔥 `attr`
  * Get: 🔥 `me().attribute('data-x')`
    * Only for single elements. For many elements, wrap this in `any(...).run(...)` or `any(...).forEach(...)`.
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
* 🌐 `createElement`
  * 🔥 `el_new = createElement("div"); me().prepend(el_new)`
  * Alias of `document.createElement`

### <a name="no-surreal"></a>🔮 No Surreal Needed
Some patterns are already as short as you can get in vanilla JS!

Logging
* 🌐 `console.log()` `console.warn()` `console.error()`
* Event logging: 🔥 `ev.monitorEvents(me())` See: [Chrome Blog](https://developer.chrome.com/blog/quickly-monitor-events-from-the-console-panel-2/)

Children
* 🔥 `me().children`
* 🔥 `me().children.hidden = true`

Append / Prepend elements.
* 🔥 `me().prepend(el_new)`
* 🔥 `me().appendChild(el_new)`
* 🔥 `me().insertBefore(el_new, el.firstChild)`
* 🔥 `me().insertAdjacentHTML("beforebegin", el_new)`

Text / HTML Content
* `me().innerHTML = "<p>hello world</p>"`
* `me().innerText = "hello world"`

 ## 💎 Conventions & Tips

* `_` = are fine for temporary or unused variables. Keep it short and sweet!
* `e`, `el`, `elt` = element
* `e`, `ev`, `evt` = event
* `f`, `fn` = function
* Developer ergonomics and simplicity wins.
* Find the layer where the change needs to touch the least places.
* Animations are done with `me().styles(...)` with CSS transitions. Use `await sleep(...)` for timelining.
* Modals and dropdowns can be done in pure HTML / CSS now.

## 🔌 Extending Surreal

First off, we do recommend just adding to your Surreal core. Surreal is designed to be small, auditable and understandable. But we also have a plugin system for less core-like contributions:

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
2. Add your function to Surreal sugar() if it is chainable.
 ```javascript
 $.sugars['test'] = (name) => { return $.test($._e, name) }
 ```
3. Automatically will be added as a global convenience with globalsAdd()
    If this should not be allowed, please add it to the restricted list in globalsAdd()

If applicable, make your function compatible with both single elements and arrays.
    Refer to an existing function to see how.

Make an [issue](https://github.com/gnat/surreal/issues) or [pull request](https://github.com/gnat/surreal/pulls) if you think people would like to use it! If it's useful enough we may want it in the core!

## 🌘 Future
* Automated browser testing perhaps with:
  * [Fava](https://github.com/fabiospampinato/fava). See: https://github.com/avajs/ava/issues/24#issuecomment-885949036
  * [Ava](https://github.com/avajs/ava/blob/main/docs/recipes/browser-testing.md)
  * [jsdom](https://github.com/jsdom/jsdom)
* More `showcase.html` goodies.
* Minification at some point. Really liking dev/production all in one file, though.
