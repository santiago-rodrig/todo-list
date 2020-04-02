import Task from './task';

export default class TasksController {
  addTaskToProject(storage, buildTask) {
    const task = buildTask();
    const taskElement = (new Task(task)).render();
    const taskList = document.getElementById('task-list');

    taskList.append(taskElement);
    storage.addTask(task);
  }

  updateProjectTask(storage, buildTask, previousId) {
    const taskElement = document.getElementById(previousId);
    const task = buildTask();

    console.log(buildTask);

    const taskPriority = taskElement.querySelector(
      'card-header > *:first-child',
    );

    const taskTitle = taskElement.querySelector(
      'card-body card-title',
    );

    const taskDescription = taskElement.querySelector(
      'card-body card-text',
    );

    const taskDueDate = taskElement.querySelector(
      'card-footer > *:first-child',
    );

    taskPriority.textContent = task.priority;
    taskTitle.textContent = task.title;
    taskDescription.textContent = task.description;
    taskDueDate.textContent = task.dueDate;
    taskElement.id = task.id;
    // update the storage here
    storage.updateTask(previousId, task);
  }
}
