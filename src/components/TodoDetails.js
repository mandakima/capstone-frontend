import { useTodosContext } from '../hooks/useTodosContext'

const TodoDetails = ({ todo }) => {
    const { dispatch } = useTodosContext()
    const handleClick = async () => {
        const response = await fetch ('/api/todos/' + todo._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_TODO', payload: json})
        }
    }

    return (
        <div className="todo-details">
            <h4>{todo.title}</h4>
            <p><strong>Note: </strong>{todo.description}</p>
            <p>{todo.createdAt}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default TodoDetails