import unified from 'unified'
import parse from 'remark-parse'
import stringify from 'remark-html'
import parseMeta from 'remark-frontmatter'
import yaml from 'js-yaml'
import moment from 'moment'

const formatTitle = title => {
  return title.toLowerCase().replace(/ /g, '_')
}

const createPermalink = meta => {
  return `${moment(meta.date).format('/YYYY/')}${formatTitle(meta.title)}`
}

export default function parseMarkdown (string) {
  let meta
  return new Promise((resolve, reject) => {
    unified()
      .use(parse)
      .use(stringify)
      .use(parseMeta, ['yaml'])
      .use(() => {
        return (parsedMeta) => {
          meta = yaml.safeLoad(parsedMeta.children[0].value)
          meta.path = meta.permalink || createPermalink(meta)
          console.log(']]]]]]]]]]]]]]]]]', {meta})
        }
      })
      .process(string, (err, result) => {
        if (err) reject(err)
        resolve({
          html: result.contents,
          meta
        })
      })
  })
}
