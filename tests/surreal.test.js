/**
Work in progress.
Problem: Ava is firing before JSDOM can do it's work.
*/

import test from 'ava'
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import * as fs from 'fs';
const path = require("path");
const surrealFile = path.resolve(__dirname, "../surreal.js")
const options = { resources: "usable", runScripts: "dangerously", pretendToBeVisual: true }
var dom = new JSDOM(`
  <head>

  </head>
  <body>
  <script src="file://${surrealFile}"></script>
  <div class="yo">yo man</div>
  <script>$.any("div")</script>
  <script>document.body.appendChild(document.createElement("hr"));</script>
</body>`, options);
var window = dom.window
var document = dom.window.document
//document.body.innerHtml = fs.readFileSync('./playground.html', 'utf8')

test.beforeEach(t => {
  dom = new JSDOM(`
  <head>

  </head>
  <body>fdgdfgfd
<script src="file://${surrealFile}"></script>
  <div class="yo">hello world</div>
  <script>$.any("div");</script>
  <script>document.body.appendChild(document.createElement("hr"));</script>
  </body>`, options);
  window = dom.window
  document = dom.window.document

});

test.afterEach.always(t => {
  //document.body.innerHTML = ''
});


test('Insert to DOM', t => {

  //window.eval(`document.body.innerHTML = "<script>any('div')</script>";`);

  window.document.body.children.length === 1;
  var script = document.createElement("script")
  script.innerHTML = "console.log(any('div'))"
  document.body.appendChild(script)
  console.log(dom.serialize());
  console.log(dom.window.eval(`console.log("TEST TEST TEST")`))
  console.log(window.eval('document.querySelector(".yo").innerText'))
  t.truthy(window.eval('any("yo").innerText'));
});

  /*
  const script = document.createElement("script");
  document.body.appendChild(script);
  script.src = "surreal.js"
*/

//const div = document.createElement('div');


/*
  const div = document.createElement('div')
  document.body.appendChild(div)
  t.is(me("div"), div)


  const div2 = document.createElement('div');
  document.body.appendChild(div2);

  t.is(document.querySelector('div'), div);

*/



test('me("div")', t => {

  const div = document.createElement('div')
  document.body.appendChild(div)

  t.is(me("div"), div)
  t.pass()
})

