// Welcome to Surreal 1.1.8
// Documentation: https://github.com/gnat/surreal
// Locality of Behavior (LoB): https://htmx.org/essays/locality-of-behaviour/
let surreal = (function () {
let $ = { // Convenience for internals.
	$: this, // Convenience for internals.
	plugins: [],

	// Table of contents and convenient call chaining sugar. For a familiar "jQuery like" syntax. 🙂
	// Check before adding new: https://youmightnotneedjquery.com/
	sugar(e) {
		if (e == null) { console.warn(`Surreal: Cannot use "${e}". Missing a character?`) }
		if (e.hasOwnProperty('hasSurreal')) return e // Surreal already applied

		// General
		e.run           = (value) => { return $.run(e, value) }
		e.remove        = () => { return $.remove(e) }

		// Classes and CSS.
		e.classAdd      = (name) => { return $.classAdd(e, name) }
		e.class_add     = e.add_class    = e.addClass    = e.classAdd // Aliases
		e.classRemove   = (name) => { return $.classRemove(e, name) }
		e.class_remove  = e.remove_class = e.removeClass = e.classRemove // Aliases
		e.classToggle   = (name) => { return $.classToggle(e, name) }
		e.class_toggle  = e.toggle_class = e.toggleClass = e.classToggle // Aliases
		e.styles        = (value) => { return $.styles(e, value) }

		// Events.
		e.on            = (name, fn) => { return $.on(e, name, fn) }
		e.off           = (name, fn) => { return $.off(e, name, fn) }
		e.offAll        = (name) => { return $.offAll(e, name) }
		e.off_all       = e.offAll
		e.disable       = () => { return $.disable(e) }
		e.enable        = () => { return $.enable(e) }
		e.send          = (name, detail) => { return $.send(e, name, detail) }
		e.trigger       = e.send
		e.halt          = (ev, keepBubbling, keepDefault) => { return $.halt(ev, keepBubbling, keepDefault) }

		// Attributes.
		e.attribute 	= (name, value) => { return $.attribute(e, name, value) }
		e.attributes    = e.attribute
		e.attr          = e.attribute

		// Add all plugins.
		$.plugins.forEach(function(func) { func(e) })

		e.hasSurreal = 1
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
		if (selector instanceof Event) return selector.currentTarget ? $.me(selector.currentTarget) : (console.warn(`Surreal: Event currentTarget is null. Please save your element because async will lose it`), null) // Events try currentTarget
		if (selector === '-' || selector === 'prev' || selector === 'previous') return $.sugar(start.currentScript.previousElementSibling) // Element directly before <script>
		if ($.isSelector(selector, start, warning)) return $.sugar(start.querySelector(selector)) // String selector.
		if ($.isNodeList(selector)) return $.me(selector[0]) // If we got a list, just take the first element.
		if ($.isNode(selector)) return $.sugar(selector) // Valid element.
		return null // Invalid.
	},
	// any() is me() but always returns array of elements. Requires selector.
	// Returns an Array of elements (so you can use methods like forEach/filter/map/reduce if you want).
	// Example: any('button')
	any(selector, start=document, warning=true) {
		if (selector == null) return $.sugar([start.currentScript.parentElement]) // Just local me() in <script>
		if (selector instanceof Event) return selector.currentTarget ? $.any(selector.currentTarget) : (console.warn(`Surreal: Event currentTarget is null. Please save your element because async will lose it`), null) // Events try currentTarget
		if (selector === '-' || selector === 'prev' || selector === 'previous') return $.sugar([start.currentScript.previousElementSibling]) // Element directly before <script>
		if ($.isSelector(selector, start, warning)) return $.sugar(Array.from(start.querySelectorAll(selector))) // String selector.
		if ($.isNode(selector)) return $.sugar([selector]) // Single element. Convert to Array.
		if ($.isNodeList(selector)) return $.sugar(Array.from(selector)) // Valid NodeList or Array.
		return null // Invalid.
	},
	// Run any function on element(s)
	run(e, f) {
		if ($.isNodeList(e)) e.forEach(_ => { $.run(_, f) })
		if ($.isNode(e)) { f(e); }
		return e
	},
	// Remove element(s)
	remove(e) {
		if ($.isNodeList(e)) e.forEach(_ => { $.remove(_) })
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
			if ($.isNodeList(e)) e.forEach(_ => { $.styles(_, value) })
			if ($.isNode(e)) { $.attribute(e, 'style', ($.attribute(e, 'style') == null ? '' : $.attribute(e, 'style') + '; ') + value)  }
			return e
		}
		if (typeof value === 'object') { // Format: { fontFamily: 'sans-serif', backgroundColor: '#000' }
			if ($.isNodeList(e)) e.forEach(_ => { $.styles(_, value) })
			if ($.isNode(e)) { Object.assign(e.style, value)  }
			return e
		}
	},
	// Add event listener to element(s).
	// Match a sender: if(!event.target.matches(".selector")) return;
	//	📚️ https://developer.mozilla.org/en-US/docs/Web/API/Event
	//	✂️ Vanilla: document.querySelector(".thing").addEventListener("click", (e) => { alert("clicked") }
	on(e, name, fn) {
		if (typeof name !== 'string') return null
		if ($.isNodeList(e)) e.forEach(_ => { $.on(_, name, fn) })
		if ($.isNode(e)) e.addEventListener(name, fn)
		return e
	},
	off(e, name, fn) {
		if (typeof name !== 'string') return null
		if ($.isNodeList(e)) e.forEach(_ => { $.off(_, name, fn) })
		if ($.isNode(e)) e.removeEventListener(name, fn)
		return e
	},
	offAll(e) {
		if ($.isNodeList(e)) e.forEach(_ => { $.offAll(_) })
		if ($.isNode(e)) e.parentNode.replaceChild(e.cloneNode(true), e)
		return e
	},
	// Easy alternative to off(). Disables click, key, submit events.
	disable(e) {
		if ($.isNodeList(e)) e.forEach(_ => { $.disable(_) })
		if ($.isNode(e)) e.disabled = true
		return e
	},
	// For reversing disable()
	enable(e) {
		if ($.isNodeList(e)) e.forEach(_ => { $.enable(_) })
		if ($.isNode(e)) e.disabled = false
		return e
	},
	// Send / trigger event.
	// ✂️ Vanilla: Events Dispatch: document.querySelector(".thing").dispatchEvent(new Event('click'))
	send(e, name, detail=null) {
		if ($.isNodeList(e)) e.forEach(_ => { $.send(_, name, detail) })
		if ($.isNode(e)) {
			const event = new CustomEvent(name, { detail: detail, bubbles: true })
			e.dispatchEvent(event)
		}
		return e
	},
	// Halt event. Default: Stops normal event actions and event propagation.
	halt(ev, keepBubbling=false, keepDefault=false) {
		if (ev instanceof Event) {
			if(!keepDefault) ev.preventDefault()
			if(!keepBubbling) ev.stopPropagation()
		}
		return ev
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
			if ($.isNodeList(e)) e.forEach(_ => { Object.entries(name).forEach(([key, val]) => { $.attribute(_, key, val) }) })
			if ($.isNode(e)) Object.entries(name).forEach(([key, val]) => { $.attribute(e, key, val) })
			return e
		}
		return e
	},
	// Puts Surreal functions except for "restricted" in global scope.
	globalsAdd() {
		console.log(`Surreal: Adding convenience globals to window.`)
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
	isSelector(selector="", start=document, warning=true) {
		if(typeof selector !== 'string') return false
		if (start.querySelector(selector) == null) {
			if (warning) console.warn(`Surreal: "${selector}" was not found. Missing a character? (. #)`)
			return false
		}
		return true // Valid.
	},
}
// Finish up...
$.globalsAdd() // Full convenience.
console.log("Surreal: Loaded.")
return $
})() // End of Surreal 👏

