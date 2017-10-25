// server.js
// where your node  const state = { name: 'Andrew app starts

// init project
import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'

import { chooRender } from '../frontend'
import postcssTranspiler from './postcss-transpiler'
import webpackConfig from '../webpack.config'
import parseContent from '../util/parse-content-directory'

const app = express()

let content
const contentParser = parseContent('./content')
  .then(newContent => {
    content = newContent
    console.log('content parsing finished', {content})
  })

const getContent = () => {
  return content
}

app.get('/favicon.ico', (req, res) => res.redirect('https://cdn.glitch.com/06e10747-4302-48f0-8176-85bde15251a6%2Ffavicon.ico?1508886324988'))

app.get('/assets/bundle.css', async (request, response) => {
  const css = await postcssTranspiler('./frontend/styles.css')
  response.send(css)
})

app.use(webpackMiddleware(webpack(webpackConfig), {
  publicPath: '/assets/'
}))

app.get('*', async (request, response) => {
  // lookup state
  await contentParser

  const state = {
    name: 'World',
    content: getContent()
      .map(resource => {
        return {
          title: resource.meta.title,
          path: resource.meta.path,
          permalink: resource.meta.permalink,
          html: resource.html
        }
      })
  }
  const string = chooRender(state)(request.path)
  response.send(string)
})

// listen for requests :)
contentParser.then(() => {
  var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Now listening on port ' + listener.address().port)
  })
})
