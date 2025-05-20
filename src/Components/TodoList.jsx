import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [headingInput, setHeadingInput] = useState('');
    const [listInputs, setListInputs] = useState({});

    const handleAddTodo = () => {
        console.log("✅ Add button clicked"); // DEBUG
        if (headingInput.trim() !== '') {
            setTodos([...todos, { heading: headingInput, lists: [] }]);
            setHeadingInput('');
        }
    };

    // Function to handle adding a new list item to a specific todo heading
    const handleAddList = (index) => {
        // Check if the input for the given index is not empty or just whitespace
        if (listInputs[index] && listInputs[index].trim() !== '') {
            const newTodos = [...todos]; // Create a copy of the current todos array
            newTodos[index].lists.push(listInputs[index]); // Add the new list item to the corresponding heading's list
            setTodos(newTodos); // Update the todos state with the new list item
            setListInputs({ ...listInputs, [index]: '' }); // Clear the input field for that index
        }
    };
    // Function to update list input value for a specific heading index
    const handleListInputChange = (index, value) => {
        setListInputs({ ...listInputs, [index]: value }); // Update the listInputs state for the corresponding index
    };
    const handleDeleteTodo = (index) => {
        // Create a shallow copy of the current todos array
        const newTodos = [...todos];
        // Remove the todo at the specified index
        newTodos.splice(index, 1);
        // Update the state with the new array (without the deleted todo)
        setTodos(newTodos);
    };

    return (
        <div className="todo-container">
            <h1 className="title">My <em>Todo</em> List</h1>

            <div className="input-container">
                <input
                    type="text"
                    className="heading-input"
                    placeholder="Enter heading"
                    value={headingInput}
                    onChange={(e) => setHeadingInput(e.target.value)}
                />
                <button className="add-list-button" onClick={handleAddTodo}>
                    Add Heading
                </button>
            </div>

            <div className="todo_main">
                {todos.map((todo, index) => (
                    <div key={index} className="todo-card">
                        <div className="heading_todo">
                            <h3>{todo.heading}</h3>
                            <button className="delete-button-heading" onClick={handleDeleteTodo}>Delete Heading</button>
                        </div>
                        <div className='add_list'>
                            {/* Input field for adding a new item under a specific heading */}
                            <input
                                type="text"
                                className="list-input"
                                placeholder="Add List"
                                value={listInputs[index] || ''}// Use the value from listInputs array based on the current heading index
                                onChange={(e) => handleListInputChange(index, e.target.value)}/>
                            {/* Button to add the list item to the corresponding heading */}
                            <button className="add-list-button" onClick={() => handleAddList(index)}>Add List</button>
                        </div>
                        <ul>
                            {todo.lists.map((list, listIndex) => (
                                <li key={listIndex} className="todo_inside_list">
                                    <p>{list}</p>
                                </li>
                            ))}
                        </ul>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;
