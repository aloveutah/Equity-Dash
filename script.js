let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a task
function addTask(task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to local storage
    displayTasks();
}

// Function to display tasks
function displayTasks() {
    const taskContainer = document.getElementById('task-container');
    taskContainer.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.textContent = task;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-task';
        removeBtn.onclick = function() {
            removeTask(index);
        };

        taskElement.appendChild(removeBtn);
        taskContainer.appendChild(taskElement);
    });
}

// Function to remove a task
function removeTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
    displayTasks();
}

// Event Listener for Add Task Button
document.getElementById('add-task-button').addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();
    if (task) {
        addTask(task);
        taskInput.value = ''; // Clear input
    }
});

// Initial display of tasks
displayTasks();
