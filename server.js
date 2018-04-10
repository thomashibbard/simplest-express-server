const express = require('express'),
  path = require('path'),
  app = express()

const PORT = 8081

app.use('/static', express.static(path.resolve(__dirname, 'static')))

app.get('*', (req, res, next) => {
  console.log('loaded /*')
  next()
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} ... 🤔`)
})
