const app = require('./config/app')
const env = require('./config/env')

app.listen(env.port, () => console.log(`Server running at localhost: ${env.port}`))