// 🔌 Plugin: Effects
function pluginEffects(e) {
	// Fade out and remove element.
	// Equivalent to jQuery fadeOut(), but actually removes the element!
	function fadeOut(e, fn=false, ms=1000, remove=true) {
		let thing = e
		if (surreal.isNodeList(e)) e.forEach(_ => { fadeOut(_, fn, ms) })
		if (surreal.isNode(e)) {
			(async() => {
				surreal.styles(e, {transform: 'scale(1)', transition: `all ${ms}ms ease-out`, overflow: 'hidden'})
				await tick()
				surreal.styles(e, {transform: 'scale(0.9)', opacity: '0'})
				await sleep(ms, e)
				if (fn === 'function') fn(thing) // Run custom callback?
				if (remove) surreal.remove(thing) // Remove element after animation is completed?
			})()
		}
	}
	// Fade in an element that has opacity under 1
	function fadeIn(e, fn=false, ms=1000) {
		let thing = e
		if(surreal.isNodeList(e)) e.forEach(_ => { fadeIn(_, fn, ms) })
		if(surreal.isNode(e)) {
			(async() => {
				let save = e.style // Store original style.
				surreal.styles(e, {transition: `all ${ms}ms ease-in`, overflow: 'hidden'})
				await tick()
				surreal.styles(e, {opacity: '1'})
				await sleep(ms, e)
				e.style = save // Revert back to original style.
				surreal.styles(e, {opacity: '1'}) // Ensure we're visible after reverting to original style.
				if (fn === 'function') fn(thing) // Run custom callback?
			})()
		}
	}
	// Add sugar
	e.fadeOut  = (fn, ms, remove) => { return fadeOut(e, fn, ms, remove) }
	e.fade_out = e.fadeOut
	e.fadeIn   = (fn, ms) => { return fadeIn(e, fn, ms) }
	e.fade_in  = e.fadeIn
}

// 🔌 Add plugins here!
surreal.plugins.push(pluginEffects)
console.log("Surreal: Added plugins.")

// 🌐 Add global shortcuts here!
// DOM.
const createElement = create_element = document.createElement.bind(document)
// Animation.
const rAF = typeof requestAnimationFrame !== 'undefined' && requestAnimationFrame
const rIC = typeof requestIdleCallback !== 'undefined' && requestIdleCallback
// Animation: Wait for next animation frame, non-blocking.
async function tick() {
	return await new Promise(resolve => { requestAnimationFrame(resolve) })
}
// Animation: Sleep, non-blocking.
async function sleep(ms, e) {
	return await new Promise(resolve => setTimeout(() => { resolve(e) }, ms))
}
// Loading: Why? So you don't clobber window.onload (predictable sequential loading)
// Example: <script>onloadAdd(() => { console.log("Page was loaded!") })</script>
// Example: <script>onloadAdd(() => { console.log("Lets do another thing without clobbering window.onload!") })</script>
const onloadAdd = addOnload = onload_add = add_onload = (f) => {
	if (typeof window.onload === 'function') { // window.onload already is set, queue functions together (creates a call chain).
		let onload_old = window.onload
		window.onload = () => {
			onload_old()
			f()
		}
		return
	}
	window.onload = f // window.onload was not set yet.
}
console.log("Surreal: Added shortcuts.")
