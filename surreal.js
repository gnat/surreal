//Surreal 1.3.2 https://github.com/gnat/surreal
//🗿 Locality of Behavior with "jQuery like" syntax.
let surreal = (_=>{
let $ = {
	$: this,
	plugins: [],
	//ToC & easy call chaining sugar
	sugar(e) {
		if (!$.isNode(e) && !$.isNodeList(e)) {console.warn(`Surreal: Not a supported element|node|node list "${e}"`); return e}
		if ($.isNodeList(e)) e.forEach(_=>{$.sugar(_)}) //Add Surreal to all nodes from any()
		if (e.hasOwnProperty('hasSurreal')) return e //Surreal inited
		//General
		e.run = (f)=>{return $.run(e, f)}
		e.remove =_=>{return $.remove(e)}
		//Classes & CSS
		e.classAdd = (name)=>{return $.classAdd(e, name)}
		e.class_add = e.add_class = e.addClass = e.classAdd
		e.classRemove = (name)=>{return $.classRemove(e, name)}
		e.class_remove = e.remove_class = e.removeClass = e.classRemove
		e.classToggle = (name, force)=>{return $.classToggle(e, name, force)}
		e.class_toggle = e.toggle_class = e.toggleClass = e.classToggle
		e.styles = (value)=>{return $.styles(e, value)}
		//Events
		e.on = (name, f)=>{return $.on(e, name, f)}
		e.off = (name, f)=>{return $.off(e, name, f)}
		e.offAll = (name)=>{return $.offAll(e, name)}
		e.off_all = e.offAll
		e.disable =_=>{return $.disable(e)}
		e.enable =_=>{return $.enable(e)}
		e.send = (name, detail)=>{return $.send(e, name, detail)}
		e.trigger = e.send
		e.halt = (ev, keepBubbling, keepDefault)=>{return $.halt(ev, keepBubbling, keepDefault)}
		//Attributes
		e.attribute = (name, value)=>{return $.attribute(e, name, value)}
		e.attributes = e.attr = e.attribute
		$.plugins.forEach(function(func) {func(e)}) //Add all plugins
		e.hasSurreal = 1
		return e
	},
	me(selector=null, start=document, warning=true) {//me() returns a single element|null. Selector not needed in <script>. If many elements selected, me() will return the first.
		if (selector == null) return $.sugar(start.currentScript.parentElement) //me() in <script>
		if (selector instanceof Event) return selector.currentTarget ? $.me(selector.currentTarget) : (console.warn(`Surreal: Event currentTarget is null. Save the element as async loses it.`), null) //Events try currentTarget
		if (selector === '-' || selector === 'prev' || selector === 'previous') return $.sugar(start.currentScript.previousElementSibling) //Element directly before <script>
		if ($.isSelector(selector, start, warning)) return $.sugar(start.querySelector(selector)) //String selector
		if ($.isNodeList(selector)) return $.me(selector[0]) //If list return first element
		if ($.isNode(selector)) return $.sugar(selector) //Valid element
		return null
	},
	any(selector, start=document, warning=true) {//any() is me() but returns elements array or empty []. Optionally use forEach|map|filter|reduce.
		if (selector == null) return $.sugar([start.currentScript.parentElement]) //Similar to me()
		if (selector instanceof Event) return selector.currentTarget ? $.any(selector.currentTarget) : (console.warn(`Surreal: Event currentTarget is null. Save the element as async loses it.`), null) //Events try currentTarget
		if (selector === '-' || selector === 'prev' || selector === 'previous') return $.sugar([start.currentScript.previousElementSibling]) //Element directly before <script>
		if ($.isSelector(selector, start, warning)) return $.sugar(Array.from(start.querySelectorAll(selector))) //String selector
		if ($.isNode(selector)) return $.sugar([selector]) //Single element to Array
		if ($.isNodeList(selector)) return $.sugar(Array.from(selector)) //Valid NodeList or Array
		return $.sugar([])
	},
	//Elements
	run(e, f) {//Run Function
		if (typeof f !== 'function') {console.warn(`Surreal: run(f) f must be a function`); return e}
		if ($.isNodeList(e)) e.forEach(_=>{$.run(_, f)})
		if ($.isNode(e)) {f(e);}
		return e
	},
	remove(e) {//Remove
		if ($.isNodeList(e)) e.forEach(_=>{$.remove(_)})
		if ($.isNode(e)) e.parentNode.removeChild(e)
		return //Special, end of chain
	},
	classAdd(e, name) {//Add Class
		if (typeof name !== 'string') return e
		if (name.charAt(0) === '.') name = name.substring(1)
		if ($.isNodeList(e)) e.forEach(_=>{$.classAdd(_, name)})
		if ($.isNode(e)) e.classList.add(name)
		return e
	},
	classRemove(e, name) {//Remove Class
		if (typeof name !== 'string') return e
		if (name.charAt(0) === '.') name = name.substring(1)
		if ($.isNodeList(e)) e.forEach(_=>{$.classRemove(_, name)})
		if ($.isNode(e)) e.classList.remove(name)
		return e
	},
	classToggle(e, name, force) {//Toggle Class
		if (typeof name !== 'string') return e
		if (name.charAt(0) === '.') name = name.substring(1)
		if ($.isNodeList(e)) e.forEach(_=>{$.classToggle(_, name, force)})
		if ($.isNode(e)) e.classList.toggle(name, force)
		return e
	},
	//Add inline style to elements. Can use string or object formats
	styles(e, value) {
		if (typeof value === 'string') {//Format:"font-family:'sans-serif'"
			if ($.isNodeList(e)) e.forEach(_=>{$.styles(_, value)})
			if ($.isNode(e)) {$.attribute(e, 'style', ($.attribute(e, 'style') == null ? '' : $.attribute(e, 'style') + '; ') + value) }
			return e
		}
		if (typeof value === 'object') {//Format:{fontFamily:'sans-serif',backgroundColor:'#000'}
			if ($.isNodeList(e)) e.forEach(_=>{$.styles(_, value)})
			if ($.isNode(e)) {Object.assign(e.style, value) }
			return e
		}
		return e
	},
	//Add Event Listener
	on(e, name, f) {
		if ($.isNodeList(e)) e.forEach(_=>{$.on(_, name, f)})
		if ($.isNode(e)) e.addEventListener(name, f)
		return e
	},
	off(e, name, f) {
		if ($.isNodeList(e)) e.forEach(_=>{$.off(_, name, f)})
		if ($.isNode(e)) e.removeEventListener(name, f)
		return e
	},
	offAll(e) {
		if ($.isNodeList(e)) e.forEach(_=>{$.offAll(_)})
		if ($.isNode(e)) e.parentNode.replaceChild(e.cloneNode(true), e)
		return e
	},
	disable(e) {//Easy alternative to off(). Disables click|key|submit events
		if ($.isNodeList(e)) e.forEach(_=>{$.disable(_)})
		if ($.isNode(e)) e.disabled = true
		return e
	},
	enable(e) {//Reverse disable()
		if ($.isNodeList(e)) e.forEach(_=>{$.enable(_)})
		if ($.isNode(e)) e.disabled = false
		return e
	},
	send(e, name, detail=null) {//Send|trigger event
		if ($.isNodeList(e)) e.forEach(_=>{$.send(_, name, detail)})
		if ($.isNode(e)) {
			const event = new CustomEvent(name, {detail: detail, bubbles: true})
			e.dispatchEvent(event)
		}
		return e
	},
	halt(ev, keepBubbling=false, keepDefault=false) {//Halt event. Default: Stop normal actions & propagation
		if (ev instanceof Event) {
			if (!keepDefault) ev.preventDefault()
			if (!keepBubbling) ev.stopPropagation()
		}
		return ev
	},
	attribute(e, name, value=undefined) {//Add or remove attributes
		if (typeof name === 'string' && value === undefined) {//Get. (Format:"name","value") Special: Ends call chain
			if ($.isNodeList(e)) return [] //Not supported for Get. For many elements, wrap attribute() in any(...).run(...) or any(...).forEach(...)
			if ($.isNode(e)) return e.getAttribute(name)
			return null
		}
		if (typeof name === 'string' && value === null) {//Remove
			if ($.isNodeList(e)) e.forEach(_=>{$.attribute(_, name, value)})
			if ($.isNode(e)) e.removeAttribute(name)
			return e
		}
		if (typeof name === 'string') {//Add|Set
			if ($.isNodeList(e)) e.forEach(_=>{$.attribute(_, name, value)})
			if ($.isNode(e)) e.setAttribute(name, value)
			return e
		}
		if (typeof name === 'object') {//Format:{"name":"value","blah":true}
			if ($.isNodeList(e)) e.forEach(_=>{Object.entries(name).forEach(([key, val])=>{$.attribute(_, key, val)})})
			if ($.isNode(e)) Object.entries(name).forEach(([key, val])=>{$.attribute(e, key, val)})
			return e
		}
		return e
	},
	globalsAdd() {//Puts Surreal funcs minus "restricted" in global scope
		console.log(`Surreal: Adding convenience globals to window.`)
		let restricted = ['$', 'sugar']
		for (const [key, value] of Object.entries(this)) {
			if (!restricted.includes(key)) window[key] != 'undefined' ? window[key] = value : console.warn(`Surreal: "${key}()" already exists on window. Skipping to prevent overwrite.`)
			window.document[key] = value
		}
	},
	isNode(e) {//⚙️ Internal: Is this an element|node?
		return (e instanceof HTMLElement || e instanceof SVGElement || e instanceof Document) ? true : false
	},
	isNodeList(e) {//⚙️ Internal: DOM funcs. Is this a list of elements|nodes?
		return (e instanceof NodeList || Array.isArray(e)) ? true : false
	},
	isSelector(selector="", start=document, warning=true) {//⚙️ Internal: DOM funcs. Warn when selector is invalid. Likely missing a "#" or "."
		if (typeof selector !== 'string') return false
		if (start.querySelector(selector) == null) {
			if (warning) console.log(`Surreal: "${selector}" not found, ignoring.`)
			return false
		}
		return true
	},
}
$.globalsAdd()
console.log("Surreal: Loaded.")
return $
})() //👏

