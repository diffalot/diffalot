import 'babel-polyfill'
import choo from 'choo'
import html from 'choo/html'
import raw from 'choo/html/raw'

import defaultView from './views/default'

var app = choo()

app.route('/', function (state, emit) {
  return defaultView(state, emit)(html`home content`)
})

app.route('/:link', (state, emit) => {
  const renderedMarkdown = state.content.filter(post => {
    return (post.path === state.href)
  })[0].html
  console.log({
    content: state.content,
    renderedMarkdown
  })
  return defaultView(state, emit)(raw(renderedMarkdown))
})

var defaultState = { name: 'Node' }

export default app

export const chooRender = (state = defaultState) => route => app.toString(route, state)
