const API_URL = '/api/todos';

let todos = [];
let currentFilter = 'all';

// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filter-btn');
const todoCount = document.getElementById('todoCount');

// Event Listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// Fetch all todos
async function fetchTodos() {
    try {
        const response = await fetch(API_URL);
        todos = await response.json();
        renderTodos();
    } catch (error) {
        console.error('Error fetching todos:', error);
        showError('Failed to load todos');
    }
}

// Add a new todo
async function addTodo() {
    const text = todoInput.value.trim();
    
    if (!text) {
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });

        if (response.ok) {
            const newTodo = await response.json();
            todos.push(newTodo);
            todoInput.value = '';
            renderTodos();
        } else {
            showError('Failed to add todo');
        }
    } catch (error) {
        console.error('Error adding todo:', error);
        showError('Failed to add todo');
    }
}

// Toggle todo completion
async function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !todo.completed })
        });

        if (response.ok) {
            todo.completed = !todo.completed;
            renderTodos();
        } else {
            showError('Failed to update todo');
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        showError('Failed to update todo');
    }
}

// Delete a todo
async function deleteTodo(id) {
    if (!confirm('Are you sure you want to delete this todo?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            todos = todos.filter(t => t.id !== id);
            renderTodos();
        } else {
            showError('Failed to delete todo');
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        showError('Failed to delete todo');
    }
}

// Edit todo text
async function editTodo(id, newText) {
    if (!newText.trim()) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: newText.trim() })
        });

        if (response.ok) {
            const updatedTodo = await response.json();
            const index = todos.findIndex(t => t.id === id);
            if (index !== -1) {
                todos[index] = updatedTodo;
            }
            renderTodos();
        } else {
            showError('Failed to update todo');
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        showError('Failed to update todo');
    }
}

// Render todos based on current filter
function renderTodos() {
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    todoList.innerHTML = '';

    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<li class="empty-state">No todos found</li>';
    } else {
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo('${todo.id}')"
                >
                <span 
                    class="todo-text" 
                    contenteditable="true"
                    onblur="editTodo('${todo.id}', this.textContent)"
                    onkeypress="if(event.key==='Enter') { this.blur(); }"
                >${escapeHtml(todo.text)}</span>
                <button class="delete-btn" onclick="deleteTodo('${todo.id}')">Delete</button>
            `;
            
            todoList.appendChild(li);
        });
    }

    updateStats();
}

// Update statistics
function updateStats() {
    const total = todos.length;
    const active = todos.filter(t => !t.completed).length;
    const completed = todos.filter(t => t.completed).length;
    
    let statsText = `${total} item${total !== 1 ? 's' : ''}`;
    if (currentFilter === 'all') {
        statsText += ` (${active} active, ${completed} completed)`;
    }
    
    todoCount.textContent = statsText;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show error message
function showError(message) {
    alert(message); // You can replace this with a better UI notification
}

// Make functions globally available for inline event handlers
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;
window.editTodo = editTodo;

// Initialize app
fetchTodos();

