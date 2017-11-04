var html = require('choo/html')
var raw = require('choo/html/raw')

const renderResourceListItem = resource => {
  return html`
<li>
  <a href="${resource.path}">${resource.title}</a>
</li>`
}

export default (state, emit) => children => {
  const stateString = JSON.stringify({initial: state})
  return html`
<html>
<head>
  <title>${state.pageTitle}</title>
  <link rel="stylesheet" href="/assets/bundle.css" />
  <script>window.initialState = ${raw(stateString)}</script>
  <script src="/assets/bundle.js"></script>
</head>
<body>
  <nav class="header-nav">
    <h1>${state.pageTitle}</h1>
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      ${state.content.map(renderResourceListItem)}
    </ul>
  </nav>
  <div class="container">${children}</div>
</body>
</html>`
}