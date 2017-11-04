import fs from 'fs'
import path from 'path'
import filewalker from 'filewalker'
import yaml from 'js-yaml'
import moment from 'moment'
import Remarkable from 'remarkable'

const markup = new Remarkable()
const parseMarkdown = content => {
  console.log({markup})
  return markup.render(content)
}

const formatTitle = title => {
  return title.toLowerCase().replace(/\ /g, '_')
}

const createPath = meta => {
  return `${moment(meta.date).format('/YYYY/')}${formatTitle(meta.title)}`
}

const parseMeta = meta => {
  return {
    title: meta.title,
    published: meta.published,
    path: createPath(meta),
    permalink: meta.permalink
  }
}

const extractMeta = yamlString => 'meta' //parseMeta(yaml.safeLoad(yamlString))

const parseFile = pathLocation => {
  const contentEntry = fs.readFileSync(pathLocation)
  const resource = {
    meta: extractMeta(contentEntry.toString()),
    html: parseMarkdown(contentEntry.toString())
  }
  return resource
}

const parsePath = content => directory => file => {
  const pathLocation = path.join(directory, file)
  const parsedPath = path.parse(pathLocation)
  if (parsedPath.ext === '.md') {
    content.push(parseFile(pathLocation))
  }
  return content
}

export default directory => {
  console.log('parsing content in ', {directory})
  return new Promise((resolve, reject) => {
    const content = []
    filewalker(directory)
      .on('file', async file => {
        console.log('found file', {file})
        parsePath(content)(directory)(file)
      })
      .on('done', () => {
        resolve(content)
      })
      .on('error', reject)
      .walk()
  })
}