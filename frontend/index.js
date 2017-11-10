import 'babel-polyfill'

import html from 'choo/html'
var raw = require('choo/html/raw')
var choo = require('choo')

import defaultView from './views/default'

var app = choo();

app.route('/', function (state, emit) {
  const stateString = JSON.stringify({initial: state})
  return defaultView(state, emit)(html`home content`)
})

app.route('/:link', (state, emit) => {
  const renderedMarkdown = state.content.filter(post => {
    return (post.path === state.href)
  })[0].html
  return defaultView(state, emit)(raw(renderedMarkdown))
})

var defaultState = { name: 'Node' }

export default app

export const chooRender = (state = defaultState) => route => app.toString(route, state)
