let todos = require('./todos')
let idCounter = 4

exports.getAll = response => {
    return todos
}

exports.addOne = newTodo => {
    newTodo.id = idCounter
    todos.push(newTodo)
    idCounter++
    return todos
}