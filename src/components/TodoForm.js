import { useState } from 'react'
import { useTodosContext } from "../hooks/useTodosContext"

const TodoForm = () => {
    const { dispatch } = useTodosContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const todo = {title, description}

        const response = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok){
            setTitle('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            console.log('New todo added to list', json)
            dispatch({type: 'CREATE_TODO', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h1>List of Things To Do</h1>

            <label>What do I need to do?</label>
            <input type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Extra Descriptions</label>
            <input type="text" 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes('description') ? 'error' : ''}
            />

            <button>Add To My Todo List</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TodoForm