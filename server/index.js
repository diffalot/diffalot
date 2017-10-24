// server.js
// where your node  const state = { name: 'Andrew app starts

// init project
import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
const app = express();

import { chooRender } from '../frontend'
import postcssTranspiler from './postcss-compiler'

import webpackConfig from '../webpack.config'

app.get('/favicon.ico', express.static('./public/favicon.ico'))

app.get('/assets/bundle.css', async (request, response) => {
  const css = await postcssTranspiler('./frontend/styles.css')
  response.send(css)
})

app.use(webpackMiddleware(webpack(webpackConfig), {
  publicPath: '/assets/'
}))

app.get('*', (request, response) => {
  // lookup state
  const state = { name: 'World'}
  const string = chooRender(state)(request.path)
  response.send(string)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Yo ' + listener.address().port);
});
