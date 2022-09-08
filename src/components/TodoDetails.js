import { useTodosContext } from '../hooks/useTodosContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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
            <h5>{todo.description}</h5>
            <h6>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</h6>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default TodoDetails