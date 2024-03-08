import { addtodo, removeTodo, doTodo, getAllTodos } from "./actions.js";

const addTodoAction = title => {
    return {
        type: addtodo,
        title
    }
}

const removeTodoAction = id => {
    return {
        type: removeTodo,
        id
    }
}

const doTodoAction = id => {
    return {
        type: doTodo,
        id
    }
}

const getAllTodosAction = () => {
    return {
        type: getAllTodos
    }
}

export { addTodoAction, removeTodoAction, doTodoAction, getAllTodosAction }