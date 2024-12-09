import fs from 'fs'

import path, {relative} from 'path'

let fileName = path.join(process.cwd(),'src/common/utils/email.tempilate.html' )
const result = fs.readFileSync(fileName , "utf-8")
