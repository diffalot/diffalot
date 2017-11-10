import fs from 'fs'
import path from 'path'
import filewalker from 'filewalker'
import moment from 'moment'

import parseMarkdown from '../util/parse-markdown'

const parseFile = async pathLocation => {
  const contentEntry = fs.readFileSync(pathLocation)
  const resource = await parseMarkdown(contentEntry.toString('utf-8'))
  return resource
}

const parsePath = content => directory => async file => {
  const pathLocation = path.join(directory, file)
  const parsedPath = path.parse(pathLocation)
  if (parsedPath.ext === '.md') {
    const content = await parseFile(pathLocation)
    console.log({content})
    return content
  }
}

export default directory => {
  return new Promise((resolve, reject) => {
    const content = []
    filewalker(directory)
      .on('file', async file => {
        console.log('filedata')
        let fileData = await parsePath(content)(directory)(file)
        console.log(fileData)
        content.push(fileData)
      })
      .on('done', () => {
        resolve(content)
      })
      .on('error', reject)
      .walk()
  })
}
