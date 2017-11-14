const fs = require('fs')

fs.writeFileSync('.env',fs.readFileSync('sample.config.env'))