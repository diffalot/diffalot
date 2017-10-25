import html from 'choo/html'
import raw from 'choo/html/raw'

const renderResourceListItem = resource =>
  html`
<li>
  <a href="${resource.path}">${resource.title}</a>
</li>
`

export default (state, emit) => children => {
  const stateString = JSON.stringify({initial: state})
  return html`
<html>
  <head>
    <link rel="stylesheet" href="/assets/bundle.css" />
    <script>window.initialState = ${raw(stateString)}</script>
    <script src="/assets/bundle.js"></script>
  </head>
  <body>
    <nav>
      <ul>
        ${state.content.map(renderResourceListItem)}
      </ul>
    <nav>
    <content class="container">${children}</content>
  </body>
</html>`
}
