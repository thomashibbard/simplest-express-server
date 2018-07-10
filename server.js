const express = require('express')
const path = require('path')
const http = require('http')
const cj = require('circular-json')
const cors = require('cors')

const app = express()
const router = express.Router()
const server = http.createServer(app)
const port = 8081

server.listen(port, () => {
  console.log(`listening on port ${port}`)
})

app.use(cors())
app.use('/static', express.static(path.resolve(__dirname, 'static')))

app.get('/', (request, response, next) => {
  response.sendFile(path.resolve(__dirname, 'index.html'))
  next()
})

app.get('/info', (request, response, next) => {
  const info = cj.stringify(
    {
      serverAddress: server.address(),
      routerStack: router.stack,
      responseConnection: response.connection,
      requestConnection: request.connection
    },
    null,
    2
  )
  response.send(`<pre><code>${info}</code></pre>`)
})
