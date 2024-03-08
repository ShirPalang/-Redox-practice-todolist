import { addTodoAction, removeTodoAction, doTodoAction, getAllTodosAction } from "../Redux/actioncCreators.js"
import { addtodo, doTodo, removeTodo, getAllTodos } from "../Redux/actions.js"

const input = document.querySelector('.input')
const addtodoBtn = document.querySelector('.addtodo')
const filterTodos = document.querySelector('.filter')
const todosList = document.querySelector('.todos')

const todolistReducer = (state = [], action) => {
    switch (action.type) {
        case addtodo: {
            const newState = [...state]
            const newTodo = {
                id: crypto.randomUUID(),
                title: action.title,
                isCompelted: false
            }
            newState.push(newTodo)
            return newState
        }
        case doTodo: {
            const copyState = [...state]

            const newTodo = copyState.map(todo => {
                if(todo.id === action.id){
                    todo.isCompelted = !todo.isCompelted
                }
                return todo
            })
            return newTodo
        }
        case removeTodo: {
            const copyState = [...state]
            const newState = copyState.filter(todo => todo.id !== action.id)
            return newState
        }
        case getAllTodos: {
            return state
        }
        default: {
            return state
        }
    }
}


const store = Redux.createStore(todolistReducer)

const removeTodoHandler = id => {
    store.dispatch(removeTodoAction(id))
    const todos = store.getState()
    showTodos(todos)
}

const completedTodoHandler = id => {
    store.dispatch(doTodoAction(id))
    const todos = store.getState()
    showTodos(todos)
}

window.removeTodoHandler = removeTodoHandler
window.completedTodoHandler = completedTodoHandler

const showTodos = todos => {
    todosList.innerHTML = ''
    todos.map(todo => {
        const { title, id, isCompelted } = todo
        todosList.innerHTML += `
        <div>
            <h3 ${isCompelted && 'style="text-decoration: line-through;"'}>${title}</h3>
            <button class="completed" onclick=completedTodoHandler('${id}')>&#x2713;</button>
            <button class="remove" onclick=removeTodoHandler('${id}')>remove</button>
            <hr>
        </div>
        `
    })
}

addtodoBtn.addEventListener('click', () => {
    const inputValue = input.value
    store.dispatch(addTodoAction(inputValue))
    input.value = ''
    const todos = store.getState()
    showTodos(todos)
})

filterTodos.addEventListener('change' , e => {
    store.dispatch(getAllTodosAction())
    const todos = store.getState()

    if(e.target.value === 'all'){
        showTodos(todos)
    } else if (e.target.value === 'completed') {
        const completedTodos = todos.filter(todo => todo.isCompelted)
        showTodos(completedTodos)
    } else if (e.target.value === 'incompleted') {
        const inCompletedTodos = todos.filter(todo => !todo.isCompelted)
        showTodos(inCompletedTodos)
    }

})