//🔌 Plugin: Effects
function pluginEffects(e) {
	function fadeOut(e, f=undefined, ms=1000, remove=true) {//Fade out & remove element. = to jQuery fadeOut(), but removes element!
		let thing = e
		if (surreal.isNodeList(e)) e.forEach(_=>{fadeOut(_, f, ms)})
		if (surreal.isNode(e)) {
			(async()=>{
				surreal.styles(e, {transform: 'scale(1)', transition: `all ${ms}ms ease-out`, overflow: 'hidden'})
				await tick()
				surreal.styles(e, {transform: 'scale(0.9)', opacity: '0'})
				await sleep(ms, e)
				if (typeof f === 'function') f(thing) //Run custom callback?
				if (remove) surreal.remove(thing) //Remove element after animation completed?
			})()
		}
	}
	function fadeIn(e, f=undefined, ms=1000) {//Fade in element that has opacity < 1
		let thing = e
		if (surreal.isNodeList(e)) e.forEach(_=>{fadeIn(_, f, ms)})
		if (surreal.isNode(e)) {
			(async()=>{
				let save = e.style //Store original style
				surreal.styles(e, {transition: `all ${ms}ms ease-in`, overflow: 'hidden'})
				await tick()
				surreal.styles(e, {opacity: '1'})
				await sleep(ms, e)
				e.style = save //Revert back to original style
				surreal.styles(e, {opacity: '1'}) //Ensure visible after reverting to original style
				if (typeof f === 'function') f(thing) //Run custom callback?
			})()
		}
	}
	//Add sugar
	e.fadeOut = (f, ms, remove)=>{return fadeOut(e, f, ms, remove)}
	e.fade_out = e.fadeOut
	e.fadeIn = (f, ms)=>{return fadeIn(e, f, ms)}
	e.fade_in = e.fadeIn
}

//🔌 Add plugins here!
surreal.plugins.push(pluginEffects)
console.log("Surreal: Added plugins.")
//🌐 Add global shortcuts here! DOM
const createElement = create_element = document.createElement.bind(document)
//Animation
const rAF = typeof requestAnimationFrame !== 'undefined' && requestAnimationFrame
const rIC = typeof requestIdleCallback !== 'undefined' && requestIdleCallback
async function tick() {return await new Promise(resolve=>{requestAnimationFrame(resolve)})} //Wait for next animation frame, non-blocking
async function sleep(ms, e) {return await new Promise(resolve=>setTimeout(_=>{resolve(e)}, ms))} //Sleep, non-blocking
//Loading: Using onloadAdd doesn't clobber window.onload (predictable sequential loading)
const onloadAdd = addOnload = onload_add = add_onload = (f)=>{
	if (typeof window.onload === 'function') {//window.onload set, queue funcs together (creates a call chain)
		let onload_old = window.onload
		window.onload =_=>{onload_old();f()}
		return
	}
	window.onload = f //window.onload not set
}
console.log("Surreal: Added shortcuts.")
