import SecretKey from './secret.key.txt';
import moment from 'moment';

export default class TodoStorage {
  constructor() {
    this.storageEntry = SecretKey;

    if (localStorage.getItem(this.storageEntry)) {
      const parsed = JSON.parse(localStorage.getItem(this.storageEntry));

      this.projects = parsed;
    } else {
      this.projects = {
        default: {
          title: 'Default',
          tasks: {
            createATask: {
              title: 'Create a task!',
              description: 'You can create some tasks by clicking the + button.',
              dueDate: moment().format('MMM Do YYYY, h:mm:ss a'),
              priority: 'normal',
              id: 'create-a-task',
              completed: false
            },
            taskHasColors: {
              title: 'Tasks have colors!',
              description: 'Tasks have different colors depending on the priority.',
              dueDate: moment().format('MMM Do YYYY, h:mm:ss a'),
              priority: 'important',
              id: 'tasks-have-colors',
              completed: false
            },
            deleteATask: {
              title: 'Delete a task if you want to',
              description: 'Remove an unwanted task any time.',
              dueDate: 'No due date',
              priority: 'optional',
              id: 'delete-a-task-if-you-want-to',
              complete: false
            }
          },
          active: true
        }
      };

      this.updateStorage();
    }
  }

  updateStorage(source = {}) {
    const item = JSON.stringify(Object.assign(this.projects, source));

    localStorage.setItem(this.storageEntry, item);
  }

  getTaskKeyById(taskId) {
    const tasks = this.getActiveProject().tasks;
    const taskKeys = Object.keys(tasks);
    let taskKey;

    for (let i = 0; i < taskKeys.length; i += 1) {
      if (tasks[taskKeys[i]].id === taskId) {
        taskKey = taskKeys[i];

        break;
      }
    }

    return taskKey;
  }

  deleteTask(taskId) {
    const tasks = this.getActiveProject().tasks;
    const taskKey = this.getTaskKeyById(taskId);

    delete tasks[taskKey];

    this.updateStorage();
  }

  completeTask(taskId) {
    const tasks = this.getActiveProject().tasks;
    const taskKey = this.getTaskKeyById(taskId);

    tasks[taskKey].completed = true;

    this.updateStorage();
  }

  getActiveProject() {
    const projectKeys = Object.keys(this.projects);

    for (let i = 0; i < projectKeys.length; i += 1) {
      if (this.projects[projectKeys[i]].active) {
        return this.projects[projectKeys[i]];
      }
    }
  }
}
