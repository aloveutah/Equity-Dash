
// Function to display tasks
function displayTasks() {
    const taskContainer = document.getElementById('task-container');
    const completedTaskContainer = document.getElementById('completed-task-container');
    
    taskContainer.innerHTML = ''; // Clear pending tasks
    completedTaskContainer.innerHTML = ''; // Clear completed tasks

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        
        // Apply styles based on priority and status
        const statusClass = task.status === 'In Progress' ? 'status-in-progress' : '';
        const priorityClass = task.priority === 'High' ? 'priority-high' : task.priority === 'Medium' ? 'priority-medium' : '';

        taskElement.innerHTML = `
            <span>${task.text}</span>
            <br>
            <span><strong class="bold">Assigned To:</strong> ${task.assignedTo}</span>
            <span class="${priorityClass}"><strong class="bold">Priority:</strong> ${task.priority}</span>
            <span class="${statusClass}"><strong class="bold">Status:</strong> ${task.status}</span>
        `;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-task';
        editBtn.onclick = function() {
            editTask(index);
        };

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

        taskElement.appendChild(editBtn);
        taskElement.appendChild(completeBtn);
        taskElement.appendChild(removeBtn);
        taskContainer.appendChild(taskElement);
    });

    // Display completed tasks
    tasks.forEach((task, index) => {
        if (task.status === 'Complete') {
            const completedTaskElement = document.createElement('div');
            completedTaskElement.className = 'completed-task';

            const statusClass = task.status === 'In Progress' ? 'status-in-progress' : '';
            const priorityClass = task.priority === 'High' ? 'priority-high' : task.priority === 'Medium' ? 'priority-medium' : '';

            completedTaskElement.innerHTML = `
                <span>${task.text}</span>
                <br>
                <span><strong class="bold">Assigned To:</strong> ${task.assignedTo}</span>
                <span class="${priorityClass}"><strong class="bold">Priority:</strong> ${task.priority}</span>
                <span class="${statusClass}"><strong class="bold">Status:</strong> ${task.status}</span>
            `;

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
