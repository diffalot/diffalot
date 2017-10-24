
import 'babel-polyfill'

var html = require('choo/html')
var choo = require('choo')

var app = choo()

app.route('/', function (state, emit) {
  return html`<html>
<head>
  <link rel="stylesheet" href="/assets/bundle.css" />
  <script src="/assets/bundle.js"></script>
</head>
<body>
  <div>Hello ${state.name}</div>
  </body>
</html>`
})

var defaultState = { name: 'Node' }

export default app

export const chooRender = (state = defaultState) => route => app.toString(route, state)