var html = require('choo/html')
var raw = require('choo/html/raw')

export default (state, emit) => children => {
  const stateString = JSON.stringify({initial: state})
  return html`<html>
<head>
  <link rel="stylesheet" href="/assets/bundle.css" />
  <script>window.initialState = ${raw(stateString)}</script>
  <script src="/assets/bundle.js"></script>
</head>
<body>
  <ul>${state.content.map( resource => {
    return html`<li><a href="${resource.path}">${resource.title}</a></li>`
  })}</ul>
  <div class="container">${children}</div>
</body>
</html>`
}