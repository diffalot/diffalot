const fs = require('fs');
const postcss = require('postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

let CSS

export default file => {
  const fileBuffer = fs.readFileSync(file)
  return postcss([precss, autoprefixer])
        .process(fileBuffer)
        .then(result => {
          return result.css
        }) 
}