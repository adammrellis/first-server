const http = require('http')
const port = 8000

const todosService = require('./todosService')

function stringifyAndSend(res, json) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify(json))
  res.end()
}

const server = http.createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/todos') {
    let todos = todosService.getAll()
    stringifyAndSend(response, todos)
  } else if (request.method === 'POST' && request.url === '/todos') {
    // container
    let data = []
    request.on('data', chunk => {
      data.push(chunk)
    })
    request.on('end', () => {
      // Parsed from a buffer to a JavaScript object
      let newTodo = JSON.parse(data)

      // Added new todo to todos list and assigned updated todos list to variable
      let updatedTodosList = todosService.addOne(newTodo)

      // Stringify and respond to the client with the updated todos list
      stringifyAndSend(response, updatedTodosList)
    })
  } else {
    response.write(
      "404!!! IF YOU DON'T KNOW WHERE YOU'RE GOING, GO GET A MAP!!!"
    )
  }
})

server.listen(port, function() {
  console.log(`listening on port ${port}`)
})