
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a task
function addTask(taskDetails) {
    tasks.push(taskDetails);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to local storage
    displayTasks();
}

// Function to display tasks
function displayTasks() {
    const taskContainer = document.getElementById('task-container');
    const completedTaskContainer = document.getElementById('completed-task-container');
    
    taskContainer.innerHTML = ''; // Clear pending tasks
    completedTaskContainer.innerHTML = ''; // Clear completed tasks

    tasks.forEach((task, index) => {
        if (task.status !== 'Complete') {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = `${task.text} (Assigned to: ${task.assignedTo}, Priority: ${task.priority})`;

            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Complete';
            completeBtn.onclick = function() {
                markTaskComplete(index);
            };

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-task';
            removeBtn.onclick = function() {
                removeTask(index);
            };

            taskElement.appendChild(completeBtn);
            taskElement.appendChild(removeBtn);
            taskContainer.appendChild(taskElement);
        } else {
            const completedTaskElement = document.createElement('div');
            completedTaskElement.className = 'completed-task';
            completedTaskElement.innerHTML = `${task.text} (Assigned to: ${task.assignedTo}, Priority: ${task.priority})`;

            const markActiveBtn = document.createElement('button');
            markActiveBtn.textContent = 'Move Back to Pending';
            markActiveBtn.className = 'mark-inactive';
            markActiveBtn.onclick = function() {
                moveTaskBackToPending(index);
            };

            completedTaskElement.appendChild(markActiveBtn);
            completedTaskContainer.appendChild(completedTaskElement);
        }
    });
}

// Function to mark a task as complete
function markTaskComplete(index) {
    tasks[index].status = 'Complete';
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
    displayTasks();
}

// Function to move a completed task back to pending
function moveTaskBackToPending(index) {
    tasks[index].status = 'Not Started'; // Resetting status
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
    displayTasks();
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
    const taskText = taskInput.value.trim();
    const assignedTo = document.getElementById('assignee-select').value;
    const priority = document.getElementById('priority-select').value;
    const status = document.getElementById('status-select').value;

    if (taskText) {
        const taskDetails = { text: taskText, assignedTo, priority, status };
        addTask(taskDetails);
        taskInput.value = ''; // Clear input
    }
});

// Initial display of tasks
displayTasks();
