


// New Sugar.
/*
$.sugar_saved = null
$.sugar_saved = $.sugar
$.sugar = null
$.sugar = (e) => {
	e = $.sugar_saved(e)
	// Add here.
	e.print = (name) => { return $.print(e, name) }
	e.trace = (name) => { return $.trace(e, name) }
	return e
}*/
/*
// New Sugar.
$.sugar_saved = null
$.sugar_saved = $.sugar
$.sugar = null
$.sugar = (e) => {
	e = $.sugar_saved(e)
	// Add here.
	e.fadeOut = e.fade_out = (name) => { return $.fade_out(e, fn=false, ms=1000) }
	return e
}*/


/*
$ = $.expand($, $debug, (e) => {
	e = $.sugar_save(e)
	// Add sugar here.
	e.print = (name) => { return $.print(e, name) }
	e.trace = (name) => { return $.trace(e, name) }
	return e
})
*/


/*
$.sugar = (e) => {
	e.fadeOut = e.fade_out = (fn, ms) => { return $.fadeOut(e, fn=false, ms=1000) }
	return $.sugar(e)
}*/



/*
$ = {...$, ...$effects}
// New Sugar.
$.sugar_saved = null
$.sugar_saved = $.sugar
$.sugar = null
$.sugar = (e) => {
	e = $.sugar_saved(e)
	// Add here.
	e.fadeOut = e.fade_out = (name) => { return $.fade_out(e, fn=false, ms=1000) }
	return e
}*/

/*
- handling cookies

    fetch('https://example.com', { credentials: 'include' })
- HTTP status codes
    fetch('https://example.com').then(response => {
        if (response.ok) {
            // Response is 200-299
        }
        if (response.status === 404) {
            // Status code specific handling
        }
    });
- CORS
    fetch('https://example.com', { mode: 'no-cors' });
- JSON handling
    fetch('https://example.com').then(response => response.json()).then(json => {
        // Do something with a parsed JSON object
    });


    fetch('send-ajax-data.php')
    .then(data => console.log(data))
    .catch (error => console.log('Error:' + error));



    var xhr = new XMLHttpRequest();
	xhr.open('GET', '/url', true);
	xhr.onload = function() {
		if (this.status === 200) {
			console.log('success!');
		} else {
			console.log('failed', this.status);
		}
	};

	xhr.send();

	var xhrPost = new XMLHttpRequest();
	xhrPost.open('POST', '/url/post', true);
	xhrPost.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhrPost.onload = noop;
	xhrPost.send();
*/


/*
https://github.com/edlinkiii/js-query/blob/master/src/js-query.js
https://blissfuljs.com/
https://github.com/1milligram/html-dom
https://github.com/nguyenphuminh/rottenjs/blob/main/development/rotten.js
https://gist.github.com/jochemstoel/856d5b2735c53559372eb7b32c44e9a6
https://github.com/james2doyle/ki.extend.js/blob/master/ki.extend.js
*/

/*
// Apply Expansion Pack
$ = {...$, ...$debug}
$debug = (el) => {
	console.log("lol")
	return el
}
$.sugar_old = $.sugar
$.sugar = (e) => { return $.sugar_old($debug(e)) }
*/
//$ = $expansion($, $debug)


// Deprecated March 2022.
// Attach CSRF token to htmx calls. (Vanilla js) HTMX calls only since they use AJAX.
//document.body.addEventListener('htmx:configRequest', (event) => {
//event.detail.headers['X-CSRF-Token'] = document.getElementsByName('csrf-token')[0].content
//})
