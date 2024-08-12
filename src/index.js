import transpile from './transpile.js'
import validate from './validate.js'

export default data => validate(data).then(transpile)
