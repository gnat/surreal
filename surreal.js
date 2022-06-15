// Welcome to Surreal
// Documentation: https://github.com/gnat/surreal
// Locality of Behavior (LoB): https://htmx.org/essays/locality-of-behaviour/
var $ = { // You can use a different name than "$", but you must change the reference in any plugins you use!
	$: this, // Convenience for core internals.
	sugars: {}, // Extra syntax sugar for plugins.

	// Table of contents and convenient call chaining sugar. For a familiar "jQuery like" syntax. 🙂
	// Check before adding new: https://youmightnotneedjquery.com/
	sugar(e) {
		if (e == null) { console.warn(`Cannot use "${e}". Missing a character?`) }

		// General
		e.run           = (value) => { return $.run(e, value) }
		e.remove        = () => { return $.remove(e) }

		// Classes and CSS.
		e.classAdd      = (name) => { return $.classAdd(e, name) }
		e.class_add     = e.classAdd
		e.classRemove   = (name) => { return $.classRemove(e, name) }
		e.class_remove  = e.classRemove
		e.classToggle   = (name) => { return $.classToggle(e, name) }
		e.class_toggle  = e.classToggle
		e.styles        = (value) => { return $.styles(e, value) }

		// Events.
		e.on            = (name, fn) => { return $.on(e, name, fn) }
		e.off           = (name, fn) => { return $.off(e, name, fn) }
		e.offAll        = (name) => { return $.offAll(e, name) }
		e.off_all       = e.offAll
		e.trigger       = (name) => { return $.trigger(e, name) }
		e.halt          = () => { return $.halt(e) }

		// Attributes.
		e.attribute 	= (name, value) => { return $.attribute(e, name, value) }
		e.attributes    = e.attribute
		e.attr          = e.attribute

		// Add all plugin sugar.
		$._e = e // Plugin access to "e" for chaining.
		for (const [key, value] of Object.entries(sugars)) {
			e[key] = value.bind($) //e[key] = value
		}

		return e
	},

	// Return single element. Selector not needed if used with inline <script> 🔥
	// If your query returns a collection, it will return the first element.
	// Example
	//	<div>
	//		Hello World!
	//		<script>me().style.color = 'red'</script>
	//	</div>
	me(selector=null, start=document, warning=true) {
		if (selector == null) return $.sugar(start.currentScript.parentElement) // Just local me() in <script>
		if (selector instanceof Event) return $.me(selector.target) // Events return event.target
		if (typeof selector == 'string' && isSelector(selector, start, warning)) return $.sugar(start.querySelector(selector)) // String selector.
		if ($.isNodeList(selector)) return $.me(selector[0]) // If we got a list, just take the first element.
		if ($.isNode(selector)) return $.sugar(selector) // Valid element.
		return null // Invalid.
	},

	// any() is me() but always returns array of elements. Requires selector.
	// Returns an Array of elements (so you can use methods like forEach/filter/map/reduce if you want).
	// Example: any('button')
	any(selector, start=document, warning=true) {
		if (selector == null) return $.sugar([start.currentScript.parentElement]) // Just local me() in <script>
		if (selector instanceof Event) return $.any(selector.target) // Events return event.target
		if (typeof selector == 'string' && isSelector(selector, start, true, warning)) return $.sugar(Array.from(start.querySelectorAll(selector))) // String selector.
		if ($.isNode(selector)) return $.sugar([selector]) // Single element. Convert to Array.
		if ($.isNodeList(selector)) return $.sugar(Array.from(selector)) // Valid NodeList or Array.
		return null // Invalid.
	},

	// Run any function on element(s)
	run(e, f) {
		if ($.isNodeList(e)) e.forEach(_ => { run(_, f) })
		if ($.isNode(e)) { f(e); }
		return e
	},

	// Remove element(s)
	remove(e) {
		if ($.isNodeList(e)) e.forEach(_ => { remove(_) })
		if ($.isNode(e)) e.parentNode.removeChild(e)
		return // Special, end of chain.
	},

	// Add class to element(s).
	classAdd(e, name) {
		if (e === null || e === []) return null
		if (typeof name !== 'string') return null
		if (name.charAt(0) === '.') name = name.substring(1)
		if ($.isNodeList(e)) e.forEach(_ => { $.classAdd(_, name) })
		if ($.isNode(e)) e.classList.add(name)
		return e
	},

	// Remove class from element(s).
	classRemove(e, name) {
		if (typeof name !== 'string') return null
		if (name.charAt(0) === '.') name = name.substring(1)
		if ($.isNodeList(e)) e.forEach(_ => { $.classRemove(_, name) })
		if ($.isNode(e)) e.classList.remove(name)
		return e
	},

	// Toggle class in element(s).
	classToggle(e, name) {
		if (typeof name !== 'string') return null
		if (name.charAt(0) === '.') name = name.substring(1)
		if ($.isNodeList(e)) e.forEach(_ => { $.classToggle(_, name) })
		if ($.isNode(e)) e.classList.toggle(name)
		return e
	},

	// Add inline style to element(s).
	// Can use string or object formats.
	// 	String format: "font-family: 'sans-serif'"
	// 	Object format; { fontFamily: 'sans-serif', backgroundColor: '#000' }
	styles(e, value) {
		if (typeof value === 'string') { // Format: "font-family: 'sans-serif'"
			if ($.isNodeList(e)) e.forEach(_ => { styles(_, value) })
			if ($.isNode(e)) { attribute(e, 'style', (attribute(e, 'style') == null ? '' : attribute(e, 'style') + '; ') + value)  }
			return e
		}
		if (typeof value === 'object') { // Format: { fontFamily: 'sans-serif', backgroundColor: '#000' }
			if ($.isNodeList(e)) e.forEach(_ => { styles(_, value) })
			if ($.isNode(e)) { Object.assign(e.style, value)  }
			return e
		}
	},

	// Add event listener to element(s).
	// Match with: if(!event.target.matches(".selector")) return;
	//	📚️ https://developer.mozilla.org/en-US/docs/Web/API/Event
	//	✂️ Vanilla: document.querySelector(".thing").addEventListener("click", (e) => { alert("clicked") }
	on(e, name, fn) {
		if (typeof name !== 'string') return null
		if ($.isNodeList(e)) e.forEach(_ => { on(_, name, fn) })
		if ($.isNode(e)) e.addEventListener(name, fn)
		return e
	},

	off(e, name, fn) {
		if (typeof name !== 'string') return null
		if ($.isNodeList(e)) e.forEach(_ => { off(_, name, fn) })
		if ($.isNode(e)) e.removeEventListener(name, fn)
		return e
	},

	offAll(e) {
		if ($.isNodeList(e)) e.forEach(_ => { offAll(_) })
		if ($.isNode(e)) e = e.cloneNode(true)
		return e
	},

	// Trigger event / dispatch event.
	// ✂️ Vanilla: Events Dispatch: document.querySelector(".thing").dispatchEvent(new Event('click'))
	trigger(e, name) {
		if ($.isNodeList(e)) e.forEach(_ => { trigger(_, name) })
		if ($.isNode(e)) {
			const event = new CustomEvent(name, {bubbles: true})
			e.dispatchEvent(event)
		}
		return e
	},

	// Halt event / prevent default.
	halt(e) {
		if (e instanceof Event) {
			if (!e.preventDefault) {
				e.returnValue = false
			} else {
				e.preventDefault()
			}
		}
		return e
	},

	// Add or remove attributes from element(s)
	attribute(e, name, value=undefined) {
		// Get. This one is special. Format: "name", "value"
		if (typeof name === 'string' && value === undefined) {
			if ($.isNodeList(e)) return [] // Not supported for Get. For many elements, wrap attribute() in any(...).run(...) or any(...).forEach(...)
			if ($.isNode(e)) return e.getAttribute(name)
			return null // No value.
		}
		// Remove.
		if (typeof name === 'string' && value === null) {
			if ($.isNodeList(e)) e.forEach(_ => { $.attribute(_, name, value) })
			e.removeAttribute(name)
			return e
		}
		// Add / Set.
		if (typeof name === 'string') {
			if ($.isNodeList(e)) e.forEach(_ => { $.attribute(_, name, value) })
			e.setAttribute(name, value)
			return e
		}
		// Format: { "name": "value", "blah": true }
		if (typeof name === 'object') {
			if ($.isNodeList(e)) e.forEach(_ => { Object.entries(name).forEach(([key, val]) => { attribute(_, key, val) }) })
			if ($.isNode(e)) Object.entries(name).forEach(([key, val]) => { attribute(e, key, val) })
			return e
		}
		return e
	},

	// Puts Surreal functions except for "restricted" in global scope.
	globalsAdd() {
		console.log(`Surreal: adding convenience globals to window`)
		restricted = ['$', 'sugar']
		for (const [key, value] of Object.entries(this)) {
			if (!restricted.includes(key)) window[key] != 'undefined' ? window[key] = value : console.warn(`Surreal: "${key}()" already exists on window. Skipping to prevent overwrite.`)
			window.document[key] = value
		}
	},

	// ⚙️ Used internally. Is this an element / node?
	isNode(e) {
		return (e instanceof HTMLElement || e instanceof SVGElement) ? true : false
	},

	// ⚙️ Used internally by DOM functions. Is this a list of elements / nodes?
	isNodeList(e) {
		return (e instanceof NodeList || Array.isArray(e)) ? true : false
	},

	// ⚙️ Used internally by DOM functions. Warning when selector is invalid. Likely missing a "#" or "."
	isSelector(selector="", start=document, all=false, warning=true) {
		if (all && start.querySelectorAll(selector) == null) {
			if (warning) console.warn(`"${selector}" was not found. Missing a character? (. #)`)
			return false
		}
		if (start.querySelector(selector) == null) {
			if (warning) console.warn(`"${selector}" was not found. Missing a character? (. #)`)
			return false
		}
		return true // Valid.
	},
}

// 📦 Plugin: Effects
var $effects = {
	// Fade out and remove element.
	// Equivalent to jQuery fadeOut(), but actually removes the element!
	fadeOut(e, fn=false, ms=1000, remove=true) {
		thing = e
			
		if ($.isNodeList(e)) e.forEach(_ => { fadeOut(_, fn, ms) })
		if ($.isNode(e)) {
			(async() => {
				$.styles(e, 'max-height: 100%; overflow: hidden')
				$.styles(e, `transition: all ${ms}ms ease-out`)
				await tick()
				$.styles(e, 'max-height: 0%; padding: 0; opacity: 0')
				await sleep(ms, e)
				if (fn === 'function') fn()
				if (remove) $.remove(thing) // Remove element after animation is completed?
			})()
		}
	},
	fadeIn(e, fn=false, ms=1000) {
		thing = e		
		if($.isNodeList(e)) e.forEach(_ => { fadeIn(_, fn, ms) })
		if($.isNode(e)) {
			(async() => {
				$.styles(e, 'max-height: 100%; overflow: hidden')
				$.styles(e, `transition: all ${ms}ms ease-in`)
				await tick()
				$.styles(e, 'max-height: 100%; opacity: 1')
				await sleep(ms, e)
				if (fn === 'function') fn()
			})()
		}
	},
	$effects
}
$ = {...$, ...$effects}
$.sugars['fadeOut']  = (fn, ms) => { return $.fadeOut($._e, fn=false, ms=1000) }
$.sugars['fadeIn']  = (fn, ms) => { return $.fadeIn($._e, fn=false, ms=1000) }
$.sugars['fade_out', 'fade_in'] = $.sugars['fadeOut', 'fadeIn']

$.globalsAdd() // Full convenience.

console.log("Loaded Surreal.")

// 🌐 Optional global helpers.
const createElement = document.createElement.bind(document)
const create_element = createElement
const rAF = typeof requestAnimationFrame !== 'undefined' && requestAnimationFrame
const rIC = typeof requestIdleCallback !== 'undefined' && requestIdleCallback
function sleep(ms, e) {
	return new Promise(resolve => setTimeout(() => { resolve(e) }, ms))
}
async function tick() {
	await new Promise(resolve => { requestAnimationFrame(resolve) })
}
// Loading helper. Why? So you don't overwrite window.onload. And predictable sequential loading!
function onloadAdd(f) {
	// window.onload was not set yet.
	if (typeof window.onload != 'function') {
		window.onload = f
		return
	}
	// If onload already is set, queue them together. This creates a sequential call chain as we add more functions.
	let onload_old = window.onload
	window.onload = () => {
		onload_old()
		f()
	}
}
const onload_add = onloadAdd